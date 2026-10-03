# LoongArk 开发指南

- 对话、注释与文档使用中文；API 名称保留原文。
- 使用真实框架与 Ark UI 类型，优先泛型和原生 Props。不得以 any/unknown 强制转换掩盖错误，也不得恢复本地类型桩覆盖依赖。
- 组件样式使用 theme.styleTokens 与 --lk-* CSS 变量；固定 VI、语义颜色、尺寸和间距来自 tokens。数据几何计算不属于外观 Token。
- 保留 Ark 的键盘行为、标签、错误关联、隐藏表单控件和焦点管理。局部主题浮层使用 LoongArkPortal。
- 共享样式放 primitives，部件元数据、组合数据模型与通用行为放 kit；框架包负责渲染和生命周期。
- 新增依赖说明用途；功能变更同步 docs、sprint-plan 和示例；有逻辑分支的变更添加有意义的回归。
- 动效优先 transform/opacity，遵循 prefers-reduced-motion。

架构与公共 API 见 docs/README.md、docs/theme-system.md、docs/component-coverage.md。使用 pnpm workspace 与根项目引用。共享包采用 tsc；Solid 增加 DOM/SSR JSX 编译；Svelte 发布源码与声明。src 只保留源码，dist、构建缓存、Storybook 静态产物和消费测试产物不跟踪。

验收顺序：pnpm run verify → pnpm run check:contracts → pnpm run check:publication → pnpm run check:svelte → pnpm run test:frameworks → pnpm run test:e2e → pnpm run visual:test。

CLI：构建后 node packages/cli/dist/index.js extract --dir dist/tokens --format css,json，再使用 verify --dir dist/tokens 校验。修改 tokens 后应重新提取对应产物。

自动化测试只使用当前实际产物；构建失败应立即停止后续验证，禁止消费陈旧 dist。视觉基线更新前先查看新截图并确认设计变化。
