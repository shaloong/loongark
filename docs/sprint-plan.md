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

## 问卷高级能力（2026-10-03）

四端 Questionnaire 新增条件可见性、同步跨题校验与受控拒绝恢复；隐藏答案保留在编辑状态，但不参与表单和最终提交。新增四端高级示例与两个 Story，覆盖清单仍为 114 族，累计 285 Story 和 151 个示例。API 与 Svelte 回调绑定说明见 [问卷说明](conversation.md)，验证范围见 [验收记录](audits/2026-10-03/questionnaire-advanced-linux/acceptance.json)。

## 表格状态、列控制与服务端模式（2026-10-03）

新增 DataTableAdvancedExample 与 Server/Loading Story，114 族、287 Story、四端各 789 个公开值入口和 155 个示例。查询/排序/分页由统一 state 控制；columnKeys 控制显示与顺序；服务端数据不再本地处理，选择跨页保留，并补加载、失败和重试焦点。API 见 [表格说明](data-table.md)。

## Chart 交互与可访问数据批次（2026-10-03）

新增 ChartAdvancedExample 与 Interactive/DisabledControls Story，114 族、289 Story、四端各 789 个公开值入口和 159 个示例。图例支持受控选择/拒绝、禁用及全部隐藏后恢复；序列颜色/虚线身份保持；domain 固定数值轴并保留原始数据说明；showDataTable 提供原生可展开数据表。重绘保留展开和焦点，外部控件焦点不被抢回，卸载释放监听与观察器。API 见 [图表说明](chart.md)。

图表批次验收：四端消费/示例 8 项、159 个示例运行、全量浏览器 67 项、视觉 58 项通过。289 Story 的明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；60 张场景图已通过联系表复核，36 次四端对比为 0 像素差异。目视发现手机展开表格撑开页面，修复 max-width 并补局部键盘滚动回归后重验。新增 4 张 Linux 基线，原有 54 张 Linux 与 2 张 Windows 基线不变；缩放、刷选及实时流未提供。详见 [独立验收记录](audits/2026-10-03/chart-advanced-linux/acceptance.json)。

## Message / Attachment 操作与视觉一致性（2026-10-03）

新增四端 ConversationActionsExample 与组合 Story；异步互斥、失败反馈、版本替换中止、卸载、预览/取消和焦点恢复共享行为。修复真实下载文件名和 React Dialog 默认关闭图标差异。覆盖仍为114族，累计290 Story、四端各789个公开值入口、163个示例。

四端8项、浏览器69项、视觉62项通过；100张场景图已复核，60次四端对照为0像素差异。新增4张独立Linux基线，原有58张Linux与2张Windows基线文件未改。验收见 [本批记录](audits/2026-10-03/conversation-actions-linux/acceptance.json)，剩余高级能力继续以真实场景验收，见 [范围表](ark-ui-coverage.md#下一批高级能力的边界)。

## MessageScroller 媒体锚点与清理（2026-10-03）

新增四端 MessageScrollerAdvancedExample 和 Advanced Story，覆盖清单为114族、291 Story、四端各789个公开值入口、167个示例。共享模型按稳定可见消息/文字节点保留阅读位置，观察直接消息行以处理等总高度重排，复合前后插入使用锚点位移；卸载恢复 overflow-anchor 并取消排队帧。

回归实际发现 React Button 丢失调用方 aria-busy；四端统一属性优先级，保留可取消的忙碌动作，loading 仍强制忙碌并禁用。媒体复用现有资产，无新增依赖或调色板。虚拟化、冻结列/编辑、缩放/刷选等高级能力仍有边界，不以目录覆盖代替验收。

本批验收为114族、291 Story、四端各789个公开值入口、167个示例。四端消费/示例8项、最终影响行为4项和视觉66项通过；首轮全量72项通过、1项卸载测试边界修正后复验，最终覆盖73个独立浏览器用例，具体分批范围保留在验收记录中。291 Story明暗默认WCAG、窄屏页面溢出和有效transition: all均为0。

80张场景图经20种联系表及重点原图复核；隐藏说明修正后复核8张涉及空态的联系表，其余60张已审阅原图未变。48次四端对照中44次完全一致，4次手机阅读状态仅10–12个边缘像素且RGB通道差最大1；保留差异记录。20次阅读位移最大0.421875px，原始夹具160px漂移修正为0px。新增4张独立Linux基线，与已审阅默认原图0差异，原有62张Linux及2张Windows文件哈希不变。详见 [媒体锚点验收](audits/2026-10-03/message-anchor-linux/acceptance.json)。

## 2026-10-04 — DataTable 冻结列

- 四端共享 pinnedColumns 的逻辑起始/结束分组、真实列宽测量、RTL 和窄屏自动暂停/恢复吸附；继续使用原生表格和现有 Token。
- 新增四端 DataTableFrozenExample、Frozen Story、模型/SSR/交互与 Linux 视觉回归；覆盖为114族、292 Story、四端各789个公开值入口和171个示例。
- 验收范围与环境限制见 [冻结列记录](audits/2026-10-04/data-table-frozen-linux/acceptance.json)。虚拟化、编辑、图表缩放/刷选和复杂题型仍需后续独立批次。

## 2026-10-05：统一图标能力

选择 Lucide 的框架无关节点，新增四端 Icon、按需导入、动态节点/尺寸/描边、名称语义、固定描边和 RTL 镜像。替换内置关闭/勾选/文件/转移/排序/快捷操作与示例符号；SpeedDial 接受 IconNode，保留字符串兼容。四端示例与Story同步，截图和详细过程仅进入忽略目录。剩余组合能力继续按 [范围表](ark-ui-coverage.md#下一批高级能力的边界) 分批推进。


## 2026-10-05：问卷异步校验与默认对齐

- 四端共享逐题异步校验、提交互斥、取消和过期结果处理；最终提交全量重验，支持失败重试及异常说明。
- 题目/答案/校验函数替换、禁用与卸载中止请求；SSR 不请求业务服务。
- 窄屏长选项复现首行中心偏移22.5px，修正原生 margin、尺寸与首行对齐；补真实几何回归。
- 新增四端 QuestionnaireAsyncExample 和 AsyncValidation/LongOptions/CallbackUpdates Story；115族、297 Story、四端各790公开值入口、179示例。复杂题型与表格编辑等后续范围仍单独列出。

- 复核确认长按钮换行偏移106.578125px与异步错误后body失焦，修正逻辑结束边缘及有条件焦点恢复；React完成回调改为读取最新绑定。

## 表格编辑与逻辑对齐（2026-10-05）

- 四端同步文字/数值草稿、同步校验、异步保存、取消/过期结果、受控数据、错误重试、SSR和清理。
- 用原生按钮进入编辑，Enter保存、Escape取消，不篡改表格为grid；表头、值和输入框共用start/center/end，继承RTL。
- 新增四端DataTableEditExample与Editing Story；115族、298 Story、四端各790公开值入口、183示例。虚拟化、复杂编辑器与批量编辑继续保留在范围表。

- 明确订阅 Vue/Solid 草稿激活与 loading，校验器按函数值比较，原位替换也中止草稿。
- 截图修正 Save 样式优先级、窄屏编辑区宽度/聚焦留白和示例计数间距；全量回归发现的 React 会话删除后焦点改为实际 DOM 提交后恢复。
