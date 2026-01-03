# LoongArk

## 设计规范

### 色彩规范

- 明暗对比度 ≥ 4.5:1
- 提供色盲友好支持
- 遵循 WCAG 2.1 AA 标准

#### 颜色使用建议

VI 颜色在某些场景下可能不满足可访问性标准，建议：

1. 主色：天青蓝 `#006EFF`
2. 辅助色：深海蓝 `#0A3565`、晨空蓝 `#5AC8FA`、珊瑚橙 `#F58220`
3. 文本：
   - 黑色背景文字用夜墨黑 `#121212`
   - 主要文本用岩灰 `#3A3A3C`
   - 次要文本用铅灰 `#767680`
   - 任意文本与背景对比度均需 ≥ 4.5:1

### 字体规范

- 正文：16px/1.5
- 标题：20px-40px
- 重要标题使用钉钉进步体
- 普通标题、正文使用阿里巴巴普惠体 3.0

## ArkUI 封装策略

### 目标

- 为多端 (Vue/React/Svelte) 提供一致的视觉体验
- 让业务组件只关注交互逻辑，样式通过主题系统自动获得
- 保持 ArkUI 原生能力，增加企业级约束与扩展点

### 分层结构

1. **Design Tokens**：集中定义颜色、字体、尺寸与动效，输出 JSON 与 CSS 变量。
2. **ArkUI Primitives**：基于官方组件，注入 LoongArk Token，覆盖默认样式。
3. **LoongArk Kit**：面向业务的复合组件与模式库，可同时在 Vue/React/Svelte 中消费。

### 主题产出

- `@loongark/tokens/*.json`：供构建工具或设计平台读取。
- `@loongark/theme/base.css`：注册全局 CSS 变量，支持光暗主题切换。
- `createLoongArkTheme()`：运行时注入主题的工厂方法，可在 SSR/SPA 中复用。

```ts
import { createLoongArkTheme } from "@loongark/theme";

const theme = createLoongArkTheme({
  mode: "light",
  brand: "shaloong",
  accent: "#006EFF",
});

theme.mount();
```

## 跨框架集成指引

### Vue

- 在 `main.ts` 中引入 `@loongark/theme/base.css`。
- 使用 `defineCustomElement` 或插件形式注册封装后的 ArkUI 组件。

### React

- 通过 `@loongark/react` 导入对应 Hooks/组件。
- 使用 `ThemeProvider` 包裹应用，支持运行时切换主题。

### Svelte

- 在 `+layout.svelte` 或入口脚本加载基础样式。
- 使用 Svelte Action 与 Store 同步主题状态，避免重复样式声明。

## Tokens 命名规范

| 分组 | 示例                   | 说明                                      |
| ---- | ---------------------- | ----------------------------------------- |
| 色彩 | `color.brand.primary`  | 映射 ArkUI `colorPalette`，便于替换品牌色 |
| 字体 | `font.heading.lg`      | 包含字号、行高与字重                      |
| 间距 | `space.component.sm`   | 控制组件级内外边距                        |
| 动效 | `motion.ease.standard` | 统一过渡与动画曲线                        |

> 命名遵循 `类别.语义.层级`，确保跨框架可推断。

## 组件样式统一流程

1. 设计端变更 Token → 通过 CI 输出 JSON 与 CSS。
2. ArkUI 封装层消费最新 Token，并生成 Tailwind/Sass 变量。
3. 各框架库仅发布逻辑壳，样式引用 `@loongark/theme`，避免分叉。
4. 发布前执行自动化对比度与可访问性测试，确保基线一致。

## 最佳实践

1. 使用语义化颜色与尺寸变量，禁止硬编码。
2. 所有组件默认支持明/暗主题切换。
3. 对交互密集组件提供动画与可访问性 fallback。
4. 通过 Storybook/Playwright 持续回归样式与交互。

## 通用视觉与交互规范

### 尺寸与圆角
- 组件统一使用 Tokens 的圆角：`radius.sm / radius.md / radius.lg`，默认映射：
  - `sm`：小尺寸，如标签/小按钮/小表单控件
  - `md`：默认尺寸（推荐默认使用）
  - `lg`：大尺寸，如主按钮、较大输入/选择器
- 若需要 Pill/全圆角（如 Switch、Tag），优先使用 `radius.pill`。

### 交互状态（默认/悬停/聚焦/禁用）
- 描边/填充：统一使用 `color.neutral.border` → `color.neutral.borderHover` → 选中/聚焦使用品牌主色 `color.brand.primary`；成功/警告使用 `color.brand.accent` / `color.brand.warning`。
- 悬停（Hover）：
  - 背景：`color.neutral.surfaceRaised` 或在控件背景上提高 4-8% 亮度。
  - 边框：`color.neutral.borderHover`。
- 聚焦（Focus）：
  - 边框：`color.brand.primary`。
  - 阴影：如需外描边，使用 `color.brand.accent` 作为柔和的外环，透明度不高于 0.2，满足 4.5:1 对比度要求。
- 选中（Checked/Active）：
  - 背景/边框：`color.brand.primary`；Hover 时可降低 10-20% 亮度或使用 `color.brand.secondary` 作为更深的悬停态。
  - 成功/警告：分别使用 `color.brand.accent` / `color.brand.warning`。
- 禁用（Disabled）：
  - 背景：`color.neutral.100`；文字：`color.neutral.300`；边框：`color.neutral.200`；整体透明度 ≤ 0.85，禁用态不应出现强对比描边或动画。

### 阴影与描边
- 默认阴影：表层/卡片/下拉菜单建议使用 `shadow` token（如 `0 8px 40px rgba(0,0,0,0.08)`）；轻量弹层可使用更小尺寸阴影，不要硬编码。
- 外描边（Focus Ring）：优先使用品牌色 `color.brand.primary`（或 `accent` 作为柔和外环），避免多层高对比阴影。

### 图标与指示
- 选中状态的指示符（勾/多选框/选项选中标记）默认应隐藏，只有在 `checked/indeterminate` 时显示；尺寸建议控制在容器的 40%-60%，描边宽度保持轻量（如 1.2-1.6）。
- 图标颜色应跟随文本/前景色 `currentColor`，避免硬编码色值。

### 对比度与可访问性
- 任意文本与背景对比度 ≥ 4.5:1；对比度不足时优先提升前景/背景亮度，避免仅依赖描边或阴影。
- 悬停/选中/禁用态仍需满足可访问性，禁用态不应出现高饱和度描边。

### 参考最佳实践
- 参考优秀 UI 库（Ant Design、shadcn/ui）与系统（Apple Human Interface、JetBrains IDE）的一致性：
  - 状态颜色递进：默认 → 悬停 → 选中/激活 → 禁用，尽量保持同一色系的明度/饱和度变化。
  - 圆角与间距随尺寸递进，避免同一尺寸的不同组件出现截然不同的圆角。
  - 阴影层级与密度与组件层级匹配：基础面板 < 下拉/Popover < 模态。

> 上述规范用于指导新增或修改组件时的视觉基线，所有样式应通过 tokens/theme 获取，不得硬编码色值或尺寸。
