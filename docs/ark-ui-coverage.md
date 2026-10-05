# Ark UI 组件与高级能力核对

核对时间：2026-10-03。官方仓库固定在 [28f20ae](https://github.com/chakra-ui/ark/tree/28f20ae0cbe27c1927fc6a86cc69cd06cf194ed7)，目录快照见 [ark-ui-upstream.json](ark-ui-upstream.json)。npm 当前发布的 React/Vue/Solid 是 5.39.2，Svelte 是 5.24.2；本批已从锁定的 5.30.0 / 5.15.0 同步升级至上述发布版。源目录与安装版本分开核对，不把 main 分支源代码视作已安装能力。

## 原目录以外的实际缺口

| 能力                              | 原有状态                                    | 本批处理                                                                                                                                |
| --------------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| ImageCropper                      | 未封装                                      | 开放 Root、Provider、Context、Viewport、Image、Selection、Grid、Handle 和控制 Hook；例子实际缩放、旋转、翻转、重置、键盘移动与 PNG 导出 |
| JsonTreeView                      | 未封装；TreeView 不等同于 JSON 类型预览     | 开放 Root、Provider、Tree、Hook；例子实际展开、折叠、动态数据、嵌套数组与文本转义                                                       |
| ClientOnly                        | 未公开                                      | 原生客户端渲染与 SSR fallback                                                                                                           |
| DownloadTrigger                   | Attachment 有链接下载，缺少程序生成内容下载 | 原生字符串、Blob/File 和函数数据下载；例子真实下载文本                                                                                  |
| FocusTrap                         | Dialog 自带焦点管理，缺少独立焦点约束       | 原生独立约束、初始焦点与结束后恢复；例子检查 Tab 环绕                                                                                   |
| Format                            | 未公开                                      | 数字、字节与相对时间；LocaleProvider 同步公开                                                                                           |
| Frame                             | 未公开                                      | 原生 iframe 环境；示例在 iframe 内创建独立深色 LoongArkProvider                                                                         |
| Highlight                         | 未公开                                      | 原生文本匹配高亮与 Hook；共享样式使用既有语义 Token                                                                                     |
| Presence                          | 浮层已有内置生命周期，缺少独立封装          | 原生 lazyMount、unmountOnExit、present 与 Hook                                                                                          |
| Collection / Environment / Locale | 部分助手已公开                              | 补网格/文件树 Collection 工厂、环境与语言 Provider，不计为新组件族                                                                      |
| DateInput / Swap / TOC            | 原锁定依赖没有提供                          | 四端 Root/Provider/Context/部件及 Hook；分段日期与范围、受控切换、真实文章滚动与活动目录                                                |
| 手势抽屉                          | 原 Drawer/Sheet 基于 Dialog                 | Drawer 迁移原生 Drawer：手势、吸附点、Stack、Grabber、SwipeArea、Indent；Sheet 保留 Dialog                                              |

官方 [Ark UI 文档](https://ark-ui.com/docs/overview/introduction) 是行为/API 参考。Portal 在 React/Svelte 是组件，在 Vue/Solid 采用框架原生传送机制；现有 LoongArkPortal 已提供四端局部主题容器，不增加别名。Collection、factory 与 hooks 等辅助模块不混入组件族数量。

## 既有组件高级部件

本批补出 RootProvider、Context、ItemContext、受控 Hook，以及之前未公开的 Checkbox.Group、Combobox.Empty、Listbox.Input/Empty/ValueText、Pagination.FirstTrigger/LastTrigger、NavigationMenu.Viewport/Indicator 等部件。原生类型与状态机保持在 Ark，样式集中在 Primitives；框架层处理渲染和生命周期。Provider 接受 Ark 原生 Props；LoongArk 自定义 `size` 并非 Ark Provider Props，Provider 默认消费 md 样式，特殊尺寸可通过已有 class/style 定制。

[原生部件对照](ark-ui-parts-audit.json)按安装版本记录值部件；[公开模块 API 对照](ark-ui-api-audit.json)包含 Hook 和类型名称。命名空间缺失不代表 Root 缺失，类型/Collection 类也不代表缺少组件。Dialog.Backdrop 已由 LoongArkDialogOverlay 提供；Listbox.Content 已由 LoongArkListboxList 提供，不为等价部件再增加别名。

SegmentGroup 原实现是 ToggleGroup 外观，无法与 Ark SegmentGroup 的 Provider/Item 部件组合。本批统一使用真正的单选 SegmentGroup，补隐藏表单输入、指示器和可访问名称；值从 `string[]` 改为 `string | null`，回调也同步。多选按钮继续使用 ToggleGroup，不把多个勾选值压入单选 API。迁移示例：`value={['overview']}` → `value="overview"`；Item 内组合 ItemHiddenInput 与 ItemText。Svelte Root 同步 `bind:value/ref`；Vue 将四端一致的 value 与 update:value 桥接到原生 modelValue，同时支持 v-model。例子验证程序重置与真实 FormData。

高级例子使用 Hook + RootProvider 控制多选，并通过原生 FormData 提交；分页检查首页/末页与禁用边界。Vue 多选 DOM 更新会把数组写成 select 的单个 value 属性，本批在更新后同步原生选中项，保证状态机值与真实表单一致；同步模型归 Kit，Vue 生命周期归适配层。

Vue/Svelte JsonTreeView 的 npm 发布版在初始化时分割 Props，会保留旧数据；官方 main 已有修复但尚未随上述版本发布。本批通过原生 TreeView Hook 与 JsonTreeView Provider 修正响应式计算：JSON 构建和默认展开模型放 Kit，框架负责计算和生命周期。Svelte 在数据集合更新时只重挂节点，保留父状态机的展开/选中状态；集合只依赖数据，避免展开动作造成节点重挂；节点重挂后恢复仍存在的焦点，用户已移到其他控件时不夺回焦点。Root 保留 Svelte 双向绑定；Vue 转发原生更新事件。SSR 与动态数据回归必须一起通过。

Svelte Frame 在写入文档前保存了旧 body，Portal 会挂到脱离文档的节点。本批使用 iframe load 后的真实文档，并在卸载时清理 ResizeObserver 和待执行帧；Vue Format.Number 补原生遗漏的 Intl 货币、style 与精度选项。新增的 `@zag-js/json-tree-utils@1.43.3` 直接依赖用于 Kit 的 JSON 节点模型，与本批 Ark 的传递版本一致；不引入新的解析库或色板。

`node scripts/audit-ark-coverage.mjs` 在成功构建后可重建两份 API 对照，按四端实际安装路径解析版本，并排除命名空间中的纯类型属性。

## 高级能力仍需持续补齐

公开 Ark 原生能力不代表所有 LoongArk 组合组件的高级场景已经全部交付。新版组件与原生 Drawer 已实现，继续处理组合模型的明确能力：DataTable 虚拟化/编辑、Chart 缩放/刷选/实时流、Questionnaire 复杂题型、消息虚拟化。具体交付必须同步四端示例、逻辑回归和桌面/手机明暗截图；不通过一个布尔“完整”字段掩盖未验收场景。

Linux 手工截图复核修正了裁剪图片顶对齐、手机默认裁剪框越出图片、拖拽命中区域被画成粗白条、分页首尾按钮高度不一致，以及 JSON 导航起点/装饰箭头错误显示焦点框。四端裁剪与 iframe 像素一致；JSON 分隔符空格和 Select 原生箭头有细微差异，保留实际像素对照，不声称四端完全逐像素相同。后续批次公开四端共同的 75 个 Context/ItemContext/Collection 控制 Hook，包括 useAsyncList、useListCollection、useListSelection。公开原生 Hook 仍不代表异步错误、取消、竞争请求等应用情景已经全部专项验收。

本批验证与限制见 [Linux 验收](audits/2026-10-03/ark-ui-linux/acceptance.json)。保留 Windows 基线；系统 Chromium 与 Playwright 固定下载版本分别记录。

## DateInput、Swap、Toc 与 Drawer

当前覆盖 114 个组件族、283 个 Story、四端各 789 个 LoongArk 值入口和 147 个示例。成功构建后的原生部件审计没有遗漏的独有可渲染部件。原生模块整体命名空间可能与 LoongArk 组合命名不同；纯类型、collection 类和框架内部 Props Context 不计为新组件族。Svelte 上游独有的四个部件 Props Context Hook 也按原生名称公开，不为其他端创建假 Hook；模块 API 审计中的 Hook 缺口已清零。

DateInput 保留 Ark 的 DateValue 和各段语义，支持 value/defaultValue、single/range、min/max、disabled/readOnly/invalid、locale、name、RootProvider 与受控 Hook。HiddenInput 按原生契约提交本地化日期字符串（例子 en-US 为 `10/4/2026`）；若服务端要求 ISO，请通过 value 的 DateValue.toString() 转换。范围名为 `trip[0]` 与 `trip[1]`，不把隐藏输入当成 native input[type=date]。

Swap 是指示内容切换部件，不另建业务状态机；例子以真实按钮控制 swapped，结合 Presence 对细节内容按需挂载，aria-expanded/aria-controls 同步。Toc 使用真实文章标题和原生 IntersectionObserver；四端 Root/Nav 生成不同 ID，Svelte Root 补齐上游遗漏的根属性，Vue 保持默认 autoScroll 一致。默认 scrollBehavior 为 auto，避免默认平滑滚动违背减弱动效。需要平滑滚动时由业务显式设置。上游 onActiveChange 在实际回归中返回前一状态；现已在 Kit 复用原生机器并从 bindable 新值发出回调，禁止原生旧值的重复通知。四端 Root 与 useToc 共同采用该修正，示例由 activeIds 受控并展示回调中的 activeIds/activeItems。业务暂停更新时仍收到观察结果，但导航保持业务传入的状态；恢复后使用最新回调接受后续更新。React RootProvider 同步补齐根属性，Vue Hook 保留可选 emits 参数；共享层过滤未定义的控制属性，防止覆盖生成 ID 和默认值。目视发现活动链接背景盖住指示线，已用局部层级修正。观察器、滚动、指示器与清理继续使用 Zag 1.43.3，新增的直接依赖仅声明现有传递版本。

Drawer 的命名保持现有 Root/Trigger/Portal/Overlay/Positioner/Content/Title/Description/Action/Cancel，并加入 Stack、RootProvider、Context、Grabber/Indicator、SwipeArea、Indent/IndentBackground 及控制 Hook。Overlay 对应原生 Backdrop，不再增加重复平铺别名。原 Dialog 的 placement Props 不等同于原生 swipeDirection；下/上/左/右使用 swipeDirection，并由共享样式对齐布局。默认 Root 与 RootProvider 开启 lazyMount/unmountOnExit，防止未打开的嵌套 Positioner 先被外层模态隐藏、打开后仍无法进入无障碍树；Solid DrawerPortal 同时根据 Presence 挂载 Portal，防止 Solid 的空包装提前被隐藏。业务可显式覆盖，两项同时关闭的嵌套行为仍属上游限制。Svelte 目录示例在滚动容器 ref 就绪后挂载 Root，保证 IntersectionObserver 使用指定文章而非默认视口。

高级能力继续按可复现情景交付，不能把“公开所有部件”写成“全部业务能力已完成”。待补验证包括 DateInput 完整输入/粘贴/日期时间/国际化组合、Drawer 真实触摸/RTL/所有方向、Collection 异步取消与请求竞争，以及表格虚拟化/编辑、图表缩放/刷选/实时流、复杂问卷题型和消息虚拟化。

本批 Linux 验收：114 族、283 Story、四端各 789 个公开值入口；147 个四端示例运行通过，专项行为 8 项、全量浏览器 106 项、视觉 46 项通过。明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；64 张四端和 16 张 Story 截图已目视核验。新增 16 张 Linux 基线，原有 30 张 Linux 与 2 张 Windows 基线不变。详细范围与限制见 [验收记录](audits/2026-10-03/ark-next-linux/acceptance.json)。

四端问卷条件题、格式/跨题同步校验和受控拒绝恢复已进入独立批次，见 [问卷说明](conversation.md) 与 [验收](audits/2026-10-03/questionnaire-advanced-linux/acceptance.json)。这属于 LoongArk 组合能力，Ark UI 没有提供现成问卷组件。

表格 state、服务端分页和 columnKeys 列显示/顺序已同步四端；API 与证据见 [表格说明](data-table.md)。逻辑冻结列已同步四端（见 [冻结列 API](data-table.md#冻结列)）；虚拟化和编辑仍未交付；不将这些能力混入 Ark 原生部件覆盖结论。

图表受控序列、数值范围与可访问数据表已同步四端，见 [图表说明](chart.md) 与 [验收](audits/2026-10-03/chart-advanced-linux/acceptance.json)。这属于 LoongArk 组合模型能力；缩放/刷选/实时流仍不算已完成。

消息与附件操作已同步四端：异步互斥、失败反馈、actionKey 中止旧操作、预览/取消、原生下载和焦点恢复，详见 [会话说明](conversation.md)。这是 LoongArk 组合能力，并不改变原生 Ark 部件覆盖结论；实际服务上传与 Markdown 仍由业务处理；媒体加载锚定已在后续独立批次补齐。

本批重新审计的独有可渲染部件与 Hook 缺口仍为 0。Svelte 原生 dialog 模块把 Root/RootProvider/Title/Trigger/Positioner 直接以短名导出；原始模块名审计中 RootProvider 一项不等于实际缺口，命名空间部件审计与真实 dist 声明确认 LoongArkDialogRootProvider 已存在，不添加 LoongArkRootProvider 这种歧义别名。

## 下一批高级能力的边界

这里只跟踪组件通用能力：受控状态、渲染、交互、表单/无障碍语义、性能、生命周期及可组合 API。消息/上传/查询接口、权限、评分规则和领域流程由业务实现，不再列为组件待办。异步能力关注回调契约、待处理/错误状态、取消与过期结果处理；组件不内置业务服务。

| 对象                 | 已验收能力                                                                  | 尚未交付或尚未专项验收                                  |
| -------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- |
| Message / Attachment | 异步互斥、错误/成功反馈、替换与卸载中止、复制/下载/预览/取消、焦点          | 真实消息/上传服务由业务实现；Markdown 解析不属于 Bubble |
| MessageScroller      | 跟随、暂停、回到底部、媒体/可见文字锚点、复合历史插入及清理                 | 虚拟列表、被移除消息或替换文字节点的语义位置            |
| Questionnaire        | 条件题、答案保留、受控拒绝、表单与同步/异步跨题校验、取消/过期结果与重试                              | 复杂输入题型、真机与多浏览器验收    |
| DataTable            | 受控查询/排序/分页、服务器模式、跨页选择、列显示/顺序、逻辑冻结列、请求状态 | 虚拟化、编辑及其键盘/表单契约                           |
| Chart                | 受控图例、范围裁切、缺失值/极值、可访问数据表、重绘焦点                     | 缩放、刷选、增量数据渲染与交互工具提示                  |
| DateInput / Drawer   | 分段编辑/范围/真实表单；手势/吸附点/嵌套模态                                | 完整粘贴/日期时间/国际化组合；真实触摸、RTL 与全部方向  |
| Async Collection     | 已公开原生控制 Hook                                                         | 通用异步控制契约、分页边界与卸载清理回归                |

后续以能复现的问题和真实使用场景逐批推进；目录和原生部件覆盖清零不关闭上表。媒体高度变化已按可见消息/文字锚点补齐，真实复现的160px漂移修正为0px；共享行为与四端高级示例见 [会话说明](conversation.md)，验收见 [媒体锚点记录](audits/2026-10-03/message-anchor-linux/acceptance.json)。
