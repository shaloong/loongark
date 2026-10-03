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

## 2026-10-03 DataTable 一致性

修复删除源行后选择数量残留、数据恢复时跳回旧页和被删除列的旧排序。四端共享选择模型，增加当前页三态全选、受控选择和完整标签覆盖；原生 checkbox 在受控调用方拒绝更新时恢复正确状态。专用共享样式归入 Primitives，统一 48px 行密度、排序反馈、表格边界和窄屏分页。新增四端示例、SSR 与真实行为回归，证据见 [本批验收](audits/2026-10-03/data-table-linux/acceptance.json)。

目视核验修正：选择列固定为 48px，不随短内容分配表格余宽；Typography 的 muted 变体消费已有 mutedForeground Token，恢复说明文字与正文的层次。

## 2026-10-03 Chart 可读性

压力截图确认长分类重叠、大数值轴裁切和三系列辨识不足。共享模型归一化几何坐标、减少并截短分类标签、补紧凑数值和完整提示/描述；专用样式与可换行图例归入 Primitives。四端同步 labels、示例、SSR 与真实交互回归；验收见 [Linux 记录](audits/2026-10-03/chart-linux/acceptance.json)。

## Ark UI 高级能力复核（2026-10-03）

新增 ImageCropper、JsonTreeView 与独立辅助组件，开放既有组件的 Provider/Context 与高级部件。SegmentGroup 统一为 Ark 原生单选语义，Vue 多选表单值同步修正。新增四端裁剪、JSON、辅助组件与高级选择示例。后续批次已实现新版 DateInput、Swap、TOC 与原生手势 Drawer；常用 Context/Collection Hook 同步开放。组件目录覆盖不等同于所有高级场景均已验收。详细对照、API 与迁移见 [Ark UI 核对](ark-ui-coverage.md)。

## 新版 Ark 组件与控制（2026-10-03）

DateInput 提供分段日期、范围、键盘编辑与真实表单；Swap 提供受控指示内容切换；Toc 提供目录缩进、滚动容器、活动状态和卸载重建；Drawer 迁移为原生拖拽、吸附点和嵌套模态，Sheet 继续使用 Dialog。四端各有四个真实示例。高级组合组件缺口及原生 API 限制见 [Ark UI 核对](ark-ui-coverage.md)。

本批 Linux 验收：114 族、283 Story、四端各 789 个公开值入口；147 个四端示例运行通过，专项行为 8 项、全量浏览器 106 项、视觉 46 项通过。明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；64 张四端和 16 张 Story 截图已目视核验。新增 16 张 Linux 基线，原有 30 张 Linux 与 2 张 Windows 基线不变。详细范围与限制见 [验收记录](audits/2026-10-03/ark-next-linux/acceptance.json)。

## Toc 受控更新（2026-10-03）

四端 Toc 的 Root 与 useToc 共享新值回调修正；示例直接控制 activeIds，支持暂停/恢复业务更新，并展示观察回调数据。回归检查 activeItems、业务拒绝更新、恢复后的新回调、真实滚动与卸载重建。详见 [Toc 验收](audits/2026-10-03/toc-control-linux/acceptance.json)。高级组合能力继续按场景补齐，完整组件目录不代表全部高级业务能力已验收。
