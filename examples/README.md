# LoongArk 四端示例

react、vue、solid、svelte 目录使用对应的 LoongArk 包，shared 目录统一场景文案与测试 ID。所有 TS/TSX 示例参与真实类型检查，Svelte 示例由 pnpm run check:svelte 检查。

Storybook 展示 React 示例。pnpm run test:frameworks 从真实发布 dist 构建四端消费项目，统一验证输入绑定、禁用、主题、浮层、选择器键盘操作、表格和窄屏；同时运行现有 147 个组件示例（React 39 个，其余三端各 36 个），新增 FoundationsExample 验证多行输入、删除标签、列表选择、底部导航和响应式 Grid；SelectionInputsExample 验证穿梭搬移与焦点、时间绑定和禁用选项、多行输入自动伸缩与窄屏；ActionMediaExample 验证浮动动作、受控菜单、媒体跨度和手机单列；ConversationExample 验证附件重试与禁用、消息滚动跟随和问卷原生表单；检查颜色面板、受控步骤切换、列表选项选择与嵌套按钮。Svelte 优先使用 LoongArkProvider；createThemeStore 提供 set/update/destroy，旧全局 action 接入方式见历史版本。

组件 API 与覆盖范围见 ../docs/component-coverage.md，主题接入见 ../docs/theme-system.md。

四端 `ConversationExample` 展示附件状态、消息跟随滚动和问卷流程，使用共享 `conversationDemo.ts` 数据；API 见 [附件、消息与问卷](../docs/conversation.md)。

DataTableExample 验证受控选择、拒绝更新、页内全选与 mixed 语义、跨页/筛选保留、源数据删除与恢复、列删除和键盘滚动。四端共享同一数据与行为用例。

ChartExample 四端展示长分类、多系列正负数据、柱线切换、清空恢复与缺失值断线。

## Ark UI 高级能力复核（2026-10-03）

新增 ImageCropper、JsonTreeView 与独立辅助组件，开放既有组件的 Provider/Context 与高级部件。SegmentGroup 统一为 Ark 原生单选语义，Vue 多选表单值同步修正。新增四端裁剪、JSON、辅助组件与高级选择示例。后续批次已实现新版 DateInput、Swap、TOC 与原生手势 Drawer；常用 Context/Collection Hook 同步开放。组件目录覆盖不等同于所有高级场景均已验收。详细对照、API 与迁移见 [Ark UI 核对](../docs/ark-ui-coverage.md)。

## 新版 Ark 组件与控制（2026-10-03）

DateInput 提供分段日期、范围、键盘编辑与真实表单；Swap 提供受控指示内容切换；Toc 提供目录缩进、滚动容器、活动状态和卸载重建；Drawer 迁移为原生拖拽、吸附点和嵌套模态，Sheet 继续使用 Dialog。四端各有四个真实示例。高级组合组件缺口及原生 API 限制见 [Ark UI 核对](../docs/ark-ui-coverage.md)。

本批 Linux 验收：114 族、283 Story、四端各 789 个公开值入口；147 个四端示例运行通过，专项行为 8 项、全量浏览器 106 项、视觉 46 项通过。明暗默认 WCAG、窄屏溢出和有效 transition: all 为 0；64 张四端和 16 张 Story 截图已目视核验。新增 16 张 Linux 基线，原有 30 张 Linux 与 2 张 Windows 基线不变。详细范围与限制见 [验收记录](../docs/audits/2026-10-03/ark-next-linux/acceptance.json)。
