# LoongArk 四端示例

react、vue、solid、svelte 目录使用对应的 LoongArk 包，shared 目录统一场景文案与测试 ID。所有 TS/TSX 示例参与真实类型检查，Svelte 示例由 pnpm run check:svelte 检查。

Storybook 展示 React 示例。pnpm run test:frameworks 从真实发布 dist 构建四端消费项目，统一验证输入绑定、禁用、主题、浮层、选择器键盘操作、表格和窄屏；同时运行现有 115 个组件示例（React 31 个，其余三端各 28 个），新增 FoundationsExample 验证多行输入、删除标签、列表选择、底部导航和响应式 Grid；SelectionInputsExample 验证穿梭搬移与焦点、时间绑定和禁用选项、多行输入自动伸缩与窄屏；ActionMediaExample 验证浮动动作、受控菜单、媒体跨度和手机单列；ConversationExample 验证附件重试与禁用、消息滚动跟随和问卷原生表单；检查颜色面板、受控步骤切换、列表选项选择与嵌套按钮。Svelte 优先使用 LoongArkProvider；createThemeStore 提供 set/update/destroy，旧全局 action 接入方式见历史版本。

组件 API 与覆盖范围见 ../docs/component-coverage.md，主题接入见 ../docs/theme-system.md。

四端 `ConversationExample` 展示附件状态、消息跟随滚动和问卷流程，使用共享 `conversationDemo.ts` 数据；API 见 [附件、消息与问卷](../docs/conversation.md)。

DataTableExample 验证受控选择、拒绝更新、页内全选与 mixed 语义、跨页/筛选保留、源数据删除与恢复、列删除和键盘滚动。四端共享同一数据与行为用例。

ChartExample 四端展示长分类、多系列正负数据、柱线切换、清空恢复与缺失值断线。
