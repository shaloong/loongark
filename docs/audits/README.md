# 验收证据保存约定

仓库只保留简短的 `acceptance.json`、验收说明与必要的视觉回归基线。默认临时证据输出到 `.artifacts/audits/<平台>/`；指定 `DESIGN_AUDIT_DIR` 可以选择本地或 CI 工作目录。截图、联系表、逐 Story 测量、日志、录像、trace 和压缩包不提交到 Git，`pnpm lint` 检查受版本管理的验收文件。

`tests/*-snapshots/` 是用于比较的已审阅基线，继续进入版本管理。实际结果图、差异图和失败截图属于临时证据。Linux 与 Windows 基线独立；不得通过批量更新基线掩盖回归。

CI 使用 GitHub Actions Artifact 保存原始证据，建议保留 14–30 天，上传失败证据使用 `if: always()`，但上传结果不能把失败测试变成通过。摘要记录提交、环境、验证命令、结果、限制和实际 Artifact 链接；没有执行或没有上传时必须明确写出，不编造链接。需长期保留的发布验收可以单独导出到团队存储，不把全部过程文件塞回源码。

历史过程文件来自 [清理前提交 c6e0d14](https://github.com/shaloong/loongark/tree/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits)。本次移出前逐文件 SHA-256 核对本地归档；历史摘要中的相对证据路径指向该历史提交，新增 `evidenceStorage` 说明其位置。未改写 Git 历史，因此这次精简当前目录不会立即缩小完整克隆的历史体积。
