# 开发与贡献

## 环境与分支

使用 [.nvmrc](.nvmrc) 指定的 Node.js 和 `package.json` 中的 pnpm 10.14.0。安装使用 `pnpm install --frozen-lockfile`；依赖变更先明确更新清单和锁文件，再冻结安装。不得为绕过安装失败放宽锁文件。

main 是默认及稳定分支；所有日常开发进入 develop。已有检出先检查并保留工作区改动，再同步 develop；不 reset、强推或改写共享历史。提交采用 Conventional Commits，例如 `fix(questionnaire): escape nested type attributes`。只有明确发布任务才通过 develop → main PR 更新稳定分支，合并不等于发布 npm。

main 仅接受同仓库 develop 的 PR，包含配置维护。`.github/workflows/main-pr-source.yml` 检查来源；仓库管理员需将 `Main PR source` 设置为 main 的必需检查，并要求 PR、禁止强推与删除、禁止绕过规则。工作流本身不会启用服务器端分支保护；配置步骤见 [发布指南](docs/releases.md#main-分支保护)。

## 代码与示例

共享样式位于 Primitives，共享模型与通用行为位于 Kit；四端适配负责渲染、绑定与生命周期。使用真实框架/Ark 类型，不添加本地类型桩或用强制转换掩盖错误。外观复用 Token 和 Lucide 图标，保留原生表单、标签、键盘与焦点行为，支持减弱动效。

根开发依赖 `@ark-ui/vue` 用于四端示例中的真实 Vue Props 编译。

功能变更同步四端实现、examples、Story、覆盖清单与使用文档。有逻辑分支的行为添加有意义的回归；纯文档变更执行 `pnpm lint`。examples 是 Docs 代码和消费测试的输入，详见 [示例职责](examples/README.md)。

## 验证顺序

```sh
pnpm verify
pnpm check:contracts
pnpm check:storybook
pnpm storybook:build
pnpm check:coverage
pnpm check:publication
pnpm check:svelte
pnpm test:frameworks
pnpm test:e2e
pnpm visual:test
```

必须先成功构建生产者，再消费 dist 与 Story 索引；构建失败立即停止，不读取旧产物。多个 Playwright 命令共用结果目录，不能同时运行。默认本地使用 Chromium，需先 `pnpm exec playwright install --with-deps chromium`；如指定系统 Chromium，设置 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` 并记录实际版本。

安全变更包含 `pnpm audit` 和 `pnpm check:security`，后者使用成功构建后的产物，已纳入 contracts。依赖审计的联网失败不能当作零漏洞。框架版本更新后复验真实 SSR、最低 peer 和打包消费，见 [发布指南](docs/releases.md)。

## 多浏览器与视觉

```sh
pnpm exec playwright install --with-deps firefox webkit
CROSS_BROWSER=1 BROWSER_PROJECT=firefox pnpm test:frameworks
CROSS_BROWSER=1 node scripts/run-playwright.mjs --project=firefox --workers=2
CROSS_BROWSER=1 BROWSER_PROJECT=webkit pnpm test:frameworks
CROSS_BROWSER=1 node scripts/run-playwright.mjs --project=webkit --workers=2
```

Windows 使用当前 shell 对应的环境变量语法。CI Browser contracts 分别运行三个 Linux 引擎及 macOS 原生 Safari；平台通过必须对应同一源码的实际任务结果。WebKit 不等于 Safari，模拟手机不等于真实 iOS/Android，Axe 不等于实际屏幕阅读器。

视觉基线按 Windows/Linux 独立保存。新增平台或修改基线前查看实际截图；不覆盖其他平台，不用更新截图掩盖回归。原生 Safari 使用 Apple safaridriver，依赖系统与 Safari 完整键盘导航偏好；runner 首先验证可信 Tab 顺序，CI 只修改临时 runner 的设置。

## 验证与产物约定

截图、trace、日志、逐次审计、详细测量和压缩包写入忽略目录 `.artifacts/` 或 CI Artifact，CI 默认保留14天，不提交到源码。Git 只保留实际用于回归的已审阅 `tests/*-snapshots/`、可复测脚本和面向使用者的当前限制；历史整改通过 Git 与 CHANGELOG 追溯。`pnpm lint` 检查过程产物和文档链接。

Storybook 使用 `pnpm storybook` 预览。main 的静态构建经子路径检查后部署 GitHub Pages；develop 仅提供临时 Actions Artifact。输出不进入源码分支，详见 [展示部署](docs/storybook-hosting.md)。

## 发布与反馈

正式发布遵循 [版本、打包与发布指南](docs/releases.md)，同步 CHANGELOG 和迁移说明，审阅稳定分支 CI，再发布已验证的同一份 tarball。不能把准备工作流成功当作包已发布。

普通问题提供框架、浏览器版本与最小复现。安全问题按 [SECURITY.md](SECURITY.md) 私下报告；测试和示例不使用真实凭据或用户数据。
