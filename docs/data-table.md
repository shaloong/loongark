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

现支持客户端与服务端标量数据、列显示及顺序控制。已提供逻辑冻结列；未提供虚拟化、指针列拖动或编辑单元格；数据请求、取消与竞争处理由调用方负责，不假定业务接口协议。它是已有能力的完善，不声称兼容 MUI Data Grid、Ant Design Table 或第三方表格引擎的全部 API。

## 高级状态与服务端模式

`state/defaultState/onStateChange` 统一控制 `{query, sort?, page}`，page 从 1 开始；`pageSize` 继续独立设置。未传 state 保持现有客户端非受控行为；受控调用方可以拒绝更新，原生过滤输入恢复业务值。排序和查询变化从第一页开始。Vue 支持 `stateChange` 与 `update:state`（v-model:state）；其它三端显式传 state/onStateChange，Svelte 不会先自行改变业务传入的 state。

`columnKeys` 按指定顺序显示已有列；不传时显示全部列。重复/未知 key 被去重/忽略，空数组允许只保留选择列。完整 columns 仍检查非空唯一 key；隐藏排序列不再显示旧排序，下一次状态通知清除无效 sort。它是显示/顺序控制，不新增重复的列类型或虚假的拖动 API。

`mode="server"` 直接展示 data 当前页，禁止再次本地过滤、排序、切页；调用方收到新 state 后请求并返回该页和 `totalRows`。总数归一为非负整数，未传或非有限数回退到当前 data.length；应提供真实总数。每行必须具有非空稳定 rowKey（默认 id），不能用跨页不稳定的下标。server 选择跨页保留，不把当前页之外的 ID 当成已删除；业务应在明确删除时清理 selectedIds。client 延续原有删除清理。初次渲染/SSR 不触发请求或业务回调。

`loading` 设置 aria-busy 与状态说明，禁用过滤、排序、分页和选择；`error` 提供 alert，`onRetry` 提供真实重试按钮。Retry 激活后先把焦点放到稳定的表格滚动区域，避免按钮消失后丢失键盘位置。`labels.loading/retry` 可本地化。加载中保留或清空旧数据由调用方决定，组件不会自行发请求。

四端 DataTableAdvancedExample 使用同一模拟服务端，展示列显示/顺序、受控拒绝、跨页选择、异步加载、错误重试、旧请求取消与卸载清理；模拟服务仅用于示例。新增 Server/Loading Story，当前总数为 114 族、287 Story、155 个四端示例。验收见 [服务端表格 Linux 记录](audits/2026-10-03/data-table-advanced-linux/acceptance.json)。

## 冻结列

`pinnedColumns={{ start: ["name"], end: ["amount"] }}` 将可见列冻结到逻辑起始和结束边。方向继承原生 `dir`，RTL 下起始边位于右侧。起始冻结组之前的选择列自动一起冻结；只有结束冻结列时，选择列仍普通滚动。重复或未知 key 忽略，隐藏列不会被重新显示，两边指定同一 key 时 start 优先。

显示顺序为起始组、普通组、结束组，各组内部沿用 `columnKeys`（未提供时为 columns）的顺序。不会改写输入数组，不会生成复制表格或改变排序、选择、原生列标题与空结果语义。加载、错误和服务端模式沿用已有 API。

共享 Kit 行为在挂载后测量真实列宽；列显示/重排、文本和内容宽度变化及容器缩放后重新测量。冻结区使用现有背景、选中/悬停色和细边框；中间列的排序按钮得到焦点时，将其滚入冻结区之间。冻结表格的空结果提示按可视滚动区域居中，横向滚动后继续可见。SSR 只输出列语义，不读窗口或布局；卸载取消帧、断开观察器、移除事件并恢复接管属性。

窄屏至少给中间列保留一个选择单元格宽度的阅读空间（普通列更窄时采用该列宽度），且不小于普通列排序按钮的实际宽度。冻结组过宽时暂停吸附，保留可聚焦的原生横向滚动；可用空间恢复后自动吸附。它不是裁切长列或隐藏数据的替代方式。

四端 DataTableFrozenExample 展示两边冻结、追加/隐藏 Owner、重排列、RTL、横向滚动、选择/排序、空结果和隐藏重挂。独立 Frozen Story 与 Linux 基线见 [冻结列验收](audits/2026-10-04/data-table-frozen-linux/acceptance.json)。仍未提供虚拟化、单元格编辑和指针拖动列；不声称全部高级表格能力已交付。
