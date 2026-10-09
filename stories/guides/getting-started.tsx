import React, { useState } from "react";
import { Source } from "@storybook/addon-docs/blocks";
import { LoongArkButton, LoongArkProvider } from "@loongark/react";

const examples = {
  react: `// App.tsx（React 18+）
import { useState } from "react";
import { LoongArkProvider } from "@loongark/react/provider";
import { LoongArkButton } from "@loongark/react/button";
export default function App() {
  const [count, setCount] = useState(0);
  return <LoongArkProvider mode="light">
    <LoongArkButton onClick={() => setCount(count + 1)}>已点击 {count} 次</LoongArkButton>
  </LoongArkProvider>;
}`,
  vue: `// App.ts（Vue 3.5.43+；也可在 .vue 中使用相同组件）
import { defineComponent, h, ref } from "vue";
import { LoongArkProvider } from "@loongark/vue/provider";
import { LoongArkButton } from "@loongark/vue/button";
export default defineComponent({ setup() {
  const count = ref(0);
  return () => h(LoongArkProvider, { mode: "light" }, () =>
    h(LoongArkButton, { onClick: () => count.value++ }, () => '已点击 ' + count.value + ' 次'));
}});`,
  solid: `// App.tsx（Solid 1.9.17+；应用使用 vite-plugin-solid）
import { createSignal } from "solid-js";
import { LoongArkProvider } from "@loongark/solid/provider";
import { LoongArkButton } from "@loongark/solid/button";
export default function App() {
  const [count, setCount] = createSignal(0);
  return <LoongArkProvider mode="light">
    <LoongArkButton onClick={() => setCount(value => value + 1)}>已点击 {count()} 次</LoongArkButton>
  </LoongArkProvider>;
}`,
  svelte: `<!-- App.svelte（Svelte 5.57.2+；应用使用 SvelteKit 或官方 Vite 插件） -->
<script lang="ts">
  import { LoongArkProvider } from "@loongark/svelte/provider";
  import { LoongArkButton } from "@loongark/svelte/button";
  let count = $state(0);
</script>
<LoongArkProvider mode="light">
  <LoongArkButton onclick={() => count++}>已点击 {count} 次</LoongArkButton>
</LoongArkProvider>`,
};
export function GettingStarted() {
  const [framework, setFramework] = useState<keyof typeof examples>("react");
  const [count, setCount] = useState(0);
  const [mode, setMode] = useState<"light" | "dark" | "high-contrast">("light");
  return <LoongArkProvider mode={mode}><div className="loongark-reference" data-getting-started style={{background:"var(--lk-color-semantic-background)", color:"var(--lk-color-semantic-foreground)"}}>
    <h1>快速开始</h1>
    <p>选择框架，复制安装命令和最小示例。Provider 在应用根部配置主题并自动注入共享样式，无需额外引入 CSS 或手动组装 Token。</p>
    <p>以下为首次发布后的安装方式；包尚未发布时，请使用发布演练生成的 tarball，不要把 Storybook 可访问视为 npm 已发布。</p>
    <div role="group" aria-label="选择框架" style={{display:"flex", flexWrap:"wrap", gap:8}}>
      {Object.keys(examples).map(name => <LoongArkButton key={name} type="button" variant={framework === name ? "solid" : "outline"} aria-pressed={framework === name} onClick={() => setFramework(name as keyof typeof examples)}>{name}</LoongArkButton>)}
    </div>
    <div role="group" aria-label="预览主题" style={{display:"flex", flexWrap:"wrap", gap:8, marginTop:12}}>{(["light", "dark", "high-contrast"] as const).map(value => <LoongArkButton key={value} variant={mode === value ? "solid" : "outline"} aria-pressed={mode === value} onClick={() => setMode(value)}>{value}</LoongArkButton>)}</div>
    <h2>安装与最小应用</h2>
    <Source dark={mode === "dark"} code={`pnpm add @loongark/${framework}`} language="bash" />
    <p>宿主项目需安装对应框架。React 应用还需 react-dom；Solid、Svelte 使用对应的编译插件。LoongArk 的共享包由框架包自动安装。</p>
    <Source dark={mode === "dark"} code={examples[framework]} language={framework === "svelte" ? "html" : "tsx"} />
    <LoongArkButton aria-label="接入示例" onClick={() => setCount(value => value + 1)}>已点击 {count} 次</LoongArkButton>
    <h2>引入方式与主题</h2>
    <p>根入口支持具名导入与 ESM tree shaking；逐组件路径便于明确依赖。复合组件的 Root、Trigger、Content 等部件在同一个组件路径，不是每个部件一个路径。每个组件的 Docs 页提供其对应路径和四端示例。</p>
    <Source dark={mode === "dark"} code={`import { LoongArkProvider, LoongArkButton } from "@loongark/${framework}";\n// 同样支持：\nimport { LoongArkProvider } from "@loongark/${framework}/provider";\nimport { LoongArkButton } from "@loongark/${framework}/button";`} language="typescript" />
    <p>mode 默认 light，可选 dark、high-contrast；brand 默认中性，vi 启用 Shaloong 品牌强调。Provider 只保留一份共享样式，组件代码仍按需裁剪。系统主题由应用读取 prefers-color-scheme 后传入 mode；motionPreference 默认 auto，遵循减弱动效偏好。嵌套 Provider 可设置局部主题。</p>
    <h2>SSR 首屏与浮层</h2>
    <p>Provider 使用稳定的作用域 ID；Solid 的 node 条件自动选择服务端实现，Svelte 由宿主编译。服务端首屏 CSS 需要按请求创建主题并序列化，不要跨请求共享状态。将下面 CSS 放在 HTML head 的 style 元素中，Provider 使用相同 targetId 与主题选项；HTML 输出交给框架或模板的可信样式插入接口。React Server Components 场景把 Provider 和交互组件放在 use client 边界中；这与普通 SSR 渲染是不同的接入方式。</p>
    <Source dark={mode === "dark"} code={`import { createLoongArkTheme } from "@loongark/theme";\nimport { bootstrapKit } from "@loongark/kit/bootstrap";\nconst theme = createLoongArkTheme({ targetId: "app-theme", mode: "light" });\nbootstrapKit(theme);\nconst css = theme.toStyleSheet();\n// 对应根组件：<LoongArkProvider targetId="app-theme" mode="light">…</LoongArkProvider>`} language="typescript" />
    <p>Dialog 等浮层使用 LoongArkPortal 或对应组件的 Portal，保留局部主题。原生 Ark Portal 传送到 body 时可能失去作用域变量。严格 CSP 的 nonce 接入尚无统一契约，请验证应用策略。</p>
    <h2>编辑器与常见问题</h2>
    <Source dark={mode === "dark"} code={`const editors = await import("@loongark/${framework}/editors");\n// 在路由或客户端交互触发后渲染 editors.LoongArkCodeEditor。`} language="typescript" />
    <p>复杂编辑器在客户端挂载引擎；/editors 可延迟加载两个编辑器。不要在模块初始化时操作 DOM。样式缺失先检查 Provider；浮层颜色异常检查 Portal；SSR 水合检查 targetId 和首屏选项一致。Button 默认 type="button"；提交表单时显式设置 type="submit"。</p>
  </div></LoongArkProvider>;
}
