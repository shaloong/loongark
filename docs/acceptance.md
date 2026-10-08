# 当前验收索引

用于判断当前结果；逐次日志、测量和截图不进 Git，放在忽略目录或14天 CI Artifact。摘要记录实际源码、环境、通过/跳过/失败和限制。历史失败保留为当时结果，不解释成当前缺口，也不改写为通过。

| 批次 | 结果与范围 | 权威摘要 |
| --- | --- | --- |
| P0 跨浏览器与默认视觉 |119族默认布局、焦点、明暗窄屏、四端与原生 Safari；Linux/Windows 基线独立 | [2026-10-08 P0](audits/2026-10-08/p0-browser-and-default-visual/acceptance.json) |
| P1 高级边界与辅助使用 |组合事务、连续导航、受控/异步边界、文本放大、强制颜色、语义及模拟手机布局 | [2026-10-08 P1](audits/2026-10-08/p1-advanced-and-accessibility/acceptance.json) |
| P1 文档 / P2 性能与发布准备 / 补充视觉 |四端同场景代码、API、当前能力与限制、真实性能和包消费、cursor/hover/箭头留白 | [当前批次](audits/2026-10-08/p1-p2-readiness/acceptance.json) |

真实屏幕阅读器与真实 iOS/Android 已按用户要求跳过；模拟不替代真实设备。当前批次的远程 CI 和原生 Safari 只有对应提交任务成功才计入通过，不沿用旧提交结果。

当前选型信息见 [能力概览](capabilities.md)，支持范围见 [版本与发布](releases.md)，历史架构/迭代正文见 [历史索引](history.md) 和 [保存约定](audits/README.md)。
