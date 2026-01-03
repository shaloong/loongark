# LoongArk Examples

> 本目录聚焦“跨框架同一交互场景”，所有示例共享一套文案/测试 ID，方便 Storybook 与 Playwright 直接复用。

## 结构

```text
examples/
  shared/          # 统一的 props、文案、data-testid 定义
  react/           # React + @loongark/react 组件示例
  vue/             # Vue + @loongark/vue 组件示例
  svelte/          # Svelte actions 示例
  solid/           # Solid 组件示例
```

每个框架的入口文件都实现同一场景：包含带前后缀的输入框、错误提示以及带按钮的对话框触发链路。`data-testid` 与 props 均来自 `shared/demoScenario.ts`，这样：

- Storybook 只需导入 React 版本即可实时展示；
- Playwright 用同一批测试 ID（`input-prefix`、`primary-button` 等）在不同框架下复用断言；
- 未来扩展更多组件时，可在 `shared/` 追加新的情境对象。

> 示例文件不会在构建中参与打包，只提供团队在 Storybook/Playwright/文档中复用的源代码片段。

## 使用方式

1. 启动 Storybook：`pnpm storybook`（或 `pnpm storybook --ci` 供 Playwright 复用）。
2. 运行可视化/可访问性测试：`pnpm visual:test`（底层调用 Playwright，自动访问 Storybook story）。
3. 若只想在本地查看 React 示例，可直接在 `stories/ButtonInputDialog.stories.tsx` 中引入其它情境，保持 `data-testid` 不变即可被测试脚本捕获。
