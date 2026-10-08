# LoongArk 主题与视觉规范

## 默认视觉

默认使用中性语义色，参考 shadcn 默认组件的边框、控件密度、圆角、层次和留白。浅色以白色表面与深色文字为主；深色以 Ink Night 表面与浅色文字为主；高对比模式使用独立边框与文字配置。

固定 VI 不随模式改变：Sky Blue #006EFF、Deep Blue #0A3565、Dawn Blue #5AC8FA、Coral #F58220、Cloud White #F2F2F2、Lead Gray #767680、Stone Gray #3A3A3C、Ink Night #121212。VI 与交互语义分开：错误使用 destructive，成功使用 success，不能用 Coral 替代错误色。

brand: neutral 为默认，brand: vi 或 shaloong 为品牌预设；VI 按钮的语义蓝使用 #005EDB，以保留白字对比度，基础 Sky Blue 保持原值。自定义十六进制品牌色会在黑字和白字之间选择对比度较高者。复杂 CSS 颜色或 CSS 变量应通过 overrides 同时指定 primaryForeground。

## Token 约定

- 颜色：color.vi 固定资源、color.brand 品牌、color.semantic 界面角色。不要在组件内写入品牌或模式色值。
- 尺寸：control.height 为 xs 28 / sm 32 / md 36 / lg 40px，icon 为 14 / 16 / 18px，焦点环 2px，边框 1px。
- 排版：typography.fontSize/fontWeight/fontFamily/lineHeight；布局间距使用 space.component 与 space.layout。
- 样式生成使用 theme.styleTokens；原始数值读取、设计工具和 JSON 输出使用 theme.tokens。
- CSS 变量均使用 --lk-*。check-css-variables 检查共享样式引用，Primitive contract.tokens 用真实路径声明依赖。
- SVG 数据坐标与计算几何属于图表模型；组件外观通过语义颜色与尺寸 Token 设置。

## 使用方式

React/Vue/Solid 使用 LoongArkProvider；Svelte 使用同名组件。四端均支持 mode、brand、accent、overrides、targetId、motionPreference，并为 SSR 使用稳定的作用域标识。Provider 选项变化会更新作用域主题，销毁时释放样式和浮层容器。

每个主题拥有变量样式和 Portal 容器；组件 CSS 按宿主共享并计数释放。多个主题或嵌套 Provider 可以并存。浮层应使用 LoongArkPortal 或对应的 LoongArkDialogPortal/SheetPortal，保留所在主题的变量。Ark 原生 Portal 若直接传送到 body，可能失去局部主题。

底层 API：

```ts
import { createLoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";
const theme = createLoongArkTheme({ mode: "dark" });
theme.mount(document.querySelector<HTMLElement>("#app")!);
bootstrapKit(theme);
theme.addOverride({
  color: { semantic: { primary: "#005EDB", primaryForeground: "#FFFFFF" } },
});
// 卸载页面时
theme.unmount();
```

mount 支持 Document、HTMLElement、ShadowRoot；CSS 变量随作用域注入，ShadowRoot 使用 :host。组件 CSS 不依赖生成时的具体主题值，保证并存主题不会覆盖彼此。

## SSR 与动效

没有 DOM 时创建主题并调用 bootstrapKit，然后将 theme.toStyleSheet() 放入服务端 HTML 的 style 标签，首屏即可获得 Token 和组件样式；snapshot() 返回 CLI 的 CSS/JSON 产物。多个独立主题应使用对应作用域的样式与稳定 targetId，避免使用全局 :root 互相覆盖。

motionPreference 默认为 auto，遵循 prefers-reduced-motion；force 供明确需要动效的场景使用。焦点环、invalid、disabled 状态不依赖动画表达。

## 表单与浮层

InputRoot 基于 Ark Field。Label 关联控件，ErrorText 自动关联错误，Group 包裹 Prefix/Control/Suffix；不要将可点击 Suffix 放在另一个 button 中。Switch/Checkbox/Select 在表单场景组合 HiddenInput/HiddenSelect。Dialog 关闭时隐藏于可访问树，打开后锁定焦点，Escape 关闭并恢复到触发器。

代码等宽字体默认使用 CSS 通用 `monospace`，遵循浏览器/系统的等宽字体设置。Linux WebKit 对包含不可用平台字体的旧列表可能回退为比例字形；验收实际测量 `iiii` 与 `WWWW` 的等宽，而不只检查 font-family 文本。调用方仍可覆盖 `typography.fontFamily.mono`，应验证目标平台的字形回退。
