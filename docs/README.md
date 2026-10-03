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

当前为 114 族、290 Story、四端各 789 个公开值入口、163 个示例。本批四端消费/示例 8 项、浏览器 69 项、视觉 62 项通过；290 Story 明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0。100 张场景图经24张联系表及重点原图复核，60次四端对照均为0像素差异；新增4张Linux基线，已有58张Linux及2张Windows基线文件不变。下载和图标问题的修正前证据保留，详见 [验收记录](audits/2026-10-03/conversation-actions-linux/acceptance.json)。真实服务上传、复杂题型、虚拟化和媒体加载锚定等仍有明确边界，见 [高级能力缺口](ark-ui-coverage.md#下一批高级能力的边界)。
