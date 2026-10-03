# LoongArk 组件覆盖

更新时间：2026-10-03。按组件族计数，Progress 的线性/圆形属于同一族。

目前 114 个组件族具有 React、Vue、Solid、Svelte 对应入口。最近批次补齐 Ark 裁剪、JSON 与辅助组件，并复核高级部件，详见 [附件、消息与问卷](conversation.md)、 [选择与输入组件](selection-inputs.md)、[浮动动作与媒体布局](action-media.md) 和 [持续清单](component-coverage.json)。

| 组件族               | React | Vue | Solid | Svelte | 交付来源        |
| -------------------- | ----- | --- | ----- | ------ | --------------- |
| DateInput | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 新版 |
| Swap | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 新版 |
| Toc | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 新版 |
| ImageCropper | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| JsonTreeView | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| ClientOnly | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| DownloadTrigger | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| FocusTrap | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| Format | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| Frame | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| Highlight | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| Presence | ✓ | ✓ | ✓ | ✓ | 2026-10-03 Ark 复核 |
| Attachment           | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Message              | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Bubble               | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| MessageScroller      | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Questionnaire        | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| FloatingActionButton | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| SpeedDial            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| ImageList            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Masonry              | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| TransferList         | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| TimePicker           | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Textarea             | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Link                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Chip                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| List                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| AvatarGroup          | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Paper                | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Box                  | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Stack                | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Container            | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Grid                 | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Timeline             | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| AppBar               | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| BottomNavigation     | ✓     | ✓   | ✓     | ✓      | 2026-10-03 新增 |
| Accordion            | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Alert                | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Alert Dialog         | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Angle Slider         | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Aspect Ratio         | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Avatar               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Badge                | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Breadcrumb           | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Button               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Button Group         | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Calendar             | ✓     | ✓   | ✓     | ✓      | 补齐独立入口    |
| Card                 | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Carousel             | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Chart                | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Checkbox             | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Clipboard            | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Collapsible          | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Color Picker         | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Combobox             | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Command              | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Context Menu         | ✓     | ✓   | ✓     | ✓      | 补齐独立入口    |
| Data Table           | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Date Picker          | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Dialog               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Direction            | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Drawer               | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Editable             | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Empty                | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Field                | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Fieldset             | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| File Upload          | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Filter Bar           | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Floating Panel       | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Hover Card           | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Input                | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Input Group          | ✓     | ✓   | ✓     | ✓      | 补齐独立入口    |
| Item                 | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Kbd                  | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Label                | ✓     | ✓   | ✓     | ✓      | 补齐独立入口    |
| Listbox              | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Marquee              | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Menu                 | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Menubar              | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Native Select        | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Navigation Menu      | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Number Input         | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Pagination           | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Password Input       | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Pin Input            | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Popover              | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Progress             | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| QR Code              | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Radio Group          | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Rating Group         | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Scroll Area          | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Segment Group        | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Select               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Separator            | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Sheet                | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Sidebar              | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Signature Pad        | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Skeleton             | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Slider               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Spinner              | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Splitter             | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Steps                | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Switch               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Table                | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |
| Tabs                 | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Tags Input           | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Timer                | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Toast                | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Toggle               | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Toggle Group         | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Tooltip              | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Tour                 | ✓     | ✓   | ✓     | ✓      | 补齐原计划      |
| Tree View            | ✓     | ✓   | ✓     | ✓      | 原有组件修复    |
| Typography           | ✓     | ✓   | ✓     | ✓      | 新增常规组件    |

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
