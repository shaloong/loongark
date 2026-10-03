# LoongArk 四端示例

react、vue、solid、svelte 目录使用对应的 LoongArk 包，shared 目录统一场景文案与测试 ID。所有 TS/TSX 示例参与真实类型检查，Svelte 示例由 pnpm run check:svelte 检查。

Storybook 展示 React 示例。pnpm run test:frameworks 从真实发布 dist 构建四端消费项目，统一验证输入绑定、禁用、主题、浮层、选择器键盘操作、表格和窄屏；同时运行现有 103 个组件示例（React 28 个，其余三端各 25 个），新增 FoundationsExample 验证多行输入、删除标签、列表选择、底部导航和响应式 Grid；SelectionInputsExample 验证穿梭搬移与焦点、时间绑定和禁用选项、多行输入自动伸缩与窄屏；ActionMediaExample 验证浮动动作、受控菜单、媒体跨度和手机单列；检查颜色面板、受控步骤切换、列表选项选择与嵌套按钮。Svelte 优先使用 LoongArkProvider；createThemeStore 提供 set/update/destroy，旧全局 action 接入方式见历史版本。

组件 API 与覆盖范围见 ../docs/component-coverage.md，主题接入见 ../docs/theme-system.md。
