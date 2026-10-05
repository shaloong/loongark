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
