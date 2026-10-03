# DataTable 与 Typography：Linux 目视验收

DataTable 继续复用原生 Table 和共享模型，完善实际选择与更新行为；没有新增组件别名或第三方表格依赖。共享 CSS 归入 Primitives，通用标签与选择行为归入 Kit，框架负责渲染、绑定与挂载后清理。API 和边界见 [组件文档](../../../data-table.md)。

## 实际发现与修正

从前一批真实截图中提取 `before/`，另保留 `review-before-refinement/` 的本批初始截图。选择列曾被表格自动分配为短表宽度的约三分之一；现在限制为 48px，checkbox 为 16px，命中区域 32px。原生 header checkbox 提供当前页全选与 indeterminate/mixed 状态，空结果禁用；选中行、悬停、焦点使用既有中性 Token。

Typography 的 muted API 原先没有对应颜色，导致组合页介绍与标题同色。补上已有 mutedForeground 语义颜色，并增加独立 Story、四端计算颜色回归。没有改 VI 锚点、Token 或依赖。

375px 复核时发现窄容器的页码拆行，以及一次布局修正使 Previous/Next 分散到两行；最终移动端把摘要与按钮排成两行，两个翻页按钮保持同行。长单元格保留完整内容，表格区域局部横向滚动，可用键盘 ArrowRight，页面不横向溢出。Vue 示例的操作顺序与另外三端统一。

实际查看组合页桌面/手机浅深色截图、选中/混合状态与键盘焦点截图、Basic 桌面图，以及四端手机截图。最终四端手机图尺寸和像素一致，测量见 `regressions/data-table/parity.json`。全量默认 Story 的截图、375px 布局、动效和浅深色 Axe 测量另保存；并非每张自动截图都人工审阅。

## 行为与发布验证

真实发布产物的四端回归覆盖：父级拒绝受控选择时恢复 checkbox DOM、当前页混合/全选、跨页和过滤保留、外部清空、空结果、三态排序、删除排序列、动态删除行后清理无效 ID 且只通知一次、恢复数据不恢复旧选择或旧页码、键盘滚动、本地化标签。模型拒绝重复行 ID 与重复/空列 key；SSR 归一显示且不触发状态回调。

四端公开入口仍各 620 个；覆盖 102 族、262 Story 和 111 个框架示例。命令结果见 [acceptance.json](acceptance.json) 与 `logs/`，不引用失败构建后的旧产物。

新建四张 DataTable Linux 基线，在人工查看后初始化，并以普通比较模式再次执行。既有六张 Linux 基线和两张 Windows 基线不覆盖。自动截图以 tar.gz 归档，测量 JSON、人工审阅图和四端截图直接保留；归档内路径可通过 `tar -xzf` 恢复。

## 验证范围

系统 Chromium 151.0.7922.173、Playwright 1.57.0、Node 24.19.0、pnpm 10.14.0。固定 Chromium 下载受到环境网络策略阻止，不声称等同于 Playwright 固定浏览器或 Windows 字体像素。冻结锁文件安装，锁文件未改。

覆盖当前示例与专项分支，不穷举全部 props、peer 版本、Firefox/WebKit、真实移动设备或屏幕阅读器。DataTable 仍是客户端标量表格，不承诺服务端分页、虚拟化、列拖动或编辑单元格；业务加载与错误使用现有 Progress/Alert/Button 组合。下一批继续核验 Chart 的长标签、数值轴与多序列辨识问题。
