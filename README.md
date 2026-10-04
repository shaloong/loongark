# LoongArk

基于 Ark UI 的 React、Vue、Solid、Svelte 组件库。四端共享组件行为、Shaloong VI 语义 Token 和中性视觉规范。

[在线组件展示](https://shaloong.github.io/loongark/) · [Pages 部署状态](https://github.com/shaloong/loongark/actions/workflows/storybook-pages.yml) · [MIT License](LICENSE)

在线展示使用 Storybook：可以直接浏览示例、操作控件、切换主题和查看 Props，无需克隆仓库。首次开通状态见部署工作流；展示自动跟随 develop，属于开发预览。

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

当前组件目录覆盖 114 个组件族、292 个 Story，React/Vue/Solid/Svelte 各 789 个公开值入口；Ark UI 独有部件和 Hook 的安装版本对照已补齐。高级场景仍逐批验收，范围与限制见 [Ark UI 核对](docs/ark-ui-coverage.md)。

代码采用 [MIT License](LICENSE)。发布包包含相同许可；第三方依赖保留各自许可证。
