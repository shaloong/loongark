# 开发与发布

## develop 与 main

`develop` 用于日常开发，允许频繁的小步提交和推送；云端任务始终选择该分支。`main` 用于稳定版本，按实际进展不定期更新。

通常流程：

1. 同步 `develop`，在该分支开发、验证并提交。
2. 将 Conventional Commit 推送到 `origin/develop`。
3. 发布时从 `develop` 向 `main` 创建 PR，说明最终行为、验证结果和必要的迁移信息。
4. 完成发布验证后合并 PR，保留提交历史；有正式版本时再按版本号创建标签。
5. 继续在 `develop` 开发。若紧急修复经明确授权进入 `main`，及时同步回 `develop`。

本次创建 `develop` 后，已验收的整改和组件补齐进入开发主线；`main` 保留原稳定基线，首次发布合并时再更新。

提交格式为 `type(scope): summary`，例如 `feat(image-list): support responsive spans`、`fix(speed-dial): preserve trigger contrast`、`chore(repo): document branch workflow`。常用类型为 feat、fix、docs、refactor、perf、test、build、ci、chore。Git 配置 `push.default=simple`，推送当前分支的同名上游；不强推共享分支。

## 云端环境

使用 Node.js 24（见 [.nvmrc](.nvmrc)）和 pnpm 10.14.0（见 package.json 的 packageManager）。当前构建工具要求 Node.js 至少 22.12.0；云端以 Node.js 24 作为统一开发环境。

```sh
git clone --branch develop https://github.com/shaloong/loongark.git
cd loongark
corepack enable
corepack prepare pnpm@10.14.0 --activate
pnpm install --frozen-lockfile
pnpm exec playwright install --with-deps chromium
```

已有检出应先确认工作区状态，再切换到 `develop` 并同步；不要自动 reset、清理或覆盖未提交改动。Windows 也使用同一套 pnpm 命令，浏览器系统依赖由所在环境处理。

GitHub 的仓库默认分支应设为 `main`，云端开发任务创建时明确选中 `develop`。默认分支用于稳定版本展示，不改变日常开发目标或将开发提交自动合入 `main`。

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

先构建成功，再验证真实发布产物。覆盖检查读取 `storybook-static/index.json`，必须先成功构建 Storybook，不能依赖工作区里的旧索引；Pages 工作流和干净检出也遵守此依赖顺序。不要并行运行多个 Playwright 命令，它们共用测试结果目录。运行 Storybook 开发预览使用 `pnpm storybook`。

既有视觉基线包含 Windows/Chromium 的 win32 文件，云端验收使用独立 Linux 基线。首次覆盖新平台或场景时应建立并人工审阅对应基线；不得将缺少基线视为通过，也不得覆盖其他平台的基线。修改样式后应查看截图再确认变化。

验证记录见 [docs/README.md](docs/README.md) 和 [组件覆盖清单](docs/component-coverage.json)。合入 `main` 不等于发布 npm；正式包发布和版本标签按实际发布任务执行。

发布准备还需执行 [性能与打包探针](docs/releases.md#性能复测)，验证生产按需导入、SSR、滚动与重复挂载、真实 tarball 和最低 peer 版本。过程产物只保存为临时 Artifact。

若环境已提供系统 Chromium，可使用 `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium pnpm test:e2e`；验收必须记录实际浏览器版本，不声称等同于 Playwright 固定版本。相同变量适用于四端和视觉回归。Linux 基线仍独立审阅与保存。

## 验收保存与展示部署

临时截图、日志、详细测量和归档默认写入忽略目录 `.artifacts/`，CI 使用有保留期限的 Artifact。Git 只保存验收摘要及用于自动比较的已审阅视觉基线；不要强制添加过程文件。`pnpm lint` 检查此约定，详见 [证据保存](docs/audits/README.md)。

Storybook 可以静态部署到 GitHub Pages 或 Vercel；平台、商业用途和仓库可见性须分别考虑，见 [展示与公开范围](docs/storybook-hosting.md)。部署产物不提交到源码分支。

本库采用 MIT，根目录及全部发布包必须包含 LICENSE，`pnpm lint` 校验许可一致性。Pages 只部署 main，develop 仅保存临时预览产物；工作流在子路径烟雾验收通过后部署 Storybook，截图 Artifact 保留14天。稳定发布和 npm 发布仍按单独发布指令执行。

## 多浏览器与原生 Safari

`Browser contracts` 工作流独立于 Pages：Linux 三个浏览器任务以冻结锁文件安装、按上述顺序新构建和检查，再执行全部四端消费/示例与 Story 交互。Firefox/WebKit 仅在显式开启矩阵时加入，默认本地 Chromium 验收命令及 Windows 基线保持独立：

```sh
pnpm exec playwright install --with-deps firefox webkit
CROSS_BROWSER=1 BROWSER_PROJECT=firefox pnpm test:frameworks
CROSS_BROWSER=1 node scripts/run-playwright.mjs --project=firefox --workers=2
CROSS_BROWSER=1 BROWSER_PROJECT=webkit pnpm test:frameworks
CROSS_BROWSER=1 node scripts/run-playwright.mjs --project=webkit --workers=2
```

矩阵不运行 Chromium 截图比较；它在四端测试后先保存对应浏览器实际交互截图、失败截图和环境信息，再运行 Story，避免测试结果目录被后续命令覆盖。四端截图按框架拆分归档，环境信息与错误摘要单独保存，避免单个证据ZIP过大。Story 摘要/代表场景、trace 与全部默认截图分别保存，CI Artifact 保留14天。首次验收仍须下载并目视检查实际截图，不因添加流水线就宣称通过。

浏览器契约工作流保留已启动的完整验收，连续推送只合并最新待运行批次，避免 WebKit 在后续开发提交时持续被取消。完整 Linux 任务预算为120分钟：实际四端 WebKit51.1分钟、先前完整 Story33.8分钟，另计安装、构建和证据上传。验收摘要记录每项对应的源码提交；新推送的排队状态不算通过，GitHub Pages仅部署 main。

原生 Safari 任务在 macOS 15 使用 Apple `/usr/bin/safaridriver` 的 W3C WebDriver，检查全部四端默认示例、页面溢出、批量多级历史/键盘/焦点和图表窗口的明暗交互。它独立于 Playwright WebKit，报告实际 Safari 版本及每个场景。Linux 不能运行此任务，桌面 Safari 也不代表真实 iOS 手机；真机验收仍需单独取得设备连接。只有对应任务成功且截图审阅完成才关闭平台清单。

原生 Safari 高级套件还检查本地化日期与时间、横向列窗口和二维/瀑布流窗口、富文本表格与代码历史、全部新增图表类型、矩阵多选/排序和异步集合、列级查询与 Drawer 全方向/RTL。批量粘贴通过 macOS 系统剪贴板和原生快捷键执行；协议脚本在 Linux 的诊断不能计作真实 Safari 或手机通过。

原生 Safari 的 Tab 路径依赖 macOS/Safari 键盘导航偏好。CI 只在临时 macOS runner 启用完整控件及链接导航；runner 记录设置值，并在任何组件场景之前严格检查原生输入 → 按钮 → 链接 → 输入的可信 Tab 顺序。本地运行前请在系统键盘和 Safari 高级设置中启用对应选项；脚本不会修改开发者机器偏好。

仅修改 Safari runner、macOS 偏好或其验收说明时，可在提交正文使用 `CI-Scope: safari`，独立触发原生任务并保留已运行的 Linux 矩阵；该标记不用于产品、四端适配、共享模型或 Linux 回归变更。普通提交和手动工作流继续运行全部平台，验收须明确记录各平台实际源码提交。
