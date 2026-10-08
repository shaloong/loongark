# LoongArk

基于 Ark UI 的 React、Vue、Solid、Svelte 组件库。四端共享组件行为、Shaloong VI 语义 Token 和中性视觉规范，采用 [MIT License](LICENSE)。

[在线组件展示](https://shaloong.github.io/loongark/) · [Pages 部署状态](https://github.com/shaloong/loongark/actions/workflows/storybook-pages.yml) · [当前能力与限制](docs/capabilities.md)

Storybook 支持直接操作组件、切换主题及查看代码，无需克隆仓库。当前 develop 的 Docs 提供119个组件族、335个 Story、166组同场景四端代码、API 类型与默认值来源；四端各794个公开值入口，共315个框架示例。正式展示的功能以 main 中已发布内容为准。

## 分支与展示

- main 是默认分支和稳定版本，正式 Pages 只部署 main。
- develop 用于日常开发，构建产物作为 Actions 临时预览保留14天。
- 稳定发布通过 develop → main PR；开发提交不自动合入 main、不自动发布 npm。

## 开始开发

使用 Node.js24 和 pnpm10.14.0，在 develop 执行：

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm storybook
```

配置、验证顺序与提交规则见 [CONTRIBUTING.md](CONTRIBUTING.md) 和 [AGENTS.md](AGENTS.md)。图标统一使用 Lucide，默认黑白灰，品牌色用于显式强调。

## 接入与验证

[文档入口](docs/README.md) · [组件覆盖](docs/component-coverage.md) · [当前验收](docs/acceptance.md) · [版本与发布](docs/releases.md) · [迁移说明](docs/migration.md) · [变更日志](CHANGELOG.md)

高级能力包括表格编辑与查询、独立代码/富文本编辑器、图表、问卷、异步集合和多维虚拟化。四端可通过 `@loongark/<framework>/editors` 延迟加载编辑器；数据存储、权限、上传和业务请求由应用负责。

真实手机、真实屏幕阅读器和原生系统输入法验收已按维护者决定跳过；模拟范围与当前提交的浏览器结果见验收摘要。历史逐批记录移至 [历史索引](docs/history.md)，过程截图和日志仅保存为临时 Artifact。
