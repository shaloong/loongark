# LoongArk 技术架构

LoongArk 以 Ark UI 提供行为与无障碍基础，以共享 CSS 和 Token 提供四端一致的中性视觉。参考 shadcn 默认界面的布局与控件密度；颜色采用 Shaloong VI 中性色及其派生值。具体规则与全量检查见 [设计质量整改](design-quality.md)。

开发与发布分支约定见 [CONTRIBUTING.md](../CONTRIBUTING.md)：日常和云端开发进入 develop，稳定版本按发布节点合入 main。

## 分层与职责

| 层                 | 目录                            | 职责                                                                 |
| ------------------ | ------------------------------- | -------------------------------------------------------------------- |
| Tokens             | packages/tokens                 | 固定 VI、语义颜色、排版、尺寸、间距、圆角、动效、层级，输出 CSS/JSON |
| Theme              | packages/theme                  | 实例作用域、CSS 变量、Portal 容器、样式共享与释放、SSR 样式收集      |
| Primitives         | packages/primitives             | Ark 部件契约、统一组件样式、注册表                                   |
| Kit                | packages/kit                    | 布局部件元数据、表格/图表/选择/时间模型、输入测量与组合行为          |
| Adapters           | packages/react/vue/solid/svelte | 框架渲染、上下文、原生事件与绑定，不复制主题或数据逻辑               |
| CLI                | packages/cli                    | Token 提取与产物校验                                                 |
| Examples / Stories | examples / stories              | 四端调用示例、React Storybook 场景                                   |
| Tests              | tests                           | 真实 dist 消费、交互、无障碍、视觉与窄屏回归                         |

所有框架使用真实依赖类型。旧 types 类型桩已退出检查链路，历史内容保留在整改审查归档中。发布产物由构建生成；不在 src 保留生成的 JS。

## 构建与验证

- pnpm run verify：结构校验、项目引用类型检查、九个包构建。
- pnpm run check:contracts：模式/VI/Token 契约、CSS 变量、公开导出一致性、表格、图表、双栏选择、时间校验与行数边界。
- pnpm run check:coverage：核对持续覆盖清单、全部 Story 与四端公开入口。
- pnpm run check:publication：发布入口、公开声明、四端 SSR。
- pnpm run check:svelte：Svelte 源组件与现有示例。
- pnpm run test:frameworks：从真实 dist 构建四端消费项目并执行同一交互情景。
- pnpm run test:e2e：构建 Storybook，执行浏览器测试。
- pnpm run visual:test：视觉基线与 Axe。

Solid 包将 JSX 编译为 DOM 版本，并把 Ark JSX 编译进独立 SSR 入口。Svelte 包发布 .svelte 源码及声明，交由消费应用的 Svelte 编译器处理。共享包采用 TypeScript 编译并补全 ESM 相对路径扩展名。

消费应用应安装一个对应框架运行时；SSR 构建应对 Svelte 组件进行编译，并让应用与组件共用同一 Svelte 服务端运行时。peer 声明的最低要求为 Vue 3.5、Solid 1.9.10、Svelte 5.20；本次实际回归版本见验收报告，未逐个测试范围内的所有版本。

相关文档：[图表标签与数据](chart.md)、[表格选择与更新](data-table.md)、[附件、消息与问卷](conversation.md)、[浮动动作与媒体布局](action-media.md)、[选择与输入组件](selection-inputs.md)、[常用组件缺口与本批补齐](component-gaps.md)、[主题系统](theme-system.md)、[组件覆盖](component-coverage.md)、[整改与验收](remediation.md)、[迭代记录](sprint-plan.md)。

## Ark UI 高级能力复核（2026-10-03）

新增 ImageCropper、JsonTreeView 与独立辅助组件，开放既有组件的 Provider/Context 与高级部件。SegmentGroup 统一为 Ark 原生单选语义，Vue 多选表单值同步修正。新增四端裁剪、JSON、辅助组件与高级选择示例。后续批次已实现新版 DateInput、Swap、TOC 与原生手势 Drawer；常用 Context/Collection Hook 同步开放。组件目录覆盖不等同于所有高级场景均已验收。详细对照、API 与迁移见 [Ark UI 核对](ark-ui-coverage.md)。

本批 Ark UI 扩展的完整 Linux 验收：四端消费/示例 8 项、专项行为 9 项、全量浏览器 82 项、视觉 30 项通过；浅深色各 279 Story 的默认无障碍违规、页面溢出和有效 transition: all 为 0。64 张四端与 16 张 Story 截图已人工复核，新增 16 张独立 Linux 基线；既有 Windows/Linux 基线未改。能力差异、SegmentGroup 迁移及浏览器限制见 [Ark UI 核对](ark-ui-coverage.md) 和 [验收记录](audits/2026-10-03/ark-ui-linux/acceptance.json)。

## 新版 Ark 组件与控制（2026-10-03）

DateInput 提供分段日期、范围、键盘编辑与真实表单；Swap 提供受控指示内容切换；Toc 提供目录缩进、滚动容器、活动状态和卸载重建；Drawer 迁移为原生拖拽、吸附点和嵌套模态，Sheet 继续使用 Dialog。四端各有四个真实示例。高级组合组件缺口及原生 API 限制见 [Ark UI 核对](ark-ui-coverage.md)。

本批 Linux 验收：114 族、283 Story、四端各 789 个公开值入口；147 个四端示例运行通过，专项行为 8 项、全量浏览器 106 项、视觉 46 项通过。明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；64 张四端和 16 张 Story 截图已目视核验。新增 16 张 Linux 基线，原有 30 张 Linux 与 2 张 Windows 基线不变。详细范围与限制见 [验收记录](audits/2026-10-03/ark-next-linux/acceptance.json)。

## Toc 受控更新（2026-10-03）

四端 Toc 的 Root 与 useToc 共享新值回调修正；示例直接控制 activeIds，支持暂停/恢复业务更新，并展示观察回调数据。回归检查 activeItems、业务拒绝更新、恢复后的新回调、真实滚动与卸载重建。详见 [Toc 验收](audits/2026-10-03/toc-control-linux/acceptance.json)。高级组合能力继续按场景补齐，完整组件目录不代表全部高级业务能力已验收。

## 问卷高级能力（2026-10-03）

四端 Questionnaire 新增条件可见性、同步跨题校验与受控拒绝恢复；隐藏答案保留在编辑状态，但不参与表单和最终提交。新增四端高级示例与两个 Story，覆盖清单仍为 114 族，累计 285 Story 和 151 个示例。API 与 Svelte 回调绑定说明见 [问卷说明](conversation.md)，验证范围见 [验收记录](audits/2026-10-03/questionnaire-advanced-linux/acceptance.json)。

本批验收：四端消费与示例 8 项通过，151 个示例实际运行；全量浏览器 63 项、视觉 50 项通过。285 Story 的明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0。40 张截图已目视复核，新增 4 张 Linux 基线，已有 46 张 Linux 与 2 张 Windows 基线不变。24 次四端场景对比为 0 像素差异；复杂题型与异步逐题校验仍未交付。

## 表格高级能力（2026-10-03）

新增 DataTableAdvancedExample 与 Server/Loading Story，114 族、287 Story、四端各 789 个公开值入口和 155 个示例。查询/排序/分页由统一 state 控制；columnKeys 控制显示与顺序；服务端数据不再本地处理，选择跨页保留，并补加载、失败和重试焦点。API 见 [表格说明](data-table.md)。

表格批次验收：四端消费/示例 8 项、155 个示例运行、全量浏览器 65 项、视觉 54 项通过。287 Story 的明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；60 张截图已目视核验，36 次四端场景对比为 0 像素差异。新增 4 张 Linux 基线，原有 50 张 Linux 与 2 张 Windows 基线不变。真实后端、虚拟化、冻结列和编辑未验收；详见 [独立验收记录](audits/2026-10-03/data-table-advanced-linux/acceptance.json)。

## Chart 交互与可访问数据批次（2026-10-03）

新增 ChartAdvancedExample 与 Interactive/DisabledControls Story，114 族、289 Story、四端各 789 个公开值入口和 159 个示例。图例支持受控选择/拒绝、禁用及全部隐藏后恢复；序列颜色/虚线身份保持；domain 固定数值轴并保留原始数据说明；showDataTable 提供原生可展开数据表。重绘保留展开和焦点，外部控件焦点不被抢回，卸载释放监听与观察器。API 见 [图表说明](chart.md)。

图表批次验收：四端消费/示例 8 项、159 个示例运行、全量浏览器 67 项、视觉 58 项通过。289 Story 的明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；60 张场景图已通过联系表复核，36 次四端对比为 0 像素差异。目视发现手机展开表格撑开页面，修复 max-width 并补局部键盘滚动回归后重验。新增 4 张 Linux 基线，原有 54 张 Linux 与 2 张 Windows 基线不变；缩放、刷选及实时流未提供。详见 [独立验收记录](audits/2026-10-03/chart-advanced-linux/acceptance.json)。

## Message / Attachment 操作批次（2026-10-03）

四端新增异步互斥、失败/成功反馈、actionKey 替换中止、卸载清理、附件预览和上传取消。ConversationActionsExample 实际复制、保存、下载、预览和取消模拟上传；删除后的业务焦点与组件内焦点恢复均有回归。修复 data URL 建议文件名，并统一 Dialog 默认关闭图标；不增加组件别名或依赖。API 和标签迁移见 [会话说明](conversation.md)。

该批完成时为 114 族、290 Story、四端各 789 个公开值入口、163 个示例。本批四端消费/示例 8 项、浏览器 69 项、视觉 62 项通过；290 Story 明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0。100 张场景图经24张联系表及重点原图复核，60次四端对照均为0像素差异；新增4张Linux基线，已有58张Linux及2张Windows基线文件不变。下载和图标问题的修正前证据保留，详见 [验收记录](audits/2026-10-03/conversation-actions-linux/acceptance.json)。真实服务上传、复杂题型与虚拟化等仍有明确边界，见 [高级能力缺口](ark-ui-coverage.md#下一批高级能力的边界)。


## MessageScroller 阅读位置与 Button 忙碌语义

共享滚动行为按可见消息和文字测量恢复阅读位置，支持延迟媒体、同条消息内容增高、总高度不变的重排和历史/新回复同时插入。卸载取消帧、释放观察器并恢复被接管的样式；四端高级示例展示媒体取消、重置和隐藏重挂。实际复现的160px漂移已修正为0px。

本批回归发现 React Button 覆盖调用方 aria-busy；四端统一保留显式忙碌语义，loading 优先并禁用交互，加载中的取消按钮保持可操作。没有新增依赖、独立配色或组件别名。API 与锚点身份边界见 [会话说明](conversation.md)，剩余高级组合能力继续列在 [范围表](ark-ui-coverage.md#下一批高级能力的边界)。


本批验收为114族、291 Story、四端各789个公开值入口、167个示例。四端消费/示例8项、最终影响行为4项和视觉66项通过；首轮全量72项通过、1项卸载测试边界修正后复验，最终覆盖73个独立浏览器用例，具体分批范围保留在验收记录中。291 Story明暗默认WCAG、窄屏页面溢出和有效transition: all均为0。

80张场景图经20种联系表及重点原图复核；隐藏说明修正后复核8张涉及空态的联系表，其余60张已审阅原图未变。48次四端对照中44次完全一致，4次手机阅读状态仅10–12个边缘像素且RGB通道差最大1；保留差异记录。20次阅读位移最大0.421875px，原始夹具160px漂移修正为0px。新增4张独立Linux基线，与已审阅默认原图0差异，原有62张Linux及2张Windows文件哈希不变。详见 [媒体锚点验收](audits/2026-10-03/message-anchor-linux/acceptance.json)。

## DataTable 逻辑冻结列（2026-10-04）

四端新增 `pinnedColumns.start/end`，按逻辑方向冻结已有列，复用 `columnKeys` 显示和顺序。起始冻结区包含选择列；隐藏、未知和重复键统一规范化。共享行为挂载后测量真实尺寸，响应排序、列内容和容器变化，恢复中间控件的可见焦点，卸载释放观察器与帧；SSR 不读布局。窄屏空间不足时恢复原生横向滚动。目视修正了空结果的可视区域居中和额外冻结列挤压排序按钮的问题。API 与边界见 [表格说明](data-table.md)。

本批为 114 族、292 Story、四端各 789 个公开值入口和 171 个示例。全量浏览器首轮 77 项通过；上述修正后重新完成构建、契约、发布/SSR、四端消费 8 项及受影响表格 9 项，最终视觉比较 70 项通过。292 Story 明暗默认 WCAG、页面溢出和有效 `transition: all` 均为 0；14 个表格默认明暗状态重新检查，截图与首轮逐像素一致。

100 张场景图经联系表与重点原图实际复核，60 次四端对照中 52 次完全一致，其余 8 次仅 2–3 个边缘像素、通道差最大 1。新增 4 张独立 Linux 基线，原有 66 张 Linux 和 2 张 Windows 基线哈希不变。系统 Chromium 151 与固定浏览器版本不同；首次程序聚焦的短暂描边差异仍保留为限制。详细验证分批范围、原图和限制见 [验收记录](audits/2026-10-04/data-table-frozen-linux/acceptance.json)。虚拟化、单元格编辑、指针列拖动以及图表缩放等高级能力继续列在 [范围表](ark-ui-coverage.md#下一批高级能力的边界)。

## 过程证据与展示发布（2026-10-04）

临时截图、日志与测量已从当前分支移出；验收摘要和必要的视觉回归基线保留。默认输出改为忽略目录，lint 防止过程文件再次进入 Git，历史记录来源见 [保存约定](audits/README.md)。组件高级能力继续按通用状态、交互、性能与语义补齐，业务接口与规则由调用方实现。Storybook 的 Pages/Vercel 选择及开源前置事项见 [展示与公开范围](storybook-hosting.md)。

## 统一图标（2026-10-05）

四端 LoongArkIcon 接受 Lucide 按需节点，提供原生 SVG、可访问名称、动态尺寸/描边、固定描边与 RTL 镜像。共享模型与基础样式集中实现，默认控件及示例中的文字图标同步替换；SpeedDial.icon 支持节点并保留字符串兼容。API、选择理由与许可见 [图标说明](icons.md)。

本批四端消费与175个示例运行、79个独立浏览器用例及74项视觉比较通过；294个Story明暗默认WCAG、窄屏溢出和有效transition: all均为0。64张场景图经12张联系表与重点原图目视复核；Solid示例对齐修正后24次四端对照均为0像素差异。新增4张Linux基线，原有72张Linux/Windows文件哈希不变；范围与真实首轮失败见 [图标验收](audits/2026-10-05/icons-linux/acceptance.json)。

## Questionnaire 异步校验与默认对齐（2026-10-05）

四端新增可取消异步校验、错误重试、过期结果隔离和卸载清理；编辑、返回及题目替换中止等待，提交重验全部可见题目，SSR 不执行回调。异步完成采用最新完成回调，恢复错误字段焦点且保留外部控件焦点。长选项的原生控件对齐文字首行，窄屏换行后的提交按钮保持逻辑末端，LTR/RTL 均有回归。业务服务仍由调用方提供，API 见 [会话说明](conversation.md)。

本批为115族、297 Story、四端各790个公开值入口、179个示例。四端消费/示例8项、首轮全量浏览器83项和最终受影响20项通过，分批累计覆盖91个独立浏览器用例。100张场景图经28张联系表及重点原图目视复核；48次四端对照中35次完全一致，其余仅边缘1通道差异，最大28像素。只更新8张已审阅受影响Linux基线并新增8张，原有其余68张及其中2张Windows基线不变。最终82项视觉比较通过；验证阶段与限制见 [验收记录](audits/2026-10-05/questionnaire-async-linux/acceptance.json)。


## DataTable 单元格编辑与对齐

四端新增文字/数值草稿、同步校验、可取消异步提交、失败重试、键盘操作和焦点恢复。列通过 align 控制表头、值与编辑器的逻辑对齐；数值输入保留负号顺序，编辑入口包含可见值的无障碍名称。窄屏编辑区域保留焦点留白，保存按钮使用已有中性色强调。实际浏览器回归同时修正 React 会话示例删除后的焦点时序，并等待菜单入场结束后再执行现有颜色对比扫描。

当前115族、298 Story、四端各790个公开值入口、183个框架示例。复杂选择器、批量编辑、撤销和虚拟化仍有边界，见 [表格 API](data-table.md) 与 [Ark UI 覆盖范围](ark-ui-coverage.md)。本批具体检查、截图复核与平台限制见 [Linux 验收](audits/2026-10-05/data-table-edit-linux/acceptance.json)；过程截图和日志保留在忽略目录，仅新增实际回归使用的Linux基线。


## DateInput 完整 ISO 粘贴核验

确认原生完整日期粘贴已由四端封装提供，增加非法日期、边界、焦点、范围端点与真实表单提交回归，避免重复实现。该批只补回归和契约说明，不增加公共入口或修改外观；详见 [专项验收](audits/2026-10-05/date-input-paste-linux/acceptance.json)。其余高级缺口继续保留在 [范围表](ark-ui-coverage.md#下一批高级能力的边界)。


## 剩余高级能力持续交付

本轮逐项实现：表格选择与多行编辑、批量编辑、表格/消息虚拟化、图表交互、复杂问卷输入和异步Collection契约。第一项增加原生select/textarea及对应校验、键盘、焦点和生命周期，详见 [表格说明](data-table.md#选择与多行编辑)。当前115族、300 Story、四端各790公开值入口、191示例；各项仅在对应验收通过后关闭，不把业务服务或格式规则混入组件。

复杂编辑器验收：[Linux / 四端选择与多行编辑](audits/2026-10-05/data-table-complex-editors-linux/acceptance.json)。

批量编辑已完成四端原子变更、共享校验、取消和冲突安全撤销；验证及限制见 [Linux 验收](audits/2026-10-05/data-table-batch-linux/acceptance.json)。

DataTable 与 MessageScroller 可变高度虚拟化已同步四端：稳定键、真实尺寸测量、阅读锚点、焦点保留与有界 SSR。四端 VirtualizationExample 与两个 Virtualized Story；当前115族、302 Story、四端各790公开值入口、195示例。API 见 [表格](data-table.md#可变行高虚拟化) 和 [消息](conversation.md#消息虚拟化)。

虚拟化验收：四端72项、受影响16项、Linux视觉106项通过；范围、短暂失败与平台限制见 [验收摘要](audits/2026-10-05/virtualization-linux/acceptance.json)。

图表分类缩放/原生范围刷选、多序列指针提示/键盘检查与增量数据已同步四端和 ChartInteractionExample/ZoomAndBrush Story，进入专项验收。当前115族、303 Story、四端各790公开 LoongArk 值入口、199示例；API 见 [图表说明](chart.md#分类缩放刷选与交互提示)。

图表缩放、刷选、交互提示和增量数据更新已完成四端专项验收，见 [图表窗口验收](audits/2026-10-05/chart-window-linux/acceptance.json)。覆盖为 115 个组件族、303 个 Story、四端各 790 个公开 LoongArk 值入口、199 个示例。复杂问卷和异步 Collection 契约继续实现。

复杂问卷新增数值、日期、下拉选择、矩阵和排序题型，四端共享校验、表单和焦点行为；见 [问卷说明](questionnaire.md) 与 [验收](audits/2026-10-05/questionnaire-types-linux/acceptance.json)。覆盖为 115 个组件族、304 个 Story、四端各 790 个公开 LoongArk 值入口、203 个示例。异步 Collection 契约继续实现。

异步 Collection 复用原生 useAsyncList，新增共享加载/接收确认契约、稳定键去重、游标循环、重试与取消；见 [异步 Collection](async-collection.md)。四端专项验收通过；见 [Linux 验收](audits/2026-10-05/async-collection-linux/acceptance.json)。


本轮指定的六项高级能力已逐项实现并验收：复杂编辑器、原子批量编辑与撤销、可变高度虚拟化、图表缩放/刷选/提示与增量更新、复杂问卷、异步 Collection。当前 **115 个组件族、305 个 Story、四端各 790 个公开 LoongArk 值入口、207 个框架示例**。具体 API、平台限制和每批验收保留在上述链接；业务服务仍由调用方提供。过程截图和日志只存忽略目录，仓库仅保留简短摘要及实际回归使用的基线。

最终异步 Collection 批次：四端回归 121 项、完整 Story 浏览器回归 95 项、视觉比较 126 项、Pages 子路径检查通过；207 个框架示例运行。121 个消费专用用例在 Story 服务中跳过，已由四端套件独立覆盖。详见 [最终验收](audits/2026-10-05/async-collection-linux/acceptance.json)。


## 全部高级缺口补齐（2026-10-05）

按 [高级能力清单](advanced-capabilities.md) 逐项实现与验收。该清单独立于组件族和 Ark 部件统计；只关闭有实际代码、四端消费及相应验收支持的项目。

## 多列查询与筛选（2026-10-05）

DataTable 四端提供稳定多列排序、Shift键盘/指针追加优先级和文本/数值/选项列筛选；非法数值草稿保留并关联错误，有效查询改变才重置页码和虚拟窗口。非受控状态清理陈旧列，受控拒绝与服务端不重复处理保持一致；Svelte新增稳定SSR字段关联，原生选项SSR选中状态同步。API见[表格说明](data-table.md#多列排序与列级筛选)。

当前115族、306 Story、四端各790个公开值入口、211示例。40项四端回归及211示例、104项Story全量检查通过；分页草稿调整后受影响16+4项再次通过，最终130项视觉比较通过。只新增8张已审阅Linux基线，既有128张含Windows基线哈希不变；实际范围与失败修正见[验收](audits/2026-10-05/data-table-query-linux/acceptance.json)。浏览器CI首轮结果已记录，Firefox/WebKit与真机验收仍开放。


## 2026-10-05 — 跨浏览器问题整改

依据实际 Linux Chromium/Firefox/WebKit CI 失败截图和日志，修复 Chart 尺寸观察更新循环与原生选项盒模型、批量编辑 DOM 提交后的焦点意图、虚拟行移动焦点、Dialog 退场可见性及四端问卷完成态长文本。测试改为容器相对锚定、跨引擎原生剪贴板写入和有效 SVG 加载；合成日期粘贴不计作系统粘贴。四端与 Story 证据分阶段上传，保留14天。

本地 Chromium 完整四端138项、问卷完成态16项、Story104项通过；最终批量编辑修正后新构建、16项四端和4项Story复验、130项全量视觉比较通过，基线未变。实际截图已复核；新一轮真实浏览器CI与手机验收仍待实际结果，见[整改验收](audits/2026-10-05/browser-runtime-linux/acceptance.json)。列顺序与宽度交互继续实现。


实际跨浏览器整改后的[远端复核](audits/2026-10-05/browser-ci-recheck/acceptance.json)：Safari211默认示例及16项桌面专项通过，16张截图已审阅；Chromium四端通过但Story、Firefox、WebKit仍有明确失败。平台完整验收继续开放，模拟视口不计作真机。


列拖动排序、交互式列宽、键盘替代和RTL已同步四端；包含冻结区域约束、受控拒绝、动态列、边缘自动滚动及重排焦点可见性。当前115族、307 Story、四端各790值入口、215示例。完整四端154项及215示例通过；最终调整后新构建与受影响20项通过，134项视觉比较通过。新增8张已审阅Linux基线，既有136张含Windows基线哈希不变。详见[列交互验收](audits/2026-10-05/data-table-columns-linux/acceptance.json)。其余高级能力与实际跨浏览器失败继续处理，平台清单不关闭。

列交互在原生Safari26.6.1/macOS15.7.9新增8项桌面四端明暗专项通过；本次215默认示例及24项历史/图表/列交互通过，24张真实截图已审阅，见[Safari复验](audits/2026-10-05/data-table-columns-safari/acceptance.json)。该范围不代表窄屏或真机完成。

## 浏览器一致性修正（2026-10-05）

修复四端键盘追加排序、异步消息焦点与滚动锚点、菜单退出焦点及窄屏标题。Chart 与 Sheet 修正跨浏览器布局和退出状态；取消问卷回归使用受控时钟。CI 截图按框架拆分保存14天。Linux 验收范围、原生 Safari/Firefox 列交互的实际结果及尚未完成的平台复验见 [验收摘要](audits/2026-10-05/browser-consistency-linux/acceptance.json)。

浏览器修复的后续实际CI：原生Safari215默认示例和24交互通过，24张PNG已审阅；Firefox152通过/2失败，WebKit140通过/14失败，Chromium任务取消。按框架拆分截图已实际验证。未把部分结果计作全平台完成，详见[真实CI复核](audits/2026-10-05/browser-consistency-ci/acceptance.json)。


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


## 原生输入与图表提示一致性（2026-10-06）

CodeEditor 在真实输入事件前应用最新扩展配置，Chart 支持外部焦点下 Escape 关闭提示，并避免 SVG 重建覆盖显式检查分类；原生列拖动与富文本表格操作回归在滚动后重新核对真实命中目标。四端共享实现与示例保持一致，目录仍为117族、321Story、四端各792个LoongArk前缀公开值、243示例。

最终新构建、契约、发布类型/SSR和Svelte检查通过；Chromium/Firefox生产版本定向各112项通过，最终富文本共享回归另各16项通过；WebKit最终完整专项112项、Story32项及全量Linux视觉178项通过。三引擎144张实际截图及最终WebKit48张新图已查看，204张既有基线含Windows哈希未变。原生Safari基提交243默认示例和32交互通过、32截图已审阅，不代替本批新代码验收。范围及仍开放的平台失败见[验收记录](audits/2026-10-06/input-hover-platforms/acceptance.json)。重复题组、自定义渲染、虚拟化、日期、Drawer及真机继续实施。

重复/嵌套题组的模型、稳定实例路径和表单契约见[问卷](questionnaire.md)，实际范围与限制见[Linux三引擎验收](audits/2026-10-06/questionnaire-groups-linux/acceptance.json)。


## 自定义问卷渲染契约（2026-10-06）

既有Questionnaire增加custom题型与四端原生renderers，以稳定实例路径管理答案、必填/错误语义、递归FormData、注册控件焦点、受控拒绝恢复和取消/卸载。支持string、strings、map答案；业务题目定义与第三方控件仍由调用方提供。共享RatingGroup修复悬停后的键盘操作、接受值与预览的语义区分，以及Svelte受控回退。目录117族、323Story、四端各792公开值、251示例；API见[问卷契约](questionnaire.md)。

最终新构建、契约、发布类型/四端SSR和Svelte检查通过（0错误/4既有警告）。三引擎原生专项各27项通过；既有问卷Chromium100项、Firefox/WebKit各96项通过；Story47项及全量Linux视觉194项通过。144张四端截图与8张新Linux基线已实际审阅，212张旧基线含Windows哈希未变。验收范围、修正和限制见[验收记录](audits/2026-10-06/questionnaire-custom-linux/acceptance.json)。横向/二维/瀑布流虚拟化、日期、Drawer以及整库平台/真机验收继续实施。


## DataTable 横向列虚拟化（2026-10-06）

既有DataTable增加横向窗口，与可变行高窗口独立启用或组合。排序、筛选、范围粘贴、编辑和历史继续使用完整模型；冻结列、编辑列和活动游标保留，ARIA暴露完整列计数和绝对位置。四端各增加TableColumnWindowExample及根类型入口，新增ColumnVirtualization Story；当前117族、324Story、四端各792个LoongArk公开值、255个示例。API见[表格](data-table.md#横向列虚拟化)。

最终新构建、契约、发布类型/四端SSR及Svelte通过（0错误/4既有警告）；642个运行时文件与交互验收版本逐文件哈希相同。三引擎新增各17项、既有表格各96项通过；Story32项及完整Linux视觉202项通过。144张原生截图、4张Story范围截图与8张新Linux基线已实际查看，220张旧基线含Windows哈希不变。范围和平台限制见[验收记录](audits/2026-10-06/table-column-window-linux/acceptance.json)。二维网格、虚拟瀑布流、日期、Drawer及整库平台/真机验收继续实施。

## 二维网格与虚拟瀑布流（2026-10-06）

新增四端LoongArkVirtualGrid与LoongArkVirtualMasonry，提供双轴窗口/键盘游标、可变卡片高度、稳定键与阅读锚点、焦点保留、完整ARIA位置及有界SSR。共享几何、控制器和样式集中实现，框架负责原生内容与生命周期；API见[虚拟布局](virtual-layout.md)。当前119族、326Story、四端各794个LoongArk公开值、263个框架示例。

新构建、契约、发布类型/四端SSR和Svelte通过（0错误/4既有警告）。三引擎最终各51项通过，包含既有纵向窗口及嵌套部件回归；Story16项及全量Linux视觉218项通过。288张原生、24张Story操作截图及16张新Linux基线已实际核验，228张旧基线含Windows哈希不变。测量前估算布局、平台与真机限制见[验收记录](audits/2026-10-06/virtual-layout-linux/acceptance.json)。日期、Drawer及整库平台/真机验收继续实施。


## 本地化日期与日期时间组合（2026-10-06）

既有DateInput补充严格本地化自由文本解析、日期/时分秒组合和显式时区示例；四端同步原生表单、LocaleProvider/RTL键盘与状态。共享Input/Textarea修复根状态继承，同时保留控件覆盖；API见[日期契约](localized-date.md)。当前119族、327Story、四端各794个LoongArk公开值、267个框架示例。

最终新构建、契约、发布类型/四端SSR及Svelte通过（0错误/4既有警告）；三引擎原生专项各32项、Story12项及完整Linux视觉230项通过。144张原生、12张Story截图与12张新Linux基线已实际审阅，244张旧基线含Windows哈希不变。范围及限制见[验收记录](audits/2026-10-06/localized-date-linux/acceptance.json)。Drawer、整库跨浏览器与真实手机验收继续实施。


## Drawer 四方向、RTL 与吸附交互（2026-10-06）

既有Drawer修复RTL物理定位、上/侧边手柄和减弱动效退出，四端新增方向示例及Directions Story；共享滚动视口适应吸附后的可见范围，支持长文本、键盘和焦点恢复。复用原生手势与生命周期，无新增别名或依赖；API见[Drawer](drawer.md)。当前119族、328Story、四端各794个LoongArk公开值、271个框架示例。

最终新构建、契约、发布类型/四端SSR和Svelte通过（0错误/4既有警告）。Chromium/Firefox/WebKit专项各24项、Story14项含328Story明暗质量扫描及完整Linux视觉262项通过。实际查看192张三引擎展开/紧凑抽样、64张Chromium触摸模拟、80张Story截图与32张新Linux基线；832张原生捕获并非逐张目视。256张旧基线含Windows哈希不变；过程文件不入Git。验收范围与限制见[记录](audits/2026-10-06/drawer-directions-linux/acceptance.json)。整库平台失败及真实手机验收继续实施，模拟触摸不算真机。

## 问卷题组与异步自定义控件焦点（2026-10-06）

共享题组按受控模型实际接受结果移交焦点，自定义首字段支持延迟注册；拒绝更新、外部焦点/指针、隐藏和卸载取消旧操作，空嵌套题组只定位自己的新增按钮。四端绑定同一注册及清理契约，不增加组件族或公开别名。Playwright与原生Safari复用真实dist的行为夹具。

最终新构建、类型/SSR和三引擎各76项问卷回归通过；288张四端三引擎默认/错误/嵌套捕获已实际查看联系表，并复核窄屏复杂题型局部。全328Story健康扫描拆批后完成；Firefox仍有1项既有右键菜单指针类型失败，整库WebKit和原生Safari仍有待复验项目，详见[本批范围及限制](audits/2026-10-06/questionnaire-group-focus-linux/acceptance.json)。

本批完整 Linux 视觉回归 262 项通过，288 张既有基线（含 Windows）哈希均未改变；另实际查看 Chromium/Firefox 桌面、窄屏、明暗主题的 48 张问卷 Story 状态截图，过程捕获仅存 `.artifacts/`。

## 右键菜单输入与原生高级验收（2026-10-06）

四端 ContextTrigger 使用 Ark 原生上下文和部件语义，共享行为只允许已知 touch/pen 启动长按，空 pointerType 的鼠标仍通过 contextmenu 打开。过滤随发布包交付，无需使用方安装仓库补丁；消费者事件仍合并执行。新增四端 ContextMenuExample 与 NativeInput Story，提供可见的键盘菜单按钮和操作结果。

原生 Safari runner 扩展日期本地化/时间组合、虚拟网格/瀑布流、富文本/代码编辑器、八种图表、矩阵多选、异步集合、列窗口及原生剪贴板历史、多列排序/筛选、排序问卷和 Drawer 全方向/RTL。Linux WebKit 脚本诊断完成四端浅色 76 场景；真实 macOS 结果与截图审阅前，平台清单仍开放。

最终三引擎菜单专项52项、Story专项18项和完整Linux视觉262项通过；实际查看64张菜单/Story/模拟触摸捕获，288张既有基线含Windows哈希不变。真实平台仍有失败，范围及限制见[验收记录](audits/2026-10-06/context-menu-native-input-linux/acceptance.json)。


2026-10-06 焦点与窄屏收尾：修复问卷原生提交归属、批量/单元格旧任务抢焦点、隐藏树行焦点与连续虚拟列导航；图表放大字体及缩屏浮层保持页面边界。三引擎各32项最终焦点/布局、23项自定义题型、16项范围和24项Story通过，Chromium262项视觉比较通过，288张既有基线含Windows未改。已实际查看四端、明暗、桌面/窄屏截图及原生select焦点局部；受控时钟取消回归保留真实鼠标和键盘。详见[验收](audits/2026-10-06/interaction-focus-and-layout-linux/acceptance.json)。此前整库140项专项在布局样式修改前运行，不混算为本批最终全量；远端新版本、原生Safari高级套件及真实手机仍需实际完成。

## 原生Safari夹具与焦点契约（2026-10-07）

macOS工作流补上共享发布夹具构建，真实Safari再次通过275个默认示例和48项既有交互后，在注册前焦点断言失败。夹具改为记录组件处理原生点击之前的焦点并比较相同节点，保留延迟注册目标、受控拒绝、外部聚焦和卸载检查；本地三引擎各3项通过，实际Safari仍待此改动复验。详见[验收](audits/2026-10-07/native-safari-focus-contract/acceptance.json)。
