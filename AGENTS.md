# LoongArk 仓库约定

## 分支与提交

- 所有日常开发和云端开发以 `develop` 为目标分支。开始修改前确认当前分支；若停在 `main`，先切换到 `develop`，保留工作区已有改动。
- `develop` 是频繁提交、持续集成的开发主线。`main` 保留稳定版本，仅在合适的发布节点从 `develop` 合并更新。
- 不直接在 `main` 开发，不自动将每次开发提交合入 `main`。用户明确要求发布时，先完成验证，再通过 `develop → main` 的 PR 合并。
- 提交使用 Conventional Commits：`type(scope): summary`。提交应有明确目的；禁止强推、改写共享历史或丢弃他人的改动。
- 云端检出 `develop`；具体环境、命令和发布流程见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 实现与验证

- 遵循 [.github/copilot-instructions.md](.github/copilot-instructions.md) 的架构、Token、原生语义和四端一致性要求。
- 对话、注释与文档使用中文；公共 API 名称保留原文。
- 功能变更同步四端适配、示例、Story、覆盖清单和相关回归；只运行有意义的检查，不消费构建失败后的旧产物。
- 纯文档与环境元数据变更运行 `pnpm lint` 和相应配置检查。功能变更按 CONTRIBUTING 中的验证顺序执行。
- 不提交依赖目录、dist、构建缓存、Storybook 产物或临时测试结果。验收截图、联系表、逐 Story 测量、日志及其压缩包留在 `.artifacts/` 或 CI Artifact；仓库只保留简短验收摘要及 `tests/*-snapshots/` 中实际用于回归的已审阅基线。不得把压缩包当作绕过此规则的方式，见 [验收保存约定](docs/audits/README.md)。
