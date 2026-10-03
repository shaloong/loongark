# LoongArk Storybook

Components 展示 78 个组件族；Examples 包含共享交互情景与 Neutral gallery 中性组合页面。工具栏支持浅色、深色、高对比、Shaloong VI 品牌覆盖与动效策略切换。

pnpm storybook 启动预览；pnpm storybook:build 构建静态产物；pnpm run test:e2e 执行完整故事健康与交互验收；pnpm run visual:test 验证视觉基线与 Axe。

新增或整理故事时保留公开导出。故事健康测试校验故事总数与组件族数量，避免代码清理降低展示覆盖。不得用全局 HTMLElement.prototype 补丁掩盖组件行为问题。
