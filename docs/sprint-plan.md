# LoongArk Sprint 计划

> 目标：以统一的 Design Token 与主题运行时能力为核心，在三端（Vue/React/Svelte）快速复用 ArkUI 封装，避免重复样式开发。

## 迭代节奏

1. **Sprint 1**——交付 Token 管线与 Theme Runtime POC，并搭好工具链。（已完成）
2. **Sprint 2**（当前）——补齐核心 ArkUI Primitive（Button/Input/Dialog）以及视觉回归基线。
3. **Sprint 3**——推出三端适配包 Alpha，examples 联调、完善 Storybook。
4. **Sprint 4**——强化工具链、可访问性测试、文档与迁移指引，准备 Beta 发布。

## Monorepo 结构与状态

| 包                     | 职责                                  | Sprint 1 状态                                                                 |
| ---------------------- | ------------------------------------- | ----------------------------------------------------------------------------- |
| `@loongark/tokens`     | Token Registry、深合并、CSS/JSON 产出 | ✅ `baseTokens`、`mergeTokens`、`tokensToCssVariables`、`buildTokenArtifacts` |
| `@loongark/theme`      | 运行时主题工厂、DOM 注入              | ✅ `createLoongArkTheme`、品牌/模式覆盖、`theme.mount()`                      |
| `@loongark/primitives` | ArkUI 原子封装注册中心                | ✅ Registry + 注册 API，用于后续组件实现                                      |
| `@loongark/kit`        | 业务复合组件装配层                    | ✅ `bootstrapKit` 负责驱动 primitives/kit 注册                                |
| `@loongark/vue`        | Vue 插件化接入                        | ✅ `createLoongArkVuePlugin`，统一 mount 主题并提供依赖注入                   |
| `@loongark/react`      | React Provider & Hook                 | ✅ `LoongArkProvider` + `useLoongArkTheme`，内部初始化主题并挂载              |
| `@loongark/svelte`     | Svelte 主题 Store                     | ✅ `createThemeStore`，可在 Svelte/SvelteKit 共享主题实例                     |
| `@loongark/cli`        | Token/主题 CLI                        | ✅ `extract`/`verify` 支持写入目录并用于 CI                                   |

## Sprint 1 Backlog（Token Pipeline + Theme Runtime POC）

| 编号    | 交付内容                | 说明                                                          | 状态                                         |
| ------- | ----------------------- | ------------------------------------------------------------- | -------------------------------------------- |
| TOK-001 | Token Schema & 合并策略 | `TokenRegistry`、深合并、扁平化、CSS 变量生成                 | ✅ 已在 `@loongark/tokens` 落地              |
| TOK-002 | Token CI 钩子           | CLI `extract`/`verify`，支持写入目录并校验产物                | ✅ `pnpm loongark extract --dir dist/tokens` |
| THM-001 | 主题运行时工厂          | `createLoongArkTheme` 支持 mode/brand/overrides 并可 snapshot | ✅ `theme.snapshot()` 直出 JSON/CSS          |
| THM-002 | DOM 注入能力            | `theme.mount()` 兼容 Document/ShadowRoot，便于 SSR/Shadow DOM | ✅ 已实现并用于三端适配包                    |
| OPS-001 | Monorepo 构建脚本       | `pnpm run tsc`、`pnpm -r run build/lint` 串行多包             | ✅ `tsconfig` + workspaces 已配置            |
| OPS-002 | 包目录就绪              | 八个包含 `package.json`、`tsconfig`、入口骨架                 | ✅ `pnpm -r run build` 通过                  |

> Sprint 1 结论：Token 与 Theme 能力、CLI、适配包骨架和工具链已准备完毕，可作为后续迭代的基础设施。

## Sprint 2 Backlog（ArkUI Primitives + 视觉基线）

| 编号    | 交付内容                       | 说明                                                                    | 验收                                                          |
| ------- | ------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------- |
| PRI-101 | Button Primitive（含状态映射） | 统一尺寸/颜色/状态，提供 Loading/Disabled，并对接 tokens + theme        | Vue/React/Svelte 均有示例，视觉回归通过                       |
| PRI-102 | Input Primitive（含校验状态）  | 支持前后缀、错误态与可访问性提示                                        | 文档包含 props/slots 映射，Playwright + Axe 无阻塞            |
| PRI-103 | Dialog Primitive               | 处理焦点陷阱、遮罩与动画 hook，抽象 cross-framework 行为                | Storybook 支持键盘操作演练，视觉快照稳定                      |
| KIT-201 | 示例级 LoongArk Kit 组件       | 构建 1-2 个组合组件（如 FilterBar、ProfileCard）展示如何消费 primitives | Vue/React/Svelte 示例同步，说明可选 API                       |
| QA-301  | 视觉回归基线                   | 引入 Chromatic 或 Playwright screenshot pipeline，并对核心组件建基线    | ✅ `pnpm visual:test` 通过 `chromium-visual` 项目产出截图基线 |
| QA-302  | 无障碍/对比度检查              | 集成 Axe/Lighthouse CI 检查输入焦点、ARIA、颜色对比                     | ✅ Playwright 联动 Axe（WCAG 2A/2AA）零 violation             |
| OPS-401 | Storybook + Examples           | 建立 `examples/` 与 Storybook 配置，对外提供演示与文档入口              | `pnpm run storybook` 可在本机启动，examples 三端运行正常      |
| DOC-501 | 指南与迁移说明                 | 更新 `docs/`（theme-system、教程）描述 primitives、Kit 用法             | 文档含组件行为、ARIA、视觉策略，团队评审通过                  |

> Sprint 2 重点：边交付 ArkUI Primitive，边搭建视觉/无障碍自动化，确保跨框架一致性可量化。

### Sprint 2 工作拆分

1. **组件交付**：先完成 Button → Input → Dialog，每个组件需包含 tokens 映射、主题示例与测试。
2. **视觉回归**：挑选核心状态，配置 Chromatic/Playwright 截图工作流，嵌入 CI。
3. **可访问性**：把 Axe/Lighthouse 检查集成到 Storybook/Playwright 流程中。
4. **示例与文档**：更新 `examples/*`、`docs/`，确保每个组件有统一的 props/slots 文档与迁移指南。

> 组件视觉可借鉴 shadcn/ui、Supabase、Apple Design 等优秀体系的动效节奏、留白策略与高对比排版，**但仍需通过 LoongArk tokens/theme 输出**，从灵感中提炼交互细节而非直接搬运样式，保持品牌一致性。

### ArkUI 接入计划（Sprint 2 内）

1. 在 React/Vue/Svelte 包内新增 ArkUI 依赖（例如 `@ark-ui/react`），保证构建链路可直接消费 ArkUI 官方组件。
2. 以 Button/Input/Dialog 为起点，实现 `LoongArkButton` 等包装层：内部渲染 ArkUI 组件，但自动注入 `data-lk-*` 属性、variant/size/状态映射与必要的可访问性 props。
3. 把包装组件注册到 `@loongark/kit`，并在 examples/Storybook 中给出“ArkUI 原件 + LoongArk 皮肤”的示例，方便视觉/无障碍基线复用。
4. 将经验沉淀到文档（props 映射表、ArkUI 版本约束、如何扩展更多组件），避免跨端实现发散。

### Storybook 演示覆盖（Sprint 2 增量）

- **全局主题切换**：`.storybook/preview.tsx` 新增 `globalTypes.mode` Toolbar 与 `LoongArkProvider` Decorator，使用 tokens (`--lk-color-neutral-50/900`) 驱动浅/深色背景，一次注入主题即可复用全部 stories。
- **工作区 alias**：`main.ts` 中的 `viteFinal` 将 `@loongark/*` 指向源码包，使 Storybook 直接消费 primitives/kit，实现「源码即文档」。
- **组件覆盖**：`stories/LoongArkButton|Input|Dialog.stories.tsx` 提供 variant/size/state/motion 示例，`ButtonInputDialog.stories.tsx` 复用 examples 目录的端到端场景，方便 Playwright/Storybook 共用测试钩子。
- **构建验证**：`pnpm storybook:build` 产出 `storybook-static/`，已作为视觉基线输入，后续可挂接 Chromatic 或 Docs 站点。

### Sprint 2 组件进度

#### PRI-101 · Button Primitive（已落地）

- 入口：`packages/primitives/src/button.ts`，在 `bootstrapKit()` 时自动注册并注入样式。
- 使用 `data-lk-button` 标记任意 ArkUI Button 外壳，可搭配以下属性：
  - `data-variant="solid|outline|ghost"`（默认 `solid`）
  - `data-size="sm|md|lg"`（默认 `md`）
  - `data-block="true"`（拉伸为 100% 宽度）
  - `data-loading="true"`（禁用交互，显示加载态）
  - 原生 `disabled` / `aria-disabled="true"`
- 样式完全由 tokens 驱动（颜色、排版、圆角、动效），并在 focus、hover、active、disabled 等状态下维持 ≥4.5:1 对比度。

跨框架示例：

```tsx
// React / Vue / Svelte 模板一致，只需数据绑定即可
<button
  data-lk-button
  data-variant="outline"
  data-size="sm"
  data-block={isFullWidth}
  data-loading={submitting}
  disabled={disabled}
>
  {submitting ? "提交中..." : "保存"}
</button>
```

> 注意：`bootstrapKit(theme)` 已在 React Provider / Vue 插件 / Svelte store 内部调用，业务侧只需确保按钮元素带上 `data-lk-button` 及所需属性。更多状态（如 danger、link）可在下一个迭代基于该 primitive 扩展。

#### PRI-102 · Input Primitive（已落地）

- 入口：`packages/primitives/src/input.ts`，提供输入框/textarea 以及 prefix/suffix/辅助文本组合场景。
- 属性 API：
  - `data-lk-input`（直接用于 `<input>` / `<textarea>`）
  - `data-lk-input-wrapper` + `data-lk-input-prefix|suffix` + `data-lk-input-helper` 组合可实现带图标和状态文案的复合输入。
  - 受控属性：`data-size="sm|md|lg"`、`data-state="default|invalid|success"`、`data-disabled="true"`、`data-multiline="true"`。
- 状态：hover/focus/invalid/success/disabled/readonly 已内置；wrapper 支持 `:focus-within` 自适应高亮，不需要额外脚本。
- 视觉策略：参考 shadcn/ui 与 Supabase 表单的留白节奏，结合 Apple Design 的高对比 focus ring，全部来自 tokens（Border、Surface、Brand Accent）。

跨框架示例：

```tsx
<label>
  <span className="text-sm text-muted">邮箱</span>
  <div data-lk-input-wrapper data-size="md">
    <span data-lk-input-prefix>@</span>
    <input data-lk-input type="email" placeholder="you@example.com" required />
    <button type="button" data-lk-input-suffix data-action="button">
      清除
    </button>
  </div>
  <span data-lk-input-helper data-variant="error">
    请输入有效邮箱地址
  </span>
</label>
```

#### PRI-103 · Dialog Primitive（已落地）

- 入口：`packages/primitives/src/dialog.ts`，覆盖 overlay、content、title/description/footer、close button 的样式与动画。
- 属性 API：
  - `data-lk-dialog-overlay`，可选 `data-blur="true"`、`data-state="open|closed"`。
  - `data-lk-dialog-content` 支持 `data-size="sm|md|lg"`、`data-placement="center|top"`、`data-motion="scale|slide"`。
  - `data-lk-dialog-title` / `data-lk-dialog-description` / `data-lk-dialog-footer` / `data-lk-dialog-close`。
- 动效：提供 `scale` 与 `slide` 两套 keyframe，`prefers-reduced-motion` 自动降级；Overlay 使用基于 tokens 的 scrim + blur。
- 视觉：取材 Apple Design 的玻璃感层级与 Supabase Dashboard 的对比度，阴影/圆角/留白全部交由 tokens 控制，可直接接入 ArkUI Dialog。

推荐结构：

```tsx
<div data-lk-dialog-overlay data-blur="true" data-state={open ? "open" : "closed"} />
<section
  role="dialog"
  aria-modal="true"
  data-lk-dialog-content
  data-state={open ? "open" : "closed"}
  data-size="md"
>
  <button data-lk-dialog-close aria-label="关闭">×</button>
  <h2 data-lk-dialog-title>邀请成员</h2>
  <p data-lk-dialog-description>为成员分配角色与权限，邀请邮件将立即发送。</p>
  <footer data-lk-dialog-footer>
    <button data-lk-button data-variant="ghost">取消</button>
    <button data-lk-button data-variant="solid">发送邀请</button>
  </footer>
</section>
```

### React/Vue ArkUI 封装进展

- `@loongark/react` 与 `@loongark/vue` 均已引入 Ark UI，对 Button/Input/Dialog 提供 LoongArk 包装：内部渲染 Ark UI 原件或 `ark.*` 工厂节点，同时自动注入 `data-lk-*` 属性以匹配 primitives 的样式与状态。
- Button：`LoongArkButton` 透传原生 `button` 属性，并提供 `variant/size/block/loading` 语义，与 ArkUI 的 `ark.button` 结合，默认 `type="button"`，Loading 时自动设置 `aria-busy/aria-disabled`。
- Input：通过 Ark UI `Field` 系列组合出 `LoongArkInputRoot/InputControl/TextareaControl/HelperText/Prefix/Suffix` 等粒度组件，可自由拼装 prefix/suffix/辅助文案，同时保持无障碍结构。
- Dialog：`LoongArkDialog` 集成 Ark UI `Dialog.Root/Trigger/Positioner` 等节点，`Overlay/Content/Title/Description/Footer/CloseTrigger` 封装数据属性与动画开关，可直接接入 Portal/Teleport 场景。
- 这些包装组件在 `bootstrapKit(theme)` 后即可套在 ArkUI 逻辑上，实现“ArkUI 行为 + LoongArk 皮肤”模式，为后续 Kit 组合与 Storybook 示例打下基础。

### Svelte/Solid ArkUI 封装进展

- `@loongark/svelte` 现已提供 `button/input/dialog` actions 与 `createThemeStore()`，Svelte/SvelteKit 只需 `use:loongArkButton` 等指令即可把 Ark UI DOM 节点与 tokens 绑定；theme store 默认执行 `createLoongArkTheme`→`bootstrapKit`→`mount`，可在 Storybook/Playwright 中重复利用同一主题实例。
- `@loongark/solid` 引入 `LoongArkProvider`/`useLoongArkTheme`，并补齐 Button/Input/Dialog 的 Solid 封装：依托 Ark UI Solid primitives 输出 `data-lk-*` 属性与 size/motion/placement props，确保 Solid 与 React/Vue 保持一致的状态语义。
- `examples/` 目录新增 React/Vue/Svelte/Solid 四端示例及共享测试 ID，Storybook (`pnpm storybook`) 直接消费 React 示例，Playwright (`pnpm visual:test`) 通过 `tests/examples.spec.ts` 对 Storybook story 做截图/无障碍断言，形成文档-示例-测试闭环。
- 示例与测试计划：
  1. 基于新的 Svelte actions 与 Solid 组件，在 `examples/` 目录添加 form 与 dialog 示例（含多状态截图），Storybook stories 以相同 props 表驱动，准备用 `chromatic` 或 `@storybook/test-runner` 生成基线。
  2. Playwright 端通过 `tests/examples.spec.ts` 直接访问 Storybook story，对 Button/Input/Dialog 的关键状态（hover/focus/invalid/loading）进行截图/断言，并可根据需要挂载 Axe/Lighthouse 扩展。
  3. 将上述示例导出的 `data-testid`（例如 `data-testid="input-prefix"`）保持一致，方便 Cross-framework Playwright 用同一选择器断言视觉/无障碍结果。

### QA-301 / QA-302 自动化交付

- 新增 `tests/button-input-dialog.visual.spec.ts`，对 Storybook `ButtonInputDialog` 场景在默认与 Dialog 打开状态执行 `expect(...).toHaveScreenshot()`，并统一通过 `viewMode=story` 访问 `iframe.html`，保证只截取 Canvas 内容。
- 测试中使用 `@axe-core/playwright` 对同一页面运行 WCAG 2A/2AA 规则，结合共享的 `data-testid`/placeholder 复用交互脚本，确保无障碍校验与视觉基线绑定。
- `playwright.config.ts` 新增 `chromium-visual` project，固定 `1280×720` 视口并禁用动画差异；`pnpm visual:test` 仅运行该项目，`pnpm test:e2e` 可执行全部 Playwright 套件以覆盖功能 + 视觉。

## Sprint 1 实施细节

### Tokens Pipeline

- `baseTokens` 收口品牌色、Neutral、Typography、Space、Radius、Motion。
- `mergeTokens()` 保留用户 overrides，`tokensToCssVariables()` 输出 `--lk-*` 变量。
- `buildTokenArtifacts()` 一次性生成 JSON/CSS 文本供 CLI/CI 使用。

### Theme Runtime

- `createLoongArkTheme(options)` 支持 `mode`、`brand`、`accent` 与深入 overrides。
- `theme.mount(target?)` 自动定位 Document/ShadowRoot 并插入 `<style>`，多端通用。
- `theme.snapshot()` 复用 Token 产物，便于 CLI verify。

### CLI 工作流

- `pnpm loongark extract --dir dist/tokens --format css,json`
  - 默认输出 CSS + JSON，可用 `--css <file>` / `--json <file>` 单独控制。
- `pnpm loongark verify --dir dist/tokens`
  - 对比现有文件与最新产物，如有差异退出码为 1，适合 CI。

## 工具链 & 命令

- **包管理器**：`pnpm`（建议 8.x+）。
- **全量编译**：`pnpm run tsc` (`pnpm exec tsc -b`)。
- **多包构建**：`pnpm -r run build`。
- **多包 Lint**：`pnpm -r run lint`。
- **清理 dist**：`pnpm run clean`。

## 后续 Sprint 提示

- Sprint 2：按 ArkUI 分类补组件、建立视觉回归（Chromatic/Playwright）。
- Sprint 3：examples 项目、Alpha 发布、跨框架演示与文档。
- Sprint 4：接入可访问性流水线、完善迁移指南、准备 Beta。
