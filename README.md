# LoongArk

基于 Ark UI 的 React、Vue、Solid、Svelte 组件库。四端共享组件行为、Shaloong VI 语义 Token 和中性视觉规范。

- `develop`：日常开发与云端任务，频繁提交和推送。
- `main`：稳定版本，通过发布 PR 不定期更新。
- 提交使用 Conventional Commits。

## 开始开发

按 [CONTRIBUTING.md](CONTRIBUTING.md) 配置 Node.js 24 和 pnpm 10.14.0，检出 `develop` 后运行：

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm storybook
```

[技术架构与验证](docs/README.md) · [组件覆盖](docs/component-coverage.md) · [开发约定](AGENTS.md)

当前组件目录覆盖 114 个组件族、283 个 Story，React/Vue/Solid/Svelte 各 789 个公开值入口；Ark UI 独有部件和 Hook 的安装版本对照已补齐。高级场景仍逐批验收，范围与限制见 [Ark UI 核对](docs/ark-ui-coverage.md)。
