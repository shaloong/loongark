# LoongArk 组件覆盖

更新时间：2026-10-05。按组件族计数，Progress 的线性/圆形属于同一族。

目前 115 个组件族具有 React、Vue、Solid、Svelte 对应入口。最近批次补齐 Ark 裁剪、JSON 与辅助组件，并复核高级部件，详见 [附件、消息与问卷](conversation.md)、 [选择与输入组件](selection-inputs.md)、[浮动动作与媒体布局](action-media.md) 和 [持续清单](component-coverage.json)。

| 组件族               | React | Vue | Solid | Svelte | 交付来源            |
| -------------------- | ----- | --- | ----- | ------ | ------------------- |
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

AlertDialog/Sheet/Drawer 复用 Dialog 的焦点锁、Escape、隐藏与恢复行为；Drawer 为底部模态抽屉，不承诺 Vaul 的弹簧拖拽、吸附点等第三方 API。Menubar 在多个 Ark Menu 根节点之间提供横向循环焦点。NavigationMenu 使用 Popover 与语义导航链接。Sidebar 使用 Collapsible 管理面板。

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
