# LoongArk 组件覆盖

更新时间：2026-10-03。按组件族计数，Progress 的线性/圆形属于同一族。

目前 97 个组件族具有 React、Vue、Solid、Svelte 对应入口。最近两批补齐选择输入与浮动动作、媒体布局，详见 [选择与输入组件](selection-inputs.md)、[浮动动作与媒体布局](action-media.md) 和 [持续清单](component-coverage.json)。

| 组件族               | React | Vue | Solid | Svelte | 交付来源        |
| -------------------- | ----- | --- | ----- | ------ | --------------- |
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
