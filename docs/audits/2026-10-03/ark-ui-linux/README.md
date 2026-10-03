# Ark UI Linux 专项验收

覆盖与限制以 [acceptance.json](acceptance.json) 为准，依赖安装及每项检查保存在 logs。全量浅深色默认 Story 的自动测量与 WCAG 结果分别在 after 与 accessibility；原始全量截图归档为 after/light-screenshots.tar.gz 和 after/dark-screenshots.tar.gz。

四端裁剪、JSON、辅助组件、高级选择在 1280px / 375px、浅色 / 深色下分别抓取，共 64 张原图归档为 frameworks-screenshots.tar.gz。16 张四端对照图为 *-parity.jpg；[精确像素对照](framework-parity.json)记录文本分隔符和原生箭头的细微差异，不把布局一致描述成完全逐像素相同。独立 Story 的 16 张人工检查原图保留在 review，各模式与宽度的联图为 stories-*.jpg。

首次候选在 candidates-before-fit-screenshots.tar.gz，响应式裁剪调整前的手工截图在 manual-before-responsive-crop.tar.gz。人工检查发现并修正了图片顶对齐、手机裁剪框越界、粗白条手柄、分页按钮高度差异和 JSON 错误焦点框。最终 Linux 基线单独存放在 tests/ark-additions.visual.spec.ts-snapshots；[基线联图](linux-baselines-reviewed.jpg)用于人工核验。Playwright 的 missing 模式生成缺失图后返回失败，这次生成不计为通过；后续正常比较日志才是通过证据。既有 Windows 与 Linux 基线没有更新。

Ark 对照见 [组件核对](../../../ark-ui-coverage.md)，已发布包和官方 main 源目录分别记录。四端原生 Hook/部件的类型与 Props 仍由 Ark 保持；“可用”与“全部高级场景已验收”分别说明。

其它自动化生成的运行状态截图在 runtime-screenshots.tar.gz，归档内保留原目录名称；JSON 指标与行为日志仍以独立文本保存。
