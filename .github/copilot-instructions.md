# LoongArk Copilot 指南

## Copilot 响应与代码约束

- **统一语言**：所有对话回复、代码注释与文档补充须使用中文，除非上下文已经要求特定英文术语（如 API 名称）。
- **代码注释**：仅在复杂逻辑/边界条件处添加中文注释，简洁明了，避免描述显而易见的语句。
- **最佳实践**：
  - 严格类型：优先使用精确类型和泛型，不得使用 `any`/`unknown` 逃避检查。
  - Token 驱动：样式、尺寸、动效全部通过 tokens/theme 获取，禁止硬编码色值或 spacing。
  - 可访问性：组件需输出合理的 `aria-*` / 键盘交互提示，与 Ark UI 行为保持一致。
  - 可测试性：新增功能若涉及逻辑分支，需考虑测试钩子或示例，便于 Storybook/Playwright 引入。
  - 依赖管理：新增第三方依赖前写明用途，确保 tsconfig `paths` / 自定义类型同步更新。
  - 更新文档：任何新增/修改功能均需同步更新 `docs/` 目录下的相关文档，保持信息一致。
  - 动效性能：优先使用 `transform`/`opacity` 过渡，避免触发 layout/reflow；尽量不用 `top/left/width/height/font-size/line-height` 等布局属性做动画，必要时用 scale/translate 近似；`box-shadow` blur 半径应控制在安全范围，且尊重 `prefers-reduced-motion`，提供无动效降级。

## 项目速览

- Monorepo 以 `pnpm` workspace 组织 (`package.json` → `workspaces: packages/*`)，所有包共享根目录 `tsconfig.base.json` 中的路径别名与 `types/*.d.ts` 桩定义。
- `docs/theme-system.md` 描述 token→theme→ 组件的设计规范；`docs/sprint-plan.md` 追踪当前 Sprint 交付，回答“为什么这样分层”。
- 每个包遵循 `src/index.ts` → `dist/` 输出的最小骨架；构建脚本统一使用 `tsc -p tsconfig.json`。
- 自定义框架类型通过 `types/react.d.ts`、`types/vue.d.ts`、`types/svelte-store.d.ts` 覆盖，避免引入真实依赖时的干扰。

## 架构分层（由底向上）

- **Tokens (`packages/tokens/src/index.ts`)**：`baseTokens` + `mergeTokens` + `tokensToCssVariables` 负责语义化变量、深合并与 `--lk-*` CSS 输出；新增 token 需同步 JSON/CSS 产物。
- **Theme (`packages/theme/src/index.ts`)**：`createLoongArkTheme` 注入 mode/brand/overrides，`ThemeRuntime.mount()` 支持 Document 或 ShadowRoot；`snapshot()` 直出 CLI 需要的 JSON/CSS。
- **Primitives (`packages/primitives/src/index.ts`)**：通过 `createPrimitive` 声明 `contract`（标记 token 依赖、默认 props），再用 `registerPrimitive` 收录，实际的 `apply(theme)` 中写入样式或变量。
- **Kit (`packages/kit/src/index.ts`)**：`bootstrapKit(theme)` 会先应用 primitives，再执行 `registerKitComponent` 的复合组件 `mount`，确保主题注入顺序稳定。
- **框架接入**：React Provider (`packages/react/src/index.ts`)、Vue 插件 (`packages/vue/src/index.ts`)、Svelte store (`packages/svelte/src/index.ts`) 都会 `createLoongArkTheme` → `bootstrapKit` → `mount`，不要跳过这一步，否则 registry 不会生效。

## 工作流与命令

- 安装依赖：`pnpm install`（需 pnpm 8+，因为 workspace 协议 `workspace:*`）。
- 全量类型构建：`pnpm run tsc`（等价 `pnpm exec tsc -b`，利用根 `tsconfig.json` references）。
- 多包构建 / Lint：`pnpm -r run build` 与 `pnpm -r run lint`，会在每个 package 内执行对应 script。
- 清理产物：`pnpm run clean` 调用 `scripts/clean.mjs`，递归删除各包 `dist/`。
- Token 产物：构建 CLI (`@loongark/cli`) 后使用 `pnpm loongark extract --dir dist/tokens --format css,json` 生成；`pnpm loongark verify --dir dist/tokens` 校验 CI 是否落后，若无 `--dir` 要显式传 `--css/--json`。

## 组件与主题约束

- 所有样式必须通过 token/theme（`theme.tokens` 或 `tokensToCssVariables`）驱动，禁止直接写色值/尺寸；`docs/theme-system.md` 定义的对比度要求 ≥4.5:1。
- 新增主题模式或品牌色请优先通过 `applyBrandOverrides()`（`packages/theme/src/index.ts`）而非手改 CSS，确保 `snapshot()` 与 CLI 一致。
- 增加 Primitive 时务必在 `contract.tokens` 填写所需 token 路径，方便审核依赖；复合组件只消费 primitives/kit 注册，避免跨层访问 DOM。
- 跨框架共享逻辑放在 primitives/kit，框架包只做注入与上下文（React `ThemeContext`、Vue `provide`、Svelte store）。

## 集成提示

- 任何文档/示例需要更新时同步 `docs/sprint-plan.md` 中的 Sprint Backlog，保持团队节奏一致。
- 如果要在外部项目接入，只需 `import { createLoongArkTheme } from "@loongark/theme"` 并在入口 `theme.mount()`；React/Vue/Svelte 包已经封装该模式，避免重复。
- CI/设计输出依赖 CLI 产物，修改 tokens 后立刻跑 `pnpm loongark extract` 并纳入提交，以免 `verify` 在 CI 报错。
- Shadow DOM/SSR 场景下可以给 `createLoongArkTheme` 传 `targetId` 或自定义 `mount` 目标；React/Svelte 已默认调用 `theme.mount()`，Vue 插件当前只 `provide`，需要在宿主入口手动 `theme.mount()`。

## Ark UI MCP 服务

- 可使用 Ark UI MCP Server（面向 Claude Code/Cursor/Copilot 的 Model Context Protocol 服务）获取 Ark UI 组件规范与跨框架实现细节。
- 当需要了解 Ark UI 组件属性、事件或样式约束时，优先调用 Ark UI MCP 服务，再据此在本仓库实现 primitives/kit 逻辑，确保 React/Vue/Solid/Svelte 行为一致。
- 如果接入路径或 API 不确定，先在指令中说明“请调用 Ark UI MCP 服务查询”，待获取官方示例后再动手编码，避免偏离 Ark UI 约定。
