# 四端使用示例

这些文件是可运行的接入与组合示例，不是独立业务应用：

- `react/` 用于 Storybook 场景，也提供 React 参考代码。
- `vue/`、`solid/`、`svelte/` 提供同场景的原生绑定和生命周期示例。
- `shared/` 复用场景数据、文案和测试标识。

每个组件族的 Docs 默认展示独立基础用法，使用 `reference-examples.json` 显式指定四端对应文件，不通过组件名字符串匹配组合示例。`*BasicExample` 只包含本组件所需的部件、数据与交互；Calendar、Date Picker 和 Tour 复用已有独立示例。复杂组合通过明确命名的高级用法入口查看。

静态部件与简单状态配方集中在 `scripts/basic-example-recipes.json`，运行 `node scripts/generate-basic-examples.mjs` 更新四端文件；Toast 和 DateInput 的框架原生上下文用法直接维护对应文件。生成代码也参与真实类型、消费构建和浏览器验证，不以生成成功替代运行验证。

Storybook Docs 从这里读取四端代码；消费夹具从实际发布产物构建并运行这些示例，检查类型、SSR、绑定与交互。因此不能把目录当作临时演示删掉。复制示例时，在应用中显式声明代码使用的额外类型或插件依赖。仓库新增示例应服务组件接入、组合或行为验证；业务后端、真实凭据和过程截图不放在这里。

本地展示使用 `pnpm storybook`；四端验证使用 `pnpm test:frameworks`。详细顺序见 [贡献指南](../CONTRIBUTING.md)，组件边界见 [能力概览](../docs/capabilities.md)。
