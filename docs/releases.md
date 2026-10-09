# 支持版本、性能与正式发布

main 是默认分支和稳定版本，develop 是开发分支。Pages 只部署 main；develop 的 Storybook 作为14天的 Actions 预览 Artifact。手动触发也执行相同分支限制。合并 main、创建版本标签、发布 npm 是独立动作，必须有明确发布指令。

## 支持与实测矩阵

| 项目 | 声明最低版本 | 当前完整回归版本 | 最低版本专项范围 |
| --- | --- | --- | --- |
| 开发/构建 Node.js | 22.12（工具下限） | 24.19.0；统一开发使用 .nvmrc 的24 | Node22 尚未实测 |
| pnpm | 10.x | 10.14.0 | 仓库冻结锁文件；临时最低版本消费项目先生成自己的锁文件再冻结安装 |
| React / react-dom | 18.0.0 | 19.3.0 | 真实发布 tarball 消费构建、Provider/Button SSR 和点击 |
| Vue | 3.5.43 | 3.5.43 | 同上 |
| Solid | 1.9.17 | 1.9.17 | 同上；node 条件使用真实 SSR 产物 |
| Svelte | 5.57.2 | 5.57.2 | 同上；使用最低版本编译器编译发布的源码 |
| Ark React / Vue / Solid | 依赖范围 ^5.39.2 | 5.39.2 | 最低 peer 探针锁定当前实际 Ark 版本 |
| Ark Svelte | 依赖范围 ^5.24.2 | 5.24.2 | 同上；附件语法使 Svelte5.20 无法编译 |

依赖升级时，React与react-dom需保持同版本，React组件包的开发依赖也要同步；对外peer下限仍独立通过发布包消费验证。Storybook的核心、renderer、builder与addons需联动更新。Ark与直接使用的Zag绑定/状态机必须核对类型和生命周期兼容性，不能因为单包版本较新就直接合入。Dependabot分组配置与develop PR验证用于提前发现这些问题。

最低版本专项不等于在每个 peer 版本上跑过完整高级交互矩阵。浏览器以各验收实际版本为准：本地 Linux Chromium 使用系统可执行文件，Firefox/WebKit 使用安装的 Playwright 版本；原生 Safari 由 macOS 工作流单独记录。未承诺旧浏览器、所有中间版本或真实手机验收。

## 性能复测

先按 CONTRIBUTING 顺序成功构建和验证；再运行：

```sh
pnpm check:storybook
pnpm measure:bundles
pnpm measure:ssr
pnpm check:release
pnpm check:versions
node scripts/build-framework-fixtures.mjs
node scripts/build-example-fixtures.mjs
STATIC_DIR=tests/consumer-dist node scripts/run-playwright.mjs performance-contracts.spec.ts --project=chromium --workers=1
```

Windows 在当前 shell 中设置 `STATIC_DIR`，不要直接复制 POSIX 环境变量前缀。系统 Chromium 通过 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 显式选择；CI 使用 Playwright 安装版本。每次新测量写入 `.artifacts/performance/` 与 `.artifacts/releases/`，不将逐次测量提交到 Git。

包体探针使用真实 dist 的 Vite production 应用构建，以 UTF-8 字节、逐块 gzip/Brotli 统计入口静态依赖与全部异步块；四端各测 Button、DataTable、CodeEditor 和延迟编辑器。Button/Table/延迟编辑器首包禁止保留 CodeMirror/ProseMirror 运行时代码；浏览器再核对首次请求编辑器块与重复加载缓存。

四端均可 `import('@loongark/<framework>/editors')` 延迟路由加载。根入口与直接 Kit 同步挂载 API 不变，语言扩展仍单独异步加载。页面在模块加载完成之前应显示应用自己的 loading/error 状态；模块下载不等于编辑器已经完成挂载。Provider 引入共享视觉规则，编辑器延迟加载不意味着全部主题样式也按组件拆分。

SSR 分别记录5个新进程的冷导入；每进程预热5次、每场景30次渲染，包含 Provider。10,000行数据在计时前构造；另测共享主题样式的生成与序列化。Svelte 使用真实 SSR 编译，Solid 使用 node 产物。浏览器记录120帧双向滚动、DOM 上限及20次重复卸载挂载，核对卸载 Observer 与编辑器销毁计数。RAF包含探针开销，不设依赖硬件的毫秒硬门槛；完整堆泄漏分析不是本探针的结论。

## 发布演练

`pnpm check:release` 对9个实际 tgz 检查：统一 SemVer、MIT/LICENSE、工作区依赖替换、每个条件导出与类型路径、排除过程文件。`pnpm check:versions` 在独立临时目录消费这些 tgz，使用实际最低编译器/运行时验证，并单独审计消费项目依赖，确认安全结果没有依赖工作区的传递覆盖。演练不发布、不创建标签、不修改 main。

准备正式发布时：

1. 在 develop 同步9个包版本、锁文件、CHANGELOG 和迁移说明，按 CONTRIBUTING 顺序验证，再执行性能/打包/最低版本专项。
2. 创建 develop → main PR，说明最终行为、版本、验证范围和迁移事项；审阅并合并，保留提交历史。
3. main 的 Pages 和 Browser contracts 必须完成，人工审阅实际截图和验收摘要。Pages 环境如有分支保护，只允许 main。
4. 在 main 手动运行 `Release readiness`，核对输入版本与所有包版本一致；保存 tgz 和验证 Artifact。配置 npm 组织的发布权限/Trusted Publishing，首次发布前核对包名所有权。
5. 在 main 对已验证的同一提交创建 `v<version>` 标签，再按依赖顺序发布 tokens → theme → primitives → kit → 四端 → cli：`npm publish <已验收.tgz> --access public --provenance`。发布需要 npm 对应权限和 provenance 环境；本仓库的准备工作流不会自动发布 npm。
6. 从 registry 安装发布版本，检查条件导出、类型和最低版本消费；更新 GitHub Release 与变更日志。版本已发布后不可覆盖，问题使用补丁版本修正。

日常开发无需逐次审批；正式发布保持独立授权。正式展示在发布 PR 合入 main 后更新。
