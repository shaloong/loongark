# LoongArk 迭代记录

## 2026-10-02 全面整改

按照“运行与发布 → 主题与表单语义 → 核心视觉 → 四端回归 → 补组件”推进。历史问题与截图保留在 docs/audits/2026-10-02/review.md，整改结果与验收命令见 docs/remediation.md。

1. 运行与发布：修复原有故事的 Ark API 使用，约束日期浮层尺寸，修 Vue Portal、Solid DOM/SSR 编译、Svelte 发布源码/声明及最低运行时范围。
2. 主题与语义：固定 VI 与语义颜色分离，明暗及高对比模式真实生效；修作用域、样式引用计数、Shadow DOM、动态覆盖、Portal 与稳定 SSR 标识；完善 Field 关联与表单隐藏控件。
3. 核心视觉：统一按钮、输入、选择、开关、选项、滑块、分页、弹窗、日期和导航等共享样式；新增中性组合展示页。
4. 四端回归：真实 dist 构建消费样例，同场景验证绑定、disabled、键盘选择、表格排序/筛选/分页、弹窗与 Sheet、主题及窄屏；使用真实公开声明检查。
5. 组件补齐：补原计划九项，新增常规布局/反馈/导航/数据组件，以及 Calendar、ContextMenu、InputGroup、Label 独立入口与展示。

后续新组件沿用共享样式/数据模型/原生行为的分层方式，并同步四端公开 API 与消费回归。功能范围见组件覆盖表，不将 shadcn 的第三方依赖 API 当作 LoongArk 的兼容承诺。

## 2026-10-03 附件、消息与问卷

补齐五个专用组件，明确与 FileUpload、ScrollArea、基础表单的职责边界。共享数据模型与滚动控制复用四端；同步原生语义、答案绑定、焦点与禁用操作。增加独立 Story、四端 ConversationExample、发布产物 SSR 与行为回归。Linux 验收和独立截图见 [本批记录](audits/2026-10-03/conversation-linux/acceptance.json)。
