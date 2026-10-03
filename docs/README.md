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

相关文档：[浮动动作与媒体布局](action-media.md)、[选择与输入组件](selection-inputs.md)、[常用组件缺口与本批补齐](component-gaps.md)、[主题系统](theme-system.md)、[组件覆盖](component-coverage.md)、[整改与验收](remediation.md)、[迭代记录](sprint-plan.md)。
