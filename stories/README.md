# Storybook

`Guides/Getting Started` 提供可复制的安装、四端最小应用、逐组件引入、主题及 SSR 说明。`Components` 展示组件及状态，组合场景展示实际交互。Docs 根据公开类型与 `examples/reference-examples.json` 显式映射，展示当前组件的四端基础用法和 API 默认值来源；高级组合单独选择，不从大型组合文件中猜测对应关系；工具栏可切换明暗、高对比、品牌与动效策略。

使用 `pnpm storybook` 本地预览、`pnpm storybook:build` 构建静态站点。正式 GitHub Pages 由 main 更新；develop 保存临时 Actions 预览。新增 Story 保持可访问名称、真实交互和窄屏布局，同步覆盖清单；不得用全局 DOM 补丁掩盖组件问题。
