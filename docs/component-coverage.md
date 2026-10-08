# LoongArk 组件覆盖

更新时间：2026-10-08。按组件族计数，Progress 的线性/圆形属于同一族。

目前 119 个组件族具有 React、Vue、Solid、Svelte 对应入口。最近批次补齐 Ark 裁剪、JSON 与辅助组件，并复核高级部件，详见 [附件、消息与问卷](conversation.md)、 [选择与输入组件](selection-inputs.md)、[浮动动作与媒体布局](action-media.md) 和 [持续清单](component-coverage.json)。

| 组件族               | React | Vue | Solid | Svelte | 交付来源            |
| -------------------- | ----- | --- | ----- | ------ | ------------------- |
| VirtualGrid          | ✓     | ✓   | ✓     | ✓      | 2026-10-07 二维虚拟布局 |
| VirtualMasonry       | ✓     | ✓   | ✓     | ✓      | 2026-10-07 虚拟瀑布流 |
| RichTextEditor       | ✓     | ✓   | ✓     | ✓      | 2026-10-06 独立编辑器 |
| CodeEditor           | ✓     | ✓   | ✓     | ✓      | 2026-10-06 独立编辑器 |
| DateInput            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 新版 |
| Swap                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 新版 |
| Toc                  | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 新版 |
| ImageCropper         | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| JsonTreeView         | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| ClientOnly           | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| DownloadTrigger      | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| FocusTrap            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| Format               | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| Frame                | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| Highlight            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| Presence             | ✓     | ✓   | ✓     | ✓      | 2026-10-03 Ark 复核 |
| Attachment           | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Message              | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Bubble               | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| MessageScroller      | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Questionnaire        | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| FloatingActionButton | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| SpeedDial            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| ImageList            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Masonry              | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| TransferList         | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| TimePicker           | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Textarea             | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Link                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Chip                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| List                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| AvatarGroup          | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Paper                | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Box                  | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Stack                | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Container            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Grid                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Timeline             | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| AppBar               | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| BottomNavigation     | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增     |
| Accordion            | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Alert                | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Alert Dialog         | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Angle Slider         | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Aspect Ratio         | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Avatar               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Badge                | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Breadcrumb           | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Button               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Button Group         | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Calendar             | ✓     | ✓   | ✓     | ✓      | 补齐独立入口        |
| Card                 | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Carousel             | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Chart                | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Checkbox             | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Clipboard            | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Collapsible          | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Color Picker         | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Combobox             | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Command              | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Context Menu         | ✓     | ✓   | ✓     | ✓      | 补齐独立入口        |
| Data Table           | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Date Picker          | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Dialog               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Direction            | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Drawer               | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Editable             | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Empty                | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Field                | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Fieldset             | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| File Upload          | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Filter Bar           | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Floating Panel       | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Hover Card           | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Input                | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Input Group          | ✓     | ✓   | ✓     | ✓      | 补齐独立入口        |
| Item                 | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Kbd                  | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Label                | ✓     | ✓   | ✓     | ✓      | 补齐独立入口        |
| Listbox              | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Marquee              | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Menu                 | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Menubar              | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Native Select        | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Navigation Menu      | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Number Input         | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Pagination           | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Password Input       | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Pin Input            | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Popover              | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Progress             | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| QR Code              | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Radio Group          | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Rating Group         | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Scroll Area          | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Segment Group        | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Select               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Separator            | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Sheet                | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Sidebar              | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Signature Pad        | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Skeleton             | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Slider               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Spinner              | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Splitter             | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Steps                | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Switch               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Table                | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |
| Tabs                 | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Tags Input           | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Timer                | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Toast                | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Toggle               | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Toggle Group         | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Tooltip              | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Tour                 | ✓     | ✓   | ✓     | ✓      | 补齐原计划          |
| Tree View            | ✓     | ✓   | ✓     | ✓      | 原有组件修复        |
| Typography           | ✓     | ✓   | ✓     | ✓      | 新增常规组件        |

## 能力约定

Ark 组件保持原生状态机、事件和键盘语义。布局组件通过统一部件元数据渲染语义 HTML；四端共用 CSS。Calendar 使用 DatePicker 的 inline 模式；ContextMenu 使用真正的右键触发器；InputGroup 与 Label 使用 Field/Input 语义。

AlertDialog/Sheet 复用 Dialog 的焦点锁、Escape、隐藏与恢复行为。Drawer 使用 Ark UI 原生 Drawer，支持手势、吸附点、Stack、Grabber、SwipeArea、Indent 与全方向/RTL；实际 API 和验收限制见 [Drawer 说明](drawer.md)。Menubar 在多个 Ark Menu 根节点之间提供横向循环焦点。NavigationMenu 使用 Popover 与语义导航链接。Sidebar 使用 Collapsible 管理面板。

DataTable 支持列排序、筛选、分页、行选择和空结果；当前行模型为标量字段。Chart 支持柱状/折线、多序列、负值、语义颜色、安全 SVG、原生提示和容器自适应；不是 Recharts 的 API 兼容层。Command 提供搜索、过滤集合和 Combobox 键盘选择。

上一轮按 shadcn 的 58 项传统需求清单验收；本轮新增 13 族及扩大对照后的缺口见 [常用组件缺口](component-gaps.md)。API 遵循 LoongArk/Ark 的组合方式，不承诺直接替换 shadcn 的 import 或 props。

构建、真实消费、SSR、公开类型、交互与视觉证据见 [整改报告](remediation.md)。

附件、消息与问卷批次补齐 Attachment、Message、Bubble、MessageScroller、Questionnaire；累计 102 族、257 Story、四端各 620 个公开值入口。等价职责与限制见 [组件说明](conversation.md)，真实验收见 [Linux 记录](audits/2026-10-03/conversation-linux/acceptance.json)。

DataTable 一致性批次完善受控选择、当前页全选、动态数据和列更新、局部键盘滚动与标签覆盖。累计 102 族、262 Story、四端各 620 个公开值入口、111 个框架示例。详见 [组件说明](data-table.md) 与 [Linux 验收](audits/2026-10-03/data-table-linux/acceptance.json)。

Typography 的 muted 变体现在使用已有语义次要文字颜色，补独立 Story 与四端示例的实际计算颜色回归。

Chart 可读性批次完善紧凑数值轴、分类密度、共享图例、缺失值断线和极值坐标。累计 102 族、266 Story、四端各 620 个公开值入口、115 个框架示例。见 [Chart 说明](chart.md) 和 [Linux 验收](audits/2026-10-03/chart-linux/acceptance.json)。

## Ark UI 高级能力复核（2026-10-03）

新增 ImageCropper、JsonTreeView 与独立辅助组件，开放既有组件的 Provider/Context 与高级部件。SegmentGroup 统一为 Ark 原生单选语义，Vue 多选表单值同步修正。新增四端裁剪、JSON、辅助组件与高级选择示例。新版 DateInput、Swap、TOC 和手势抽屉仍为待补，不把原目录完整视为高级能力全部验收。详细对照、API 与迁移见 [Ark UI 核对](ark-ui-coverage.md)。

本批累计 111 族、279 Story、四端各 756 个公开值入口、131 个框架示例；仍待 DateInput、Swap、TOC 与手势 Drawer。详见 [Ark UI 核对](ark-ui-coverage.md)。

## Chart 交互与可访问数据批次（2026-10-03）

新增 ChartAdvancedExample 与 Interactive/DisabledControls Story，114 族、289 Story、四端各 789 个公开值入口和 159 个示例。图例支持受控选择/拒绝、禁用及全部隐藏后恢复；序列颜色/虚线身份保持；domain 固定数值轴并保留原始数据说明；showDataTable 提供原生可展开数据表。重绘保留展开和焦点，外部控件焦点不被抢回，卸载释放监听与观察器。API 见 [图表说明](chart.md)。

图表批次验收：四端消费/示例 8 项、159 个示例运行、全量浏览器 67 项、视觉 58 项通过。289 Story 的明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；60 张场景图已通过联系表复核，36 次四端对比为 0 像素差异。目视发现手机展开表格撑开页面，修复 max-width 并补局部键盘滚动回归后重验。新增 4 张 Linux 基线，原有 54 张 Linux 与 2 张 Windows 基线不变；缩放、刷选及实时流未提供。详见 [独立验收记录](audits/2026-10-03/chart-advanced-linux/acceptance.json)。

MessageScroller 媒体与可见文字锚点批次新增四端 MessageScrollerAdvancedExample 和 Advanced Story。当前114族、291 Story、四端各789个公开值入口、167个框架示例；组合能力涵盖异步媒体、复合前后插入、用户阅读位置与卸载清理，Button 忙碌语义同时按四端统一。API 见 [会话说明](conversation.md)，验证与限制见 [独立记录](audits/2026-10-03/message-anchor-linux/acceptance.json)。组件族目录覆盖不代表虚拟化、冻结列、编辑、缩放、刷选或复杂题型全部完成。

### DataTable 冻结列（2026-10-04）

继续完善现有组件，不新增别名或组件族。四端 pinnedColumns 支持逻辑两边冻结、显示/顺序联动、真实尺寸更新、RTL、过宽时普通滚动和键盘焦点可见；增加四端示例与 Frozen Story。该批完成时为114族、292 Story、四端各789个公开值入口、171个示例。验证和高级能力边界见 [冻结列验收](audits/2026-10-04/data-table-frozen-linux/acceptance.json)及 [API](data-table.md#冻结列)。

Icon 提供四端共享 Lucide 节点、可访问名称、尺寸、固定描边与 RTL；共299个Story，四端各790个公开值入口和187个示例。详细验收见 [图标摘要](audits/2026-10-05/icons-linux/acceptance.json)，完整组件目录仍不代表所有高级能力完成。

批量编辑批次：当前115族、300 Story、四端各790公开值入口、191个框架示例。原子变更集和冲突安全撤销见 [表格说明](data-table.md#批量编辑与撤销)。

虚拟化批次同步 DataTable/MessageScroller、四端 VirtualizationExample 与两个 Virtualized Story：115族、302 Story、四端各790公开值入口、195示例。实际测量、焦点行保留、有界 SSR 与阅读锚点见 [表格](data-table.md#可变行高虚拟化) 与 [消息](conversation.md#消息虚拟化)。

虚拟化验收：四端72项、受影响16项、Linux视觉106项通过；范围、短暂失败与平台限制见 [验收摘要](audits/2026-10-05/virtualization-linux/acceptance.json)。

图表分类缩放/原生范围刷选、多序列指针提示/键盘检查与增量数据已同步四端和 ChartInteractionExample/ZoomAndBrush Story，进入专项验收。当前115族、303 Story、四端各790公开 LoongArk 值入口、199示例；API 见 [图表说明](chart.md#分类缩放刷选与交互提示)。

图表缩放、刷选、交互提示和增量数据更新已完成四端专项验收，见 [图表窗口验收](audits/2026-10-05/chart-window-linux/acceptance.json)。覆盖为 115 个组件族、303 个 Story、四端各 790 个公开 LoongArk 值入口、199 个示例。复杂问卷和异步 Collection 契约继续实现。

复杂问卷新增数值、日期、下拉选择、矩阵和排序题型，四端共享校验、表单和焦点行为；见 [问卷说明](questionnaire.md) 与 [验收](audits/2026-10-05/questionnaire-types-linux/acceptance.json)。覆盖为 115 个组件族、304 个 Story、四端各 790 个公开 LoongArk 值入口、203 个示例。异步 Collection 契约继续实现。

异步 Collection 复用原生 useAsyncList，新增共享加载/接收确认契约、稳定键去重、游标循环、重试与取消；见 [异步 Collection](async-collection.md)。四端专项验收通过；见 [Linux 验收](audits/2026-10-05/async-collection-linux/acceptance.json)。


2026-10-05该轮指定的六项高级能力已逐项实现并验收：复杂编辑器、原子批量编辑与撤销、可变高度虚拟化、图表缩放/刷选/提示与增量更新、复杂问卷、异步 Collection。当批 **115 个组件族、305 个 Story、四端各 790 个公开 LoongArk 值入口、207 个框架示例**。具体 API、平台限制和每批验收保留在上述链接；业务服务仍由调用方提供。过程截图和日志只存忽略目录，仓库仅保留简短摘要及实际回归使用的基线。

最终异步 Collection 批次：四端回归 121 项、完整 Story 浏览器回归 95 项、视觉比较 126 项、Pages 子路径检查通过；207 个框架示例运行。121 个消费专用用例在 Story 服务中跳过，已由四端套件独立覆盖。详见 [最终验收](audits/2026-10-05/async-collection-linux/acceptance.json)。


全量高级缺口补齐第一批：表格有界多级批量撤销/重做、完整行快照冲突保护、拒绝/取消保留历史、原生文字撤销及键盘操作。四端同步，40项四端消费与示例场景通过，最终16项专项复验通过，13项表格Story场景通过，126项视觉比较通过；207个示例运行。只更新8张已审阅受影响Linux基线，其余120张及其中2张Windows基线不变。见 [验收](audits/2026-10-05/data-table-history-linux/acceptance.json) 与 [剩余清单](advanced-capabilities.md)。

重复题组扩展既有Questionnaire，未增加组件别名；加入4端示例和RepeatedGroups Story，当前117族、322Story、四端各792个LoongArk前缀公开值、247示例。职责/API见[问卷](questionnaire.md)，验收见[记录](audits/2026-10-06/questionnaire-groups-linux/acceptance.json)。


## 自定义问卷渲染契约（2026-10-06）

既有Questionnaire增加custom题型与四端原生renderers，以稳定实例路径管理答案、必填/错误语义、递归FormData、注册控件焦点、受控拒绝恢复和取消/卸载。支持string、strings、map答案；业务题目定义与第三方控件仍由调用方提供。共享RatingGroup修复悬停后的键盘操作、接受值与预览的语义区分，以及Svelte受控回退。目录117族、323Story、四端各792公开值、251示例；API见[问卷契约](questionnaire.md)。

最终新构建、契约、发布类型/四端SSR和Svelte检查通过（0错误/4既有警告）。三引擎原生专项各27项通过；既有问卷Chromium100项、Firefox/WebKit各96项通过；Story47项及全量Linux视觉194项通过。144张四端截图与8张新Linux基线已实际审阅，212张旧基线含Windows哈希未变。验收范围、修正和限制见[验收记录](audits/2026-10-06/questionnaire-custom-linux/acceptance.json)。横向/二维/瀑布流虚拟化、日期、Drawer以及整库平台/真机验收继续实施。


## DataTable 横向列虚拟化（2026-10-06）

既有DataTable增加横向窗口，与可变行高窗口独立启用或组合。排序、筛选、范围粘贴、编辑和历史继续使用完整模型；冻结列、编辑列和活动游标保留，ARIA暴露完整列计数和绝对位置。四端各增加TableColumnWindowExample及根类型入口，新增ColumnVirtualization Story；当前117族、324Story、四端各792个LoongArk公开值、255个示例。API见[表格](data-table.md#横向列虚拟化)。

最终新构建、契约、发布类型/四端SSR及Svelte通过（0错误/4既有警告）；642个运行时文件与交互验收版本逐文件哈希相同。三引擎新增各17项、既有表格各96项通过；Story32项及完整Linux视觉202项通过。144张原生截图、4张Story范围截图与8张新Linux基线已实际查看，220张旧基线含Windows哈希不变。范围和平台限制见[验收记录](audits/2026-10-06/table-column-window-linux/acceptance.json)。二维网格、虚拟瀑布流、日期、Drawer及整库平台/真机验收继续实施。

右键菜单输入批次增加四端 ContextMenuExample 和 NativeInput Story：119 族、329 Story、四端各 794 个公开值入口、275 个框架示例。共享过滤仅允许 touch/pen 长按，未知类型鼠标保留原生右键；四端发布包交付，无仓库依赖补丁。示例的触发按钮和上下文表面通过共享 Token 样式统一。原生 Safari 高级 runner 扩展尚待 macOS 完整验收。

焦点归属补充：原生问卷submitter与body状态、单元格/批量字段的延迟恢复、隐藏树形行祖先定位共享四端行为；组件族与公开值数量不变。平台验收仍以真实任务结果为准。

共享图表检查器与浮层补齐窄屏边界：放大类别字体、退出中的旧触发器宽度及 Sheet 滑出绘制均纳入回归；公开入口与 Story 数量不增加。

Drawer 手柄同步四端的原生指针默认行为保护，避免拖动误选正文；Chart 数据表的原生展开入口同步 Lucide 箭头、RTL 与焦点样式。示例预览标题显示可读名称，原始示例标识继续用于四端自动化。

Storybook Docs 从真实四端源码和公开类型生成参考资料，包含API缺省值来源、状态链接和同场景组合代码。当前能力/限制与验证范围见 [能力概览](capabilities.md) 和 [验收索引](acceptance.md)。

日期状态补充识别 Ark 空属性与 true，修复选中悬停对比度和 WebKit/Svelte 系统按钮外观；最终四端三引擎语义、Docs、表单专项与310项Linux视觉通过，详见当前验收。
