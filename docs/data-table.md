# DataTable 的选择、排序与更新

DataTable 提供原生表格、文本筛选、三态排序、分页、行选择和空结果。共享行模型和选择状态位于 Kit，专用样式位于 Primitives；框架层负责渲染、受控绑定与挂载后的状态清理。四端共享同一套标签和 Token，不增加第三方表格依赖。

## API

`data` 和 `columns` 为必需项。数据行仍是标量字段，列由 `key/label/sortable` 定义。列 key 必须非空且唯一；行 `rowKey` 默认为 `id`，未提供值时使用原始下标，最终 ID 必须唯一。会更新、插入或重排的数据应提供稳定的 rowKey。

`pageSize` 控制每页行数，非法数值归一为默认大小。排序只作用于当前存在且可排序的列；列删除或改为不可排序时清理旧排序。源数据收缩时页码限制到合法范围，后续恢复数据不会自动跳回旧页。

`defaultSelectedIds` 初始化非受控选择，`selectedIds` 配合 `onSelectionChange(ids)` 使用受控选择。选择跨分页和筛选保留；全选只作用于当前页，取消全选保留其它页的选择。页内部分选中时，原生 header checkbox 同时具备 indeterminate 与 mixed 语义。数据删除后，非受控组件清理失效 ID 并通知一次；恢复同一行不会恢复旧选择。受控选择由业务维护，显示与后续用户通知均剔除无效或重复 ID，不在渲染中修改业务状态。调用方拒绝一次更新时，DOM checkbox 恢复到受控值。

Vue 支持 `v-model:selectedIds` 和 `selectionChange`；React、Solid、Svelte 使用 `selectedIds/onSelectionChange`。Svelte 沿用显式回调，不增加独立选择别名。

`label` 命名原生 table 和可聚焦的滚动区域，默认 Data table。长单元格保持完整内容，通过键盘或指针在局部横向滚动，不撑宽页面。

`labels` 为局部文本覆盖对象：`filter/filterPlaceholder/selectPage/empty/previous/next` 是文本，`selectRow(id)` 提供行选择名称，`summary({total,selected,page,pageCount})` 提供页脚摘要。缺省或 undefined 的字段回退到共享默认值。标签与可见操作同步，不只替换 aria-label。

## 四端示例与证据

DataTableExample 展示当前页全选、跨页保留、过滤后选择、外部清空、拒绝选择更新、删除源数据、切换列和恢复数据。非受控 Live queue 单独验证删除后的选择清理、回调次数与页码保持。独立 Story 补充空结果、长单元格和中文标签。

[本批 Linux 验收](audits/2026-10-03/data-table-linux/acceptance.json)记录实际命令、浏览器版本、桌面/375px 和浅深色截图。Windows 证据保留。默认所有 Story 的布局与无障碍检查仍执行，不仅检查表格。

## 边界

现支持客户端与服务端标量数据、列显示及顺序控制。已提供逻辑冻结列；已提供文字/数值单元格编辑；虚拟化见下文；列交互见下文；数据请求、取消与竞争处理由调用方负责，不假定业务接口协议。它是已有能力的完善，不声称兼容 MUI Data Grid、Ant Design Table 或第三方表格引擎的全部 API。

## 高级状态与服务端模式

`state/defaultState/onStateChange` 统一控制 `{query, sort?, page}`，page 从 1 开始；`pageSize` 继续独立设置。未传 state 保持现有客户端非受控行为；受控调用方可以拒绝更新，原生过滤输入恢复业务值。排序和查询变化从第一页开始。Vue 支持 `stateChange` 与 `update:state`（v-model:state）；其它三端显式传 state/onStateChange，Svelte 不会先自行改变业务传入的 state。

`columnKeys` 按指定顺序显示已有列；不传时显示全部列。重复/未知 key 被去重/忽略，空数组允许只保留选择列。完整 columns 仍检查非空唯一 key；隐藏排序列不再显示旧排序，下一次状态通知清除无效 sort。它是显示/顺序控制，拖动与键盘操作仍使用同一顺序契约。

`mode="server"` 直接展示 data 当前页，禁止再次本地过滤、排序、切页；调用方收到新 state 后请求并返回该页和 `totalRows`。总数归一为非负整数，未传或非有限数回退到当前 data.length；应提供真实总数。每行必须具有非空稳定 rowKey（默认 id），不能用跨页不稳定的下标。server 选择跨页保留，不把当前页之外的 ID 当成已删除；业务应在明确删除时清理 selectedIds。client 延续原有删除清理。初次渲染/SSR 不触发请求或业务回调。

`loading` 设置 aria-busy 与状态说明，禁用过滤、排序、分页和选择；`error` 提供 alert，`onRetry` 提供真实重试按钮。Retry 激活后先把焦点放到稳定的表格滚动区域，避免按钮消失后丢失键盘位置。`labels.loading/retry` 可本地化。加载中保留或清空旧数据由调用方决定，组件不会自行发请求。

四端 DataTableAdvancedExample 使用同一模拟服务端，展示列显示/顺序、受控拒绝、跨页选择、异步加载、错误重试、旧请求取消与卸载清理；模拟服务仅用于示例。新增 Server/Loading Story，当前总数为 114 族、287 Story、155 个四端示例。验收见 [服务端表格 Linux 记录](audits/2026-10-03/data-table-advanced-linux/acceptance.json)。

## 冻结列

`pinnedColumns={{ start: ["name"], end: ["amount"] }}` 将可见列冻结到逻辑起始和结束边。方向继承原生 `dir`，RTL 下起始边位于右侧。起始冻结组之前的选择列自动一起冻结；只有结束冻结列时，选择列仍普通滚动。重复或未知 key 忽略，隐藏列不会被重新显示，两边指定同一 key 时 start 优先。

显示顺序为起始组、普通组、结束组，各组内部沿用 `columnKeys`（未提供时为 columns）的顺序。不会改写输入数组，不会生成复制表格或改变排序、选择、原生列标题与空结果语义。加载、错误和服务端模式沿用已有 API。

共享 Kit 行为在挂载后测量真实列宽；列显示/重排、文本和内容宽度变化及容器缩放后重新测量。冻结区使用现有背景、选中/悬停色和细边框；中间列的排序按钮得到焦点时，将其滚入冻结区之间。冻结表格的空结果提示按可视滚动区域居中，横向滚动后继续可见。SSR 只输出列语义，不读窗口或布局；卸载取消帧、断开观察器、移除事件并恢复接管属性。

窄屏至少给中间列保留一个选择单元格宽度的阅读空间（普通列更窄时采用该列宽度），且不小于普通列排序按钮的实际宽度。冻结组过宽时暂停吸附，保留可聚焦的原生横向滚动；可用空间恢复后自动吸附。它不是裁切长列或隐藏数据的替代方式。

四端 DataTableFrozenExample 展示两边冻结、追加/隐藏 Owner、重排列、RTL、横向滚动、选择/排序、空结果和隐藏重挂。独立 Frozen Story 与 Linux 基线见 [冻结列验收](audits/2026-10-04/data-table-frozen-linux/acceptance.json)。虚拟化见下文；仍未提供指针拖动列；不声称全部高级表格能力已交付。

## 单元格编辑与逻辑对齐

列的 `align="start" | "center" | "end"` 同时对齐表头、静态值、编辑入口和输入框，继承 RTL。数字编辑器保持数字与负号的 LTR 顺序，但按列的逻辑方向对齐；摘要文字使用原生双向隔离。数值列推荐 end；不根据第一行猜测数据类型。只读列和旧的列定义保持兼容。

`columns[].editor` 提供 `{type?: "text" | "number", validate?: (value, row) => string | undefined}`；只有同时传 `onCellCommit` 才渲染编辑按钮，rowKey 身份列始终只读。数字编辑拒绝空串、非有限数字，允许小数；其它业务限制由 validate 提供。编辑按钮名称在 labels.editCell 提示后包含当前可见值，支持语音按可见文字定位。可编辑空值使用 labels.emptyCell 名称，保存后的值始终来自 data，不偷偷改写源行。

`onCellCommit({rowId,columnKey,value,previousValue,row,signal})` 可同步或异步返回 void（接受）或错误文字（保留草稿），抛异常显示 labels.commitError，不暴露异常详情。row 是冻结的浅复制，value 为文字或数值。调用方负责保存和更新 data；返回 void 后若拒绝更新 data，组件恢复原值。组件不创建请求、缓存或业务字段。

按钮进入编辑并选中文字，编辑区域限制到滚动区可视宽度并保留焦点边缘留白；Enter 保存、Escape 取消，组合输入期间不拦截 Enter。Tab 沿原生控件移动，不自动提交，离开编辑区仍保留草稿。同步验证失败关联字段错误；异步保存互斥、禁用输入/保存，取消按钮继续可用。迟到完成与拒绝不改变后续草稿；若保存服务忽略 signal，取消仍立即结束组件等待，但调用方必须自行防止过期业务写入。

分页、排序、过滤后的视图变化，行数据变化、删除、列隐藏/重排、校验器替换、loading 和卸载会取消草稿。保存及取消恢复原入口，入口不在页面时回到稳定滚动区域；外部控件已经取得焦点时不抢回。SSR 不创建编辑器 DOM、不执行校验或保存；Vue 的 onCellCommit 是带返回值的函数 Prop，不是无返回的 emit 事件，其余端同名回调。Svelte 字段错误ID只在挂载后分配，初始SSR无活动草稿。

新增 labels.editCell(columnLabel,rowId)/save/cancel/saving/invalidNumber/commitError/emptyCell；可完整本地化可见操作、状态与字段名称。四端 DataTableEditExample 和 Editing Story 演示实际异步接受、拒绝、失败重试、取消、隐藏列、删除行、RTL 与重挂。后续选择/多行、批量编辑/撤销与虚拟化见下文。


### 选择与多行编辑

`columns[].editor.type` 增加 `select` 和 `textarea`。select 使用 `options: readonly {value:string,label:string,disabled?:boolean}[]`，显示 label，保存稳定字符串 value；重复 value 明确报错，无可用选项时只读。当前值未知或已禁用时仍显示旧值，进入编辑后必须选可用项才能保存；不会静默改为第一项。`labels.invalidOption` 支持本地化非法选项错误。选项、禁用状态或行数据变化中止草稿及待处理提交。

textarea 可设置原生 `rows`（默认3），Enter 换行，Ctrl/Command+Enter 保存；select 保留原生方向键和 Enter 行为，用保存按钮或 Ctrl/Command+Enter 提交。Escape 取消，组合输入时不拦截按键，Tab 只移动焦点。两者复用已有异步互斥、错误关联、外部焦点保护及卸载清理，SSR 不触发业务回调。DataTableComplexEditorsExample 与 ComplexEditors Story 提供真实多行及离散选项编辑；组件不内置业务富文本格式或远端选项服务。

## 批量编辑与撤销

提供 `onBatchCommit({ changes, signal, operation })` 启用选择区的批量面板。每个变更包含 `rowId`、`columnKey`、`value`、`previousValue` 和冻结的原始 `row`；`operation` 为 `apply`、`undo` 或 `redo`。回调一次接收完整、只包含实际变化的只读变更集；调用方负责事务提交并更新 `data`，返回错误文字或抛错会保留草稿。组件不会逐行调用 `onCellCommit`，也不会自动访问接口。

先勾选需要改变的字段，再输入统一的新值。选择、数值和多行字段复用单格的解析与校验，所有选中行通过校验后才调用一次回调。空字符串是文字字段的有效草稿，未勾选字段不修改。数值必须有限，选择必须是可用选项。Ctrl/Command+Enter 提交，Escape 或 Cancel 取消，包括已经开始的请求；取消不依赖服务是否及时响应 `signal`，迟到结果不会重开面板。

支持跨客户端分页选择；服务端模式只能编辑当前已加载且完整提供给 `data` 的选中行，选中缺失行时按钮不可用。行身份字段和隐藏列不参与编辑。选择集合、选中行、字段配置、校验器、提交回调或 loading 改变会取消过期事务；已接受且与变更集完全吻合的源数据更新允许正常完成。

挂载期间接受的批次可逐步撤销及重做；撤销仍通过同一个可取消回调，以逆向变更集提交。源数据需要完整吻合该批次接受后的行快照，否则禁用撤销，避免覆盖调用方后续修改。`value: undefined` 表示恢复原来不存在的键，调用方应删除该键。回调拒绝或取消撤销/重做时保留历史机会。`operation` 区分 `apply`、`undo`、`redo`；重做也检查完整行快照，源数据由调用方更新。新的批量提交清空重做分支；`historyLimit` 默认 50，归一到 1–1000，超过上限移除最旧历史，不跨刷新或卸载持久化。操作区支持 Ctrl/Cmd+Z 撤销、Ctrl/Cmd+Shift+Z 与 Ctrl+Y 重做；输入控件保留原生文字撤销行为。`labels` 支持批量动作、计数、字段开关、冲突和空变更说明的本地化。

## 可变行高虚拟化

`virtualization={{height:360,estimateSize:56,overscan:3,scrollToIndex:500}}` 只渲染当前页的可视行及上下缓冲，仍使用原生 table。`height` 是 px，估算高度在浏览器测量后修正；overscan 上限50。`scrollToIndex` 是当前页从0起的索引命令，修改该值时滚动；排序、筛选、换页重新回到开头。服务端模式不会替调用方获取全量数据。

行 id 必须稳定且唯一。活动焦点行离开窗口时额外保留一行，避免输入框、草稿和焦点丢失；失焦后释放。表头保持可见，冻结列沿用既有测量与过宽回退。窄屏在表内水平滚动，长值换行。aria-rowcount/aria-rowindex 保留数据行数和索引；SSR 仅输出估算窗口，不触发提交或滚动回调。

单元格编辑与批量编辑可同时声明；开始批量编辑会取消活动单元格草稿，批量操作结束前阻止新单元格编辑。四端 VirtualizationExample 同时演示千行表格及可变高度消息。

## 多列排序与列级筛选

`state.sorts: readonly DataSort[]` 按数组顺序定义优先级；未提供时兼容原有 `state.sort`，显式空数组清空排序。普通点击/Enter 循环升序、降序、无排序并替换其它排序；Shift 点击或 Shift+Enter 保留其它列并追加优先级。多列排序显示序号和方向，只有主排序表头使用 `aria-sort`，每列通过 `aria-description` 提供方向、优先级和操作提示。排序相同的行保留源顺序。不可排序及已删除列、重复排序键会被归一化。非受控状态清理被隐藏/移除的排序和筛选，重新显示列不会复活旧条件；受控状态由调用方维护，组件只归一化当前视图。

`columns[].filter` 启用列筛选控件，支持 `type: "text" | "number" | "select"`；select 的 `options` 使用唯一字符串 value、label 和可选 disabled。`state.filters: readonly DataFilter[]` 由 key、operator 和可选标量 value 组成，全部条件以 AND 组合，并与全表搜索共同生效。文本支持 contains/equals/startsWith，数值支持 equals/gt/gte/lt/lte，选项支持 equals；三类均支持 empty/not-empty。empty 包含 null、缺失值和空字符串，数字零及 false 不是空。选项的空字符串可以作为独立有效选项，不与“All options”混淆。

数值控件保留原始字符串草稿，例如负号；非法或无限数值不参与筛选，字段通过 `aria-invalid`、关联错误文字及 alert 反馈，修正后错误解除。虚拟窗口只在有效查询改变时回到开头，非法数值草稿不会打断阅读位置。未知或已禁用的选项、与列类型不兼容的操作符报告对应错误。有效筛选变化回到第一页；受控调用方拒绝更新时控件恢复到接受的状态。内置面板每列编辑一个条件，模型允许调用方提供同列多个条件，例如数值上下界。

服务端模式保留 `sorts/filters` 查询契约并通过 `onStateChange` 通知，组件不重新排序或筛选当前返回页。加载时查询控件禁用，SSR 不触发状态回调。标签由 `filterColumn`、`filterOperator`、`filterOperators`、`allOptions`、`invalidFilter` 与既有错误标签本地化；操作符标签可逐项覆盖，undefined 回退到默认值；`sortDescription` 定义排序说明。四端 DataTableQueryExample 与 ColumnQueries Story 覆盖优先级、组合筛选、受控拒绝、草稿错误、分页及重挂。


## 列拖动与交互式列宽

`columnReorderable` 启用独立 Lucide 拖动手柄；`columnResizable` 启用列边缘的可聚焦纵向 separator。两者默认关闭，原有自动表格布局保留。鼠标/触摸 Pointer Events 共用 Kit 挂载行为，拖动过程中仅预览，靠近滚动区域边缘时自动横向滚动，释放时通知一次；Escape、取消、卸载、加载中或外部列配置变化终止当前手势。

顺序复用 `columnKeys/onColumnKeysChange(keys)`；不传 `columnKeys` 时内部管理顺序，删除列清理旧 key，新列加入末尾。传入时由调用方决定是否接受更新，拒绝时不保留预览。Vue 同时提供 `columnKeysChange` 与 `update:columnKeys`。冻结列仅在同一 start/body/end 区域内重排，不隐式改变 `pinnedColumns`；隐藏列仍由调用方控制。

`columnWidths/onColumnWidthsChange(widths)` 控制像素列宽；`defaultColumnWidths` 的副本只初始化非受控宽度，不与调用方的默认对象共享可变状态。Vue 提供 `columnWidthsChange` 与 `update:columnWidths`。`DataColumn.minWidth/maxWidth` 默认为80/1200，未配置宽度默认为160并限制到该列边界；非有限宽度回退，最大数据几何限制为100000。未知宽度 key 不参与计算，非受控列删除后清理宽度，重新加入使用默认值。列宽属于数据几何，不新增主题尺寸 Token。

拖动手柄使用 ArrowLeft/ArrowRight 移动，Home/End 到当前冻结区域边界；方向继承原生 `dir`。Enter/Space 开始或结束键盘移动，`aria-pressed` 表示状态，Escape 请求恢复起始顺序；受控调用方仍可拒绝恢复。separator 使用方向键调整10像素、Shift调整50像素、Home/End达到最小/最大值，双击恢复160像素（仍限制边界）。原生 `aria-valuemin/max/now`、加载禁用和局部直播状态同步；重排后的焦点只恢复同一手柄并滚动表格区域，避免重排保持旧 DOM 焦点却把手柄移出窄屏。

手动列宽使用原生 `colgroup` 和固定布局，长正文换行，窄屏局部横向滚动。四端 DataTableColumnsExample 及 ColumnLayout Story 展示真实拖动、键盘、RTL、冻结、受控拒绝、动态列和卸载。SSR 输出列宽与控件语义，不调用更新回调、不读取浏览器 DOM。原生 Safari runner 已增加 W3C 指针调整与键盘排序；远端实际结果取得并审阅后再计入平台验收。
