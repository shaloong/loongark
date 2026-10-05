# 高级能力持续补齐

本清单跟踪 2026-10-05 明确提出的通用组件缺口。组件族目录和 Ark 原生部件覆盖不表示这里的交互场景已全部完成。每项只有实际实现、四端适配及相应验收完成后才关闭；设备和浏览器环境限制独立记录。业务数据源、权限、领域规则和事务服务仍由调用方负责。

## 高级表格

- [x] 列拖动排序及键盘替代操作（[Linux 四端验收](audits/2026-10-05/data-table-columns-linux/acceptance.json)）
- [x] 交互式列宽调整及 RTL（同上）
- [x] 多列排序（[Linux 四端验收](audits/2026-10-05/data-table-query-linux/acceptance.json)）
- [x] 列级筛选（同上：文本、数值、选项、组合条件、错误草稿及服务端契约）
- [x] 分组与聚合（[Linux四端验收](audits/2026-10-05/data-table-structure-linux/acceptance.json)）
- [x] 树形行展开/收起（同上：稳定父ID、祖先筛选、根分页、焦点与纵向虚拟化）
- [x] 单元格范围选择与原子批量粘贴（[Linux四端验收](audits/2026-10-05/data-table-range-linux/acceptance.json)）
- [x] 有界多级撤销/重做与冲突保护（[Linux 四端验收](audits/2026-10-05/data-table-history-linux/acceptance.json)）

## 独立编辑器

- [ ] 富文本编辑器：结构化文档、格式、列表、链接、历史、受控更新及表单
- [ ] 代码编辑器：语法、选择、缩进、历史、只读、受控更新及表单

## 图表

- [ ] 面积与堆叠
- [ ] 饼图/环形图与散点
- [ ] 时间轴与对数轴

## 问卷

- [ ] 矩阵多选
- [ ] 重复题组
- [ ] 自定义题型渲染及生命周期契约
- [ ] 排序题拖动与键盘操作

## 虚拟化

- [ ] 横向列虚拟化
- [ ] 二维网格虚拟化
- [ ] 可变高度虚拟瀑布流

## 日期与平台验收

- [ ] 本地化自由文本日期解析
- [ ] 日期与时间组合
- [ ] Drawer 全部方向、RTL 与触摸回归
- [ ] Firefox 实际运行、截图与焦点验收
- [ ] Safari 实际运行、截图与焦点验收（WebKit 引擎验收不等同 Safari）
- [ ] 真实手机验收（模拟视口和模拟触摸不等同真机）

当前本地云端为 Linux，官方 Firefox/WebKit 下载被域名策略拒绝；独立 GitHub CI 已实际运行三个浏览器及原生桌面 Safari。最新结构行CI（bfa924f）中，Chromium170四端及116Story通过；Firefox取消，WebKit152通过/18失败；Safari219默认及24既有桌面专项通过后树折叠失败，24张实际PNG已审阅。见[本批平台限制](audits/2026-10-05/data-table-range-linux/acceptance.json)及[CI运行](https://github.com/shaloong/loongark/actions/runs/37373825724)，平台清单不关闭。真实手机需取得设备或设备云连接。其余实现继续推进。过程截图与日志仅保留在 `.artifacts/` 或有期限的 CI Artifact；Git 保存简短摘要及实际用于回归的已审阅基线。


独立浏览器流水线及原生 Safari runner 已配置；[本地配置验证](audits/2026-10-05/browser-ci-setup/acceptance.json)不计作远端或真机验收，实际首轮结果和截图审阅已补入该记录；平台项目仍等待修复后的完整验收。
