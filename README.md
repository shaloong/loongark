# LoongArk

基于 Ark UI 的 React、Vue、Solid、Svelte 组件库。四端共享交互模型、设计 Token 与样式，框架适配保留各自的事件、绑定和生命周期。采用 [MIT License](LICENSE)。

[在线 Storybook](https://shaloong.github.io/loongark/) · [使用文档](docs/README.md) · [组件目录](docs/component-coverage.md) · [参与开发](CONTRIBUTING.md) · [安全说明](SECURITY.md)

## 提供什么

- 常用组件：布局、按钮、输入、选择、导航、反馈、弹层、日期与表单组合。
- 高级组件：可编辑表格、代码与富文本编辑器、图表、问卷、消息滚动、二维虚拟网格和瀑布流。
- 统一视觉：默认中性色，Shaloong VI 用于强调；浅色、深色、高对比主题，共享 Lucide 图标与减弱动效策略。
- 框架参考：Storybook 可操作状态示例，Docs 展示同场景四端代码、API 类型及默认值来源。

develop 当前包含 119 个组件族、335 个 Story 和 779 个框架示例（含每个组件族的独立基础用法）。正式站点与稳定源码以 main 为准；开发功能不会自动进入正式展示。支持范围与使用边界见 [能力概览](docs/capabilities.md)。

## 接入

按应用框架选择 `@loongark/react`、`@loongark/vue`、`@loongark/solid` 或 `@loongark/svelte`。对应框架必须满足包声明的 peer 版本；当前安全版本要求见 [支持矩阵](docs/releases.md)。仓库包版本不代表已经发布到 npm，正式接入前请核对 registry 中的发布版本；仓库开发与打包验证使用 pnpm workspace。

在应用根挂载对应包的 `LoongArkProvider`。客户端 Provider 管理作用域主题、样式和生命周期，无需复制独立调色板。

### React

```tsx
import { LoongArkProvider, LoongArkButton } from '@loongark/react';

export function App() {
  return (
    <LoongArkProvider mode="light">
      <LoongArkButton onClick={() => console.log('保存')}>保存</LoongArkButton>
    </LoongArkProvider>
  );
}
```

### Vue

```vue
<script setup lang="ts">
import { LoongArkProvider, LoongArkButton } from '@loongark/vue';
const save = () => console.log('保存');
</script>

<template>
  <LoongArkProvider mode="light">
    <LoongArkButton @click="save">保存</LoongArkButton>
  </LoongArkProvider>
</template>
```

### Solid

```tsx
import { LoongArkProvider, LoongArkButton } from '@loongark/solid';

export function App() {
  return (
    <LoongArkProvider mode="light">
      <LoongArkButton onClick={() => console.log('保存')}>保存</LoongArkButton>
    </LoongArkProvider>
  );
}
```

### Svelte

```svelte
<script lang="ts">
  import { LoongArkProvider, LoongArkButton } from '@loongark/svelte';
</script>

<LoongArkProvider mode="light">
  <LoongArkButton onclick={() => console.log('保存')}>保存</LoongArkButton>
</LoongArkProvider>
```

主题支持 `dark`、`high-contrast`，以及 `brand="vi"` 和 Token overrides。表单控件请按组件文档组合 Label、错误说明与隐藏原生控件；数据值的受控回写使用各框架的 API。更多完整场景见 [examples](examples/README.md) 与在线 Docs。

## SSR 与高级能力

框架包提供 SSR 入口，编辑器在客户端挂载时创建引擎。SSR 首屏样式由每次请求独立创建的主题生成，作用域 ID 与渲染树一致；具体接入见 [主题系统](docs/theme-system.md)。不要跨请求共享含用户数据的主题或组件状态。

代码与富文本编辑器可通过 `import('@loongark/<framework>/editors')` 延迟加载。富文本使用受支持的结构化 JSON，内建链接协议校验和 HTML 转义；它不是通用 HTML sanitizer。插件、nodeViews、自定义渲染器与任意 DOM Props 属于可信应用代码。

数据获取、身份认证、授权、上传、存储和业务校验由应用服务实现。本库用于浏览器及服务端渲染，不是服务后端的权限或输入验证框架。禁用按钮、隐藏字段和客户端校验不能替代服务端授权。

## 本地开发

使用 [.nvmrc](.nvmrc) 指定的 Node.js 和 `package.json` 声明的 pnpm 10.14.0：

```sh
git clone --branch develop https://github.com/shaloong/loongark.git
cd loongark
corepack enable
corepack prepare pnpm@10.14.0 --activate
pnpm install --frozen-lockfile
pnpm verify
pnpm storybook
```

日常开发、提交和推送进入 develop；main 是默认与稳定分支，发布通过 develop → main PR。正式 Pages 只部署 main，develop 构建作为有期限的 Actions 预览；部署、版本标签与 npm 发布流程见 [发布指南](docs/releases.md)。

## 仓库结构

| 目录 | 职责 |
| --- | --- |
| `packages/tokens`、`theme` | VI、语义 Token、主题作用域和样式生命周期 |
| `packages/primitives`、`kit` | 共享外观、数据模型与行为 |
| `packages/react`、`vue`、`solid`、`svelte` | 框架渲染、绑定、类型和生命周期 |
| `packages/cli` | CSS/JSON Token 提取与校验 |
| `examples`、`stories` | 四端参考代码与交互展示，也是自动验证输入 |
| `tests`、`scripts` | 消费、SSR、行为、视觉、安全和打包验证 |
| `docs` | 接入、API、支持边界与维护说明 |

验证顺序见 [CONTRIBUTING.md](CONTRIBUTING.md)。过程截图、日志、报告和压缩包只保存到忽略目录 `.artifacts/` 或 CI Artifact；仓库保留用于自动回归的已审阅视觉基线，Windows 与 Linux 分开维护。

真实 iOS/Android、实际屏幕阅读器和原生系统输入法尚未验收，模拟结果不代表这些平台通过。问题反馈请提供组件、框架/浏览器版本与最小复现；漏洞请按 [安全报告渠道](SECURITY.md) 私下提交。
