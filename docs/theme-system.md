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

React/Vue/Solid 使用 LoongArkProvider；Svelte 使用同名组件。四端均支持 mode、brand、accent、overrides、targetId、motionPreference、nonce，并为 SSR 使用稳定的作用域标识。Provider 选项变化会更新作用域主题，销毁时释放样式和浮层容器。

每个主题拥有变量样式和 Portal 容器；组件 CSS 按宿主共享并计数释放。多个主题或嵌套 Provider 可以并存。浮层应使用 LoongArkPortal 或对应的 LoongArkDialogPortal/SheetPortal，保留所在主题的变量。Ark 原生 Portal 若直接传送到 body，可能失去局部主题。

Provider 的作用域容器使用 `display: contents`，保留宿主布局；它不会绘制应用页面背景。应用需在实际页面容器同时设置 `background: var(--lk-color-semantic-background)` 与 `color: var(--lk-color-semantic-foreground)`，特别是深色主题。只继承深色文字色、仍使用浏览器白色背景会造成低对比。

### 严格 CSP 与 nonce

四端 Provider 和 `createLoongArkTheme` 支持可选 `nonce`，用于库生成的变量、Primitives 和 Kit 样式表。宿主按 HTTP 请求生成随机 nonce，在 CSP 的 `style-src-elem` 中允许该值，并向同一文档的所有 Provider 传入同一个值；nonce 在 style 插入 DOM 前设置，主题更新继续保留。SSR 输出的 style 标签也由宿主设置相同 nonce，CSS 字符串本身不包含该属性。

nonce 不授权 style 属性、第三方编辑器或调用方自建的 style。应用需分别配置 `style-src-attr`；CodeMirror 扩展可通过 `EditorView.cspNonce.of(nonce)` 配置其引擎样式，其他插件按自身契约处理。这不是对所有严格 CSP 策略的兼容承诺。

### 按需样式

默认 `LoongArkProvider` 随实际组件入口自动加载 Primitives 样式及 HTML 组合的必要依赖，根入口命名导入和组件子路径均可使用；公开别名与 Svelte 的 Dialog、PinInput、Switch 组合 namespace 同样声明其组件样式。动态导入会在组件首次渲染前同步补齐样式，固定级联顺序，多个 Provider 共享规则并在最后一个所有者卸载后释放；Vue 插件和 Svelte theme store 使用同一自动启动器。

自动裁剪依赖生产构建消除未使用模块与组件初始化声明。导入并使用完整根命名空间会保留更多组件；Node 直接执行根入口也不会像生产打包器一样裁剪模块。自定义 DOM 只有 `data-scope` 属性不会自动声明样式，需提供自己的样式，或显式使用 `@shaloong/loongark-kit/bootstrap` 的 `bootstrapKit` 作为 `styleBootstrap` 保留原完整样式行为。已有 Primitives 注册覆盖与 Kit 注册扩展继续生效。

需要完全控制规则集合时，可从 `@shaloong/loongark-<framework>/provider-core` 引入 `LoongArkProviderCore`，只加载通用语义、焦点和动效，再显式选择实际使用的 Primitives。以下示例中的 `react` 可替换为 `vue`、`solid` 或 `svelte`：

应用需显式安装 `@shaloong/loongark-<framework>` 与 `@shaloong/loongark-primitives`；pnpm 不保证应用可以直接导入传递依赖。

```ts
import { LoongArkProviderCore } from "@shaloong/loongark-react/provider-core";
import { createPrimitiveStyleBootstrap } from "@shaloong/loongark-primitives/styles";
import { buttonPrimitive } from "@shaloong/loongark-primitives/button";

// 在模块作用域创建，保持引用稳定；所有用到的部件样式都需选择。
const styleBootstrap = createPrimitiveStyleBootstrap([buttonPrimitive]);
```

React/Solid 使用 `<LoongArkProviderCore styleBootstrap={styleBootstrap}>`；Vue 模板使用 `:style-bootstrap="styleBootstrap"`，render 函数传入 `{ styleBootstrap }`；Svelte 使用 `<LoongArkProviderCore {styleBootstrap}>`。四端完整代码见 `examples/<framework>/CoreProviderExample`。动态更新启动器会替换作用域主题，重复选择去重并保持默认注册顺序。

Core 不会自动补齐未选择的组件样式。高级组合通常使用默认自动 Provider；Core 需提供应用自己的 `styleBootstrap(theme)` 补齐相应规则。Core 不订阅自动组件样式，也不自动引入完整 Kit 注册表。

显式 Core 的 SSR 在每个请求中创建主题，并调用同一个启动器，再序列化 `theme.toStyleSheet()`。自动 SSR 使用 `@shaloong/loongark-kit/automatic-bootstrap` 的 `bootstrapKitAutomatic`，在实际渲染之后序列化，以包含 Svelte 实例声明的样式；进程中已经导入的其他组件也可能贡献规则，不能把客户端包体测量当作所有 SSR 模式的裁剪保证。nonce、targetId 与主题选项仍需与客户端一致。Next.js 中选择样式的 Provider 组合放在应用的客户端模块，启动器函数不能作为服务端到客户端的 Props；服务端可以单独用纯 Primitives 启动器生成首屏 CSS。

底层 API：

```ts
import { createLoongArkTheme } from "@shaloong/loongark-theme";
import { bootstrapKit } from "@shaloong/loongark-kit/bootstrap";
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

React 的 Provider、命名组件及 hooks 所在运行时模块内置 `use client` 边界。Next.js App Router 的服务端页面可直接导入 `LoongArkProvider`、`LoongArkButton` 等命名组件，根入口与按需子路径均支持。需要 hooks、事件处理器、Ark 集合工厂或访问 `LoongArkDialog.Root` 等客户端命名空间对象时，将应用模块标为 `use client`；不要从服务端向客户端传递函数、集合实例或主题实例。`parseLocalizedDate` 等共享纯工具仍可在服务端调用。RSC 不代替首屏 CSS 的按请求生成与作用域匹配。

## 表单与浮层

InputRoot 基于 Ark Field。Label 关联控件，ErrorText 自动关联错误，Group 包裹 Prefix/Control/Suffix；不要将可点击 Suffix 放在另一个 button 中。Switch/Checkbox/Select 在表单场景组合 HiddenInput/HiddenSelect。Dialog 关闭时隐藏于可访问树，打开后锁定焦点，Escape 关闭并恢复到触发器。

代码等宽字体默认使用 CSS 通用 `monospace`，遵循浏览器/系统的等宽字体设置。Linux WebKit 对包含不可用平台字体的旧列表可能回退为比例字形；验收实际测量 `iiii` 与 `WWWW` 的等宽，而不只检查 font-family 文本。调用方仍可覆盖 `typography.fontFamily.mono`，应验证目标平台的字形回退。

ColorPicker 的面积/通道滑块与选中色块使用固定 `color.white` / `color.vi.inkNight` 双色轮廓，避免深色主题表面色与任意选色混合。键盘焦点保留独立语义环及明暗外圈；面积允许边缘拇指和焦点完整绘制，渐变背景保持圆角。高对比主题使用相同轮廓，系统强制颜色模式改用 CanvasText / Canvas / Highlight。自定义覆盖这些 Token 时应重新验证选色与焦点对比；Axe 不会自动验收渐变上的非文本标记。
