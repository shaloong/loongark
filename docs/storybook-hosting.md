# Storybook 部署

Storybook 是静态站点，可使用 GitHub Pages，无需另建展示应用。正式站点位于 [shaloong.github.io/loongark](https://shaloong.github.io/loongark/)，部署产物不提交到源码分支。

## main 与 develop

`.github/workflows/storybook-pages.yml` 对 main/develop 冻结安装并构建共享包、Storybook，验证覆盖、发布入口、SSR、Svelte 和 `/loongark/` 子路径的资源与交互。失败时不部署。

- main 上传并部署 GitHub Pages；deploy 任务只获得 Pages 写入和身份令牌权限。
- develop 保存14天 `storybook-development-preview` Artifact，不覆盖正式站点。下载解压后运行 `node scripts/serve-static.mjs <目录> 6006` 查看。
- 手动触发遵守相同分支限制；稳定更新通过 develop → main PR。

GitHub Settings → Pages 的 Source 应为 GitHub Actions，环境分支限制应只允许 main。CI 上传后核对线上首页、iframe 和 Story 索引。本地 smoke 检查不等同于线上发布成功。

## 公开与托管

仓库采用 MIT 并公开；工作区根 `package.json` 的 `private: true` 只防止误发布根包，不表示 GitHub 仓库私有。部署前确保示例与静态文件不含真实凭据或个人数据。

Vercel 可用于独立 PR 预览，但组织/商业用途需要核对套餐条款，不默认使用 Hobby。相关平台规则见 [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) 与 [Vercel Hobby](https://vercel.com/docs/plans/hobby)。当前稳定展示使用 Pages。
