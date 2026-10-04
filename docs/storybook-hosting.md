# Storybook 展示与公开范围

Storybook 构建输出 `storybook-static/`，直接部署到 GitHub Pages，无需另做展示站。仓库已选择 MIT 许可并核验为 public，根目录与9个发布包包含 LICENSE。展示使用 `.github/workflows/storybook-pages.yml`，站点目标地址为 [shaloong.github.io/loongark](https://shaloong.github.io/loongark/)；首次开通与实际上线状态见 [工作流](https://github.com/shaloong/loongark/actions/workflows/storybook-pages.yml)。

每次 develop 推送及手动触发时，冻结安装依赖，验证构建/契约/覆盖/发布/SSR/Svelte，构建 Storybook，再在真实 `/loongark/` 子路径检查首页、iframe、手机明暗场景、键盘交互与资源加载。构建或验证失败不会进入部署。只上传 `storybook-static/`；过程截图和日志留在 Actions，烟雾验收 Artifact 保留14天，不进源码分支。

工作流使用官方 `configure-pages` 开通 workflow 类型的 Pages。若账号/组织权限阻止开通，在 Settings → Pages 将 Source 设为 GitHub Actions 后重新运行工作流；github-pages 环境需允许 develop 部署。云端管理 API 目前被网络策略阻止，连接器可提交代码和查看 Actions，但没有仓库可见性/Pages 管理写接口，不能把配置完成说成已上线。

## 平台选择

| 平台         | 适用场景                                     | 需要确认的限制                                                                                                                            |
| ------------ | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| GitHub Pages | 公开组件库的稳定文档和 Storybook，优先选择   | GitHub Free 通常支持公开仓库；私有仓库 Pages 依赖账号套餐。私有源码不表示展示站点也私有。项目站点要核对 `/loongark/` 子路径下资源和导航。 |
| Vercel       | 分支和 PR 预览、自定义域名、快速产品体验迭代 | Hobby 通常限个人非商业用途；组织/商业项目不要默认把 Hobby 当免费生产方案。预览访问控制、Git 组织集成及额度须按实际套餐确认。              |

以上套餐信息为通常规则；2026-10-04 当前云端网络无法访问官方文档，不能声称已核实当天条款或当前账号权益。开通前核对 [Pages 条件](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages) 与 [Vercel Hobby](https://vercel.com/docs/plans/hobby)。

部署准备按仓库验证顺序完成，再执行 `pnpm storybook:build`。仅发布 `storybook-static/`，不发布审查归档、运行日志或测试报告。GitHub Pages 可由 Actions 上传静态产物，Pages 构建不需要把产物提交到 `gh-pages`；部署需核验首页、iframe、资源、子路径和手机明暗场景。Vercel 需要先构建工作区共享包，再构建 Storybook；使用 Node 24、pnpm 10.14.0 和冻结锁文件安装。

初期可明确把 develop 展示标记为开发预览；稳定文档在用户明确发布并完成 develop → main 后跟随 main。部署 develop 预览不等于发布 npm 或合并 main。

## 是否公开

用户已授权采用 MIT 并公开仓库；当前 GitHub 返回 public。历史文本与ZIP内文本已执行基础凭据模式检查，未发现匹配项；这不等同于完整安全或权属审查。第三方依赖继续遵守各自许可。公开源码、部署 Storybook 和发布 npm 是三个独立动作，本批不发布 npm。

根 `package.json` 的 `private: true` 用于防止将工作区根包误发到 npm，不代表 GitHub 仓库 private。后续稳定发布仍遵守 develop → main PR；Pages 当前跟随 develop 的开发预览不自动更新 main。
