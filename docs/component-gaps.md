# 常用组件缺口与本批补齐（2026-10-03）

上一轮 78 个组件族与“待补 38 个已完成”仅指当时的清单。本次扩大对照 [shadcn 组件目录](https://ui.shadcn.com/docs/components) 和 [MUI 组件目录](https://mui.com/material-ui/all-components/)，检查公开入口、实际行为与四端支持；相同功能的不同名称按等价组件记录，不通过增加别名凑数量。

## 本批新增的 13 个组件族

| 组件             | 提供的封装与行为                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| Textarea         | 原生多行输入、表单 name/value、只读/禁用/无效状态；React 原生 ref，Vue v-model，Svelte bind:value |
| Link             | 原生链接、焦点环、下划线与悬停状态；保留 href/target/rel                                          |
| Chip             | 标签、Label、RemoveTrigger；删除按钮默认 type=button，支持键盘触发及禁用                          |
| List             | ul/li 列表、按钮/链接、图标、文本/描述；原生语义与选中样式                                        |
| AvatarGroup      | 头像重叠布局与溢出计数，复用现有 Avatar                                                           |
| Paper            | 默认/次级中性面板，不要求 Card 的标题与页脚结构                                                   |
| Box              | 可变原生标签与 Token padding                                                                      |
| Stack            | 默认纵向，支持横向、Token gap、换行                                                               |
| Container        | 居中内容容器，最大宽度 1200px，由 control.containerWidth Token 控制                               |
| Grid             | 1–12 列与 Token gap；480px 以下默认单列，子元素可收缩                                             |
| Timeline         | 有序活动记录、Indicator、Content、Title、Description、Time                                        |
| AppBar           | 原生 header 与 Toolbar；工具条自然换行                                                            |
| BottomNavigation | 原生导航链接、图标/文本、受控 active → aria-current=page                                          |

这些封装在 React、Vue、Solid、Svelte 均提供相同命名的值入口。共享结构和 CSS 放在 Kit 的 foundations 模块；框架适配层处理原生渲染、事件和绑定。颜色只消费现有 Shaloong VI 语义 Token，间距与动效延续已验收的规范。

基础批次的 Textarea 提供原生垂直手动调整；后续批次已增加可选自动高度（见下文）。Chip 的删除、List 的选择和 BottomNavigation 的路由状态由业务控制；它们不会自行删除业务数据或接管应用路由。Grid 的自定义断点可以通过 class/style 覆盖。

独立 Story 展示每个组件族；补充 Textarea 状态、Chip 变体、横向 Stack、四列 Grid。四端各增加 FoundationsExample，验证所有新组件的组合使用。

## 等价能力与后续缺口

最新清单见 [component-coverage.json](component-coverage.json)。Input OTP = PinInput、Dropdown Menu = Menu、Resizable = Splitter、Autocomplete = Combobox、Stepper = Steps、Snackbar = Toast；Dialog 已包含 Overlay/Backdrop/Portal。IconButton 可以通过现有 Button 的 icon 尺寸实现。

继续补齐：TransferList、独立 TimePicker 与 Textarea 自动高度现已交付四端封装，详见 [选择与输入组件](selection-inputs.md) 和 [本批验收](audits/2026-10-03/selection-inputs/acceptance.json)。

本次继续补齐与后续缺口：

- SpeedDial / FloatingActionButton：已补齐，见 [浮动动作与媒体布局](action-media.md)。
- ImageList / Masonry：已补齐跨行跨列网格与按列媒体布局，见同批文档。
- Attachment、Message、Bubble、MessageScroller、Questionnaire：本批补齐，职责、API 与限制见 [附件、消息与问卷](conversation.md)。

上述 5 个专用组件已补齐，当前覆盖清单无待补项；这是已声明目录的覆盖结果，不代表所有第三方组件 API 均兼容。以下 91 族/221 Story 验收对应基础批次；上一批累计 97 族/239 Story 的证据见 [动作与媒体批次验收](audits/2026-10-03/action-media/acceptance.json)。

## 验证和证据

持续覆盖清单记录当前组件族、等价能力与待补项。先构建发布产物和 Storybook，再运行 `pnpm check:coverage`，自动核对全部组件族的 Story 和四端公开 Root 入口。旧的 2026-10-02 审查记录保留，新增截图、测量与验收存于 [2026-10-03/component-expansion](audits/2026-10-03/component-expansion/acceptance.json)。

新增交互回归检查 Textarea 的绑定与 FormData、Chip 键盘删除和表单提交隔离、List 选择、BottomNavigation 当前页、Grid 的桌面/375px 布局，以及明暗无障碍。既有全部 Story 的测量与无障碍回归继续执行，不只测试新组件。

本批验收结果：91 个组件族、221 个 Story、四端各 606 个公开 LoongArk 值入口；95 个框架示例运行通过。全量浏览器回归 27 项通过（四端消费的 8 项另行执行并通过），既有视觉基线 2 项通过。明暗各 221 个 Story 的默认展示无障碍违规、375px 页面溢出与 transition: all 均为 0。九包构建、公开声明、四端 SSR、Svelte 检查和 CLI Token 产物校验通过。

## 五项补齐后的常用组件复核

重新核对公开入口与独立 Story：输入与表单（Input、Textarea、Field、Fieldset、选择组、Combobox、TransferList、TimePicker）、反馈与浮层（Alert、Toast、Empty、Progress、Dialog、AlertDialog、Drawer、Sheet）、导航与布局（Tabs、Sidebar、NavigationMenu、AppBar、BottomNavigation、Grid、Masonry）、数据与媒体（Table、DataTable、Chart、ImageList、Carousel）均已有四端能力。IconButton 继续使用 Button 的 icon 尺寸，OTP、Autocomplete、Snackbar 等保持既有等价记录，不新增别名。

本轮不因目录名称相近而增加第三方兼容封装。继续以全量 Story 的浅深色、375px 溢出、Axe 与动效检查，以及四端真实消费回归发现具体问题。Linux 验收中修复的真实问题和限制记入本批验收，未将旧 Windows 验收结果作为 Linux 已通过的依据。

DataTable 后续复核发现选择清理、旧页码、失效排序与受控 checkbox 原生状态不一致，已完成四端修正；选择列、窄屏页脚及 Typography muted 层级也根据真实截图调整。当前累计 102 族、262 Story 和 111 个框架示例，见 [表格说明](data-table.md) 与 [Linux 验收](audits/2026-10-03/data-table-linux/acceptance.json)。

Chart 压力场景进一步确认长分类重叠、数值轴裁切、系列辨识与 SVG 占位问题，已在共享模型/样式修正，四端同步图例、缺失值语义与回归。当前累计 102 族、266 Story 和 115 个框架示例；清单仍无待补组件族。见 [图表说明](chart.md) 与 [Linux 验收](audits/2026-10-03/chart-linux/acceptance.json)。
