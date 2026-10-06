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


## DateInput 原生完整粘贴（2026-10-05）

- 核验已有 ISO 粘贴、非法值保留、分段边界、活动范围端点、焦点及真实表单；不添加重复解析 API。
- 新增四端、两主题、两视口16项回归；本地化自由文本、日期时间、复杂表格编辑及虚拟化仍待处理。


## 剩余高级能力实现与验收（2026-10-05）

1. 表格复杂编辑器：选择、多行输入、合法选项、快捷键及错误/取消语义。
2. 批量编辑：跨行原子草稿、校验、提交拒绝/取消及撤销。
3. 虚拟化：表格与消息、测量/滚动、焦点、行数与生命周期。
4. 图表高级交互：缩放、刷选、交互提示、增量数据与可访问替代。
5. 复杂问卷题型：通用数字、日期、多行和多选输入，条件及真实表单。
6. 异步Collection：分页、取消、竞争、错误重试、去重与卸载。

所有项持续按四端实现、示例、Story、模型/浏览器回归和明暗窄屏截图验收；不以内置业务服务替代通用交互契约。

批量编辑已实现四端入口、共享解析与原子变更集、失败/取消保留、单级冲突安全撤销；只在专项验收通过后关闭本项。

虚拟化已接入共享可变高度模型和四端 DataTable/MessageScroller：有界渲染、焦点行保留、阅读锚点、受控定位与有界 SSR。进入浏览器、视觉和生命周期专项验收；图表、复杂问卷与异步 Collection 接续实施。

虚拟化验收：四端72项、受影响16项、Linux视觉106项通过；范围、短暂失败与平台限制见 [验收摘要](audits/2026-10-05/virtualization-linux/acceptance.json)。

图表分类缩放/原生范围刷选、多序列指针提示/键盘检查与增量数据已同步四端和 ChartInteractionExample/ZoomAndBrush Story，进入专项验收。当前115族、303 Story、四端各790公开 LoongArk 值入口、199示例；API 见 [图表说明](chart.md#分类缩放刷选与交互提示)。

图表缩放、刷选、交互提示和增量数据更新已完成四端专项验收，见 [图表窗口验收](audits/2026-10-05/chart-window-linux/acceptance.json)。覆盖为 115 个组件族、303 个 Story、四端各 790 个公开 LoongArk 值入口、199 个示例。复杂问卷和异步 Collection 契约继续实现。

复杂问卷新增数值、日期、下拉选择、矩阵和排序题型，四端共享校验、表单和焦点行为；见 [问卷说明](questionnaire.md) 与 [验收](audits/2026-10-05/questionnaire-types-linux/acceptance.json)。覆盖为 115 个组件族、304 个 Story、四端各 790 个公开 LoongArk 值入口、203 个示例。异步 Collection 契约继续实现。

异步 Collection 复用原生 useAsyncList，新增共享加载/接收确认契约、稳定键去重、游标循环、重试与取消；见 [异步 Collection](async-collection.md)。四端专项验收通过；见 [Linux 验收](audits/2026-10-05/async-collection-linux/acceptance.json)。


本轮指定的六项高级能力已逐项实现并验收：复杂编辑器、原子批量编辑与撤销、可变高度虚拟化、图表缩放/刷选/提示与增量更新、复杂问卷、异步 Collection。当前 **115 个组件族、305 个 Story、四端各 790 个公开 LoongArk 值入口、207 个框架示例**。具体 API、平台限制和每批验收保留在上述链接；业务服务仍由调用方提供。过程截图和日志只存忽略目录，仓库仅保留简短摘要及实际回归使用的基线。

最终异步 Collection 批次：四端回归 121 项、完整 Story 浏览器回归 95 项、视觉比较 126 项、Pages 子路径检查通过；207 个框架示例运行。121 个消费专用用例在 Story 服务中跳过，已由四端套件独立覆盖。详见 [最终验收](audits/2026-10-05/async-collection-linux/acceptance.json)。


## 全部高级缺口持续补齐（2026-10-05）

本轮范围：高级表格、独立编辑器、图表类型/坐标轴、问卷扩展、二维虚拟化、日期国际化及 Drawer/多浏览器验收。第一批补表格有界多级撤销/重做：共享历史与异步重放、并发快照保护、新提交清空重做分支，四端复用现有适配。真实 Safari 与手机仅在取得对应环境并实际运行后计入验收。


浏览器验收基础设施：新增 Chromium/Firefox/WebKit 独立CI与 macOS原生Safari/W3C runner；本地配置、浏览器身份与4个Story历史专项通过。远端结果及截图未取得前，平台清单保持待验收，不把WebKit或模拟手机替代Safari/真机。

## 2026-10-05 — 多列排序与列筛选

四端增加稳定多列排序、可见优先级和组合列筛选，保留数值草稿、错误关联及受控拒绝；服务端只上报状态。修复隐藏列后旧排序复活，并补有效查询/虚拟窗口协调、Svelte稳定SSR多实例ID和原生选项SSR选择。覆盖为115族、306 Story、四端各790值入口和211示例；40项四端回归、104项Story全量、最终20项受影响复验及130项视觉比较通过。只新增8张Linux基线；[验收](audits/2026-10-05/data-table-query-linux/acceptance.json)记录失败修正、范围与平台限制。下一批先处理真实浏览器CI暴露的焦点和窄屏问题，再推进其余高级表格能力。


## 2026-10-05 — 跨浏览器问题整改

依据实际 Linux Chromium/Firefox/WebKit CI 失败截图和日志，修复 Chart 尺寸观察更新循环与原生选项盒模型、批量编辑 DOM 提交后的焦点意图、虚拟行移动焦点、Dialog 退场可见性及四端问卷完成态长文本。测试改为容器相对锚定、跨引擎原生剪贴板写入和有效 SVG 加载；合成日期粘贴不计作系统粘贴。四端与 Story 证据分阶段上传，保留14天。

本地 Chromium 完整四端138项、问卷完成态16项、Story104项通过；最终批量编辑修正后新构建、16项四端和4项Story复验、130项全量视觉比较通过，基线未变。实际截图已复核；新一轮真实浏览器CI与手机验收仍待实际结果，见[整改验收](audits/2026-10-05/browser-runtime-linux/acceptance.json)。列顺序与宽度交互继续实现。


列拖动排序、交互式列宽、键盘替代和RTL已同步四端；包含冻结区域约束、受控拒绝、动态列、边缘自动滚动及重排焦点可见性。当前115族、307 Story、四端各790值入口、215示例。完整四端154项及215示例通过；最终调整后新构建与受影响20项通过，134项视觉比较通过。新增8张已审阅Linux基线，既有136张含Windows基线哈希不变。详见[列交互验收](audits/2026-10-05/data-table-columns-linux/acceptance.json)。其余高级能力与实际跨浏览器失败继续处理，平台清单不关闭。


分组聚合与树形行已完成四端实现和Linux专项验收：完整四端170项及219示例、Story116项通过；最终布局修正后新构建、32项四端与4项Story复验、138项全量视觉比较通过。新增8张已审阅Linux基线，既有144张含2张Windows基线哈希不变。当前115族、308Story、四端各790值入口、219示例。详见[结构行验收](audits/2026-10-05/data-table-structure-linux/acceptance.json)。其余高级缺口和实际平台失败继续处理。


单元格范围选择、原生TSV复制/粘贴和原子校验已同步四端，粘贴整批参与多级Undo/Redo；覆盖RTL、受控拒绝、纵向虚拟定位、取消与焦点。最终完整四端186项、223示例、Story120项及视觉142项通过；8张新增Linux基线已实际查看，既有152张含Windows基线哈希不变。当前115族、309Story、四端各790值入口、223示例。详见[范围与粘贴验收](audits/2026-10-05/data-table-range-linux/acceptance.json)。独立编辑器及其余高级缺口继续补齐，平台清单不关闭。


## 独立编辑器（2026-10-06）

四端新增独立CodeEditor与RichTextEditor，采用MIT的CodeMirror/ProseMirror。支持真实搜索替换、按需语法、富文本格式/列表/安全链接、表格操作/列宽、输入规则与原生扩展生命周期；统一受控接受/拒绝、历史、只读、禁用、表单与SSR。API见[编辑器说明](editors.md)。

当前117族、313Story、四端各792公开值入口、231示例。完整四端218项、Story134项、视觉150项通过；最终受控恢复专项32项通过。64张四端和16张Story候选图已实际查看，新增16张Linux回归基线，既有160张含Windows基线哈希不变。实际范围及Firefox启动限制见[验收](audits/2026-10-06/editors-linux/acceptance.json)。图表类型与轴继续补齐，平台清单保持开放。

## 图表类型与连续坐标轴（2026-10-06）

四端Chart新增面积与正负堆叠、饼图/环形图、散点，以及连续数值、时间和对数轴；保持稳定切片身份、受控接受/拒绝、键盘读取、原始数据表及SSR。共享模型处理无效数据、正负分离、域裁剪与有限极值，继续使用已有Token与VI颜色。API见[图表说明](chart.md)。

当前117族、319Story、四端各792公开值入口、235框架示例。新构建、契约、发布/SSR及Svelte检查通过；完整四端234项通过后，最终边缘点和手机日期修正由16项定向回归及170项完整视觉比较覆盖。新增Story地标问题已修正，4项交互与8批全量明暗质量扫描通过；Firefox与WebKit最终图表各16项通过，实际截图已审阅。20张新增Linux基线已实际审阅，既有176张含Windows基线哈希不变；过程图和日志不入Git。精确范围、初次失败及平台限制见[验收记录](audits/2026-10-06/chart-types-linux/acceptance.json)。问卷、二维虚拟化、日期/Drawer及其余平台失败继续实施。

## 编辑器输入与剪贴板平台修复（2026-10-06）

共享编辑器合并框架配置更新，修复Firefox原生替换输入丢失和React富文本误判受控拒绝；外部清空后恢复引擎选择，避免多余空段落。剪贴板测试读写实际ClipboardEvent的数据对象，保留原子粘贴与历史断言。新构建、契约、公开类型/SSR与Svelte检查通过；Chromium、Firefox和WebKit四端定向各48项，Story12项及整库Linux视觉170项通过。三引擎240张四端默认/交互截图已实际查看，196张既有回归基线含Windows未修改，过程文件不入Git。真实系统剪贴板、手机/IME及整库Safari限制详见[验收记录](audits/2026-10-06/editor-input-platforms/acceptance.json)；其余高级缺口继续实施，平台清单保持开放。

## 矩阵多选（2026-10-06）

四端Questionnaire复用matrix题型补上逐行多选、数量边界、原生重复字段和首个无效行焦点；保留单选兼容、受控拒绝与嵌套异步快照隔离。当前117族、320Story、四端各792公开值入口、239框架示例。新构建、契约、发布类型/SSR与Svelte检查通过；完整Chromium四端250项、Firefox与WebKit定向各32项、Story27项及Linux视觉174项通过。三引擎96张四端截图和4张新增Linux基线已实际审阅；196张既有基线含Windows哈希未变。过程文件不入Git，准确范围与限制见[验收记录](audits/2026-10-06/questionnaire-matrix-linux/acceptance.json)。排序拖动、重复题组与自定义渲染继续实施，整库平台与真机清单保持开放。

## 排序题拖动与键盘操作（2026-10-06）

四端Questionnaire排序题增加Lucide手柄、鼠标/触摸预览、边缘滚动和键盘拾起/移动/放下/取消；只在放下时提交一次，并覆盖受控拒绝、动态选项、外部答案和卸载。当前117族、321Story、四端各792公开值入口、243框架示例。新构建与契约/发布类型/SSR/Svelte检查通过；间距修正前完整Chromium270项通过，修正后问卷定向Chromium52项、Firefox/WebKit各48项、Story31项和全量Linux视觉178项通过。三引擎及触摸模拟100张截图、8张视觉候选已实际审阅；仅4张旧Linux排序基线改变，196张无关旧基线含Windows保持不变。范围与限制见[验收记录](audits/2026-10-06/questionnaire-ranking-linux/acceptance.json)。重复题组、自定义渲染、虚拟化、日期、Drawer和整库平台/真机验收继续实施。


## 裁剪布局与稳定导出（2026-10-06）

修复ImageCropper根区域占位与窄屏图片约束，四端新增共享`exportImageCropper`，以源图尺寸捕获旋转/翻转/缩放并导出PNG/JPEG，支持像素上限、取消、独立根及SSR。四端示例和既有Story同步使用该能力，原生Ark API保持兼容。目录仍为117族、321Story、四端各792个LoongArk前缀公开值、243示例。

新构建、契约、公开类型/SSR和Svelte检查通过；三引擎裁剪各17项通过，最后像素上限修正后新构建的公共契约另各1项通过；Story10项含321Story明暗质量扫描及全量Linux视觉178项通过。144张四端默认/变换导出/重置截图已实际查看，204张既有基线含Windows哈希未变。全页截图临时布局的隔离诊断、实际范围与限制见[验收](audits/2026-10-06/image-cropper-platforms/acceptance.json)。其余平台失败、重复题组、自定义问卷渲染、虚拟化、日期和Drawer继续实施。
