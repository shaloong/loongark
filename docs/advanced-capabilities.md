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

- [x] 富文本编辑器：结构化文档、格式、列表、链接、历史、受控更新及表单（[Linux四端验收](audits/2026-10-06/editors-linux/acceptance.json)）
- [x] 代码编辑器：语法、选择、缩进、历史、只读、受控更新及表单（同上）

## 图表

- [x] 面积与正负堆叠（[Linux四端验收](audits/2026-10-06/chart-types-linux/acceptance.json)）
- [x] 饼图/环形图与散点（同上）
- [x] 时间轴与对数轴（同上：连续域、裁剪、本地化及无效数据语义）

## 问卷

- [x] 矩阵多选（[三引擎四端与Linux视觉验收](audits/2026-10-06/questionnaire-matrix-linux/acceptance.json)）
- [x] 重复/嵌套题组（[三引擎四端与Linux视觉验收](audits/2026-10-06/questionnaire-groups-linux/acceptance.json)）
- [x] 自定义题型渲染及生命周期契约（[三引擎四端与Linux视觉验收](audits/2026-10-06/questionnaire-custom-linux/acceptance.json)）
- [x] 排序题拖动、边缘自动滚动与键盘操作（[三引擎四端及Linux视觉验收](audits/2026-10-06/questionnaire-ranking-linux/acceptance.json)）

## 虚拟化

- [x] 横向列虚拟化（[三引擎四端与Linux视觉验收](audits/2026-10-06/table-column-window-linux/acceptance.json)）
- [x] 二维网格虚拟化（[四端三引擎与Linux视觉验收](audits/2026-10-06/virtual-layout-linux/acceptance.json)）
- [x] 可变高度虚拟瀑布流（同上；测量修正、稳定键/锚点、焦点与有界SSR）

## 日期与平台验收

- [x] 本地化自由文本日期解析（[API](localized-date.md)及[三引擎验收](audits/2026-10-06/localized-date-linux/acceptance.json)）
- [x] 日期与时间组合（原生DateInput日期/时分秒、显式时区与四端表单契约，同上）
- [ ] Drawer 全部方向、RTL 与触摸回归
- [ ] Firefox 实际运行、截图与焦点验收
- [ ] Safari 实际运行、截图与焦点验收（WebKit 引擎验收不等同 Safari）
- [ ] 真实手机验收（模拟视口和模拟触摸不等同真机）

当前本地云端为 Linux。Firefox144.0.2已能实际运行；图表四端定向回归通过；编辑器与范围回归三引擎各48项通过，实际四端截图已审阅，详见[输入与剪贴板平台验收](audits/2026-10-06/editor-input-platforms/acceptance.json)。WebKit26.0补齐本地运行依赖后，本批图表四端16项通过，实际截图已审阅。整库跨浏览器失败仍待修复，平台清单不关闭。范围批次adb2的[实际CI](https://github.com/shaloong/loongark/actions/runs/37382936739)：Chromium186四端通过、118Story通过/2质量扫描超时；Firefox168通过/18失败，WebKit163通过/23失败；原生Safari26.6.1/macOS15.7.9的223默认示例及24既有交互通过后树折叠失败。24张Safari实际截图及失败图已查看。编辑器批次已拆分完整质量扫描，其他实际失败继续处理，平台清单不关闭。输入平台修复26e3280的[真实Safari任务](https://github.com/shaloong/loongark/actions/runs/37417089161)运行Safari26.6.1/macOS15.7.9：235默认示例与24既有交互通过后，在清空筛选恢复树展开状态时失败；24张交互图与失败图已实际查看。失败图中输入已空但筛选结果仍保留，事件原因待原生诊断，不能视作通过。同任务Firefox整库232通过/2失败，均为窄屏列拖动；不得以本批定向通过代替整库结果。真实手机需取得设备或设备云连接。过程文件仅保留在 `.artifacts/` 或有期限的CI Artifact；Git只保存简短摘要和已审阅回归基线。


独立浏览器流水线及原生 Safari runner 已配置；[本地配置验证](audits/2026-10-05/browser-ci-setup/acceptance.json)不计作远端或真机验收，实际首轮结果和截图审阅已补入该记录；平台项目仍等待修复后的完整验收。

矩阵批次bce5310的原生Safari任务（[37419649189](https://github.com/shaloong/loongark/actions/runs/37419649189)）实际239个默认示例及24项既有交互通过后树折叠失败；失败截图已实际查看，显示展开操作后单元格进入编辑态，事件与命中位置仍需原生诊断。该失败不同于26e3280的清空筛选场景，平台项继续开放。

同批WebKit完整四端结果为232通过、18失败、36项Story用例跳过；包含窄屏图表溢出、树展开焦点、裁剪示例，以及扩展快捷键与富文本删表。已下载React/Vue截图并查看对应失败场景，尚未完成修复与整库复验。

[原生Safari诊断配置](audits/2026-10-06/native-safari-diagnostics/acceptance.json)改为真实键盘清空输入，并记录树按钮可信事件、矩形和命中目标；Linux只完成语法/lint检查，等待macOS实际运行，不计平台通过。

诊断提交e463345的[实际Safari任务](https://github.com/shaloong/loongark/actions/runs/37423827257)运行243个默认示例及24交互后仍在树折叠失败。失败图和原生事件已查看：旧中心坐标命中了编辑按钮，点击前后区域位置改变。runner现改为真实滚动、等待绘制、重新测量并发送W3C原生指针动作；新修改仍待macOS复验，筛选清空尚未执行。

原生坐标修正7a8a781的[实际Safari任务](https://github.com/shaloong/loongark/actions/runs/37425177875)已通过：Safari26.6.1/macOS15.7.9（非模拟器）运行243个默认示例与32交互；树折叠和键盘清空筛选均通过，32张四端明暗交互图已实际审阅。验收范围为既有Safari runner，未覆盖所有编辑器/日期/问卷及真实手机；详见[原生验收追踪](audits/2026-10-06/native-safari-diagnostics/acceptance.json)。

原生输入修正e372457的[真实CI](https://github.com/shaloong/loongark/actions/runs/37441474990)：Chromium四端319通过、Firefox315通过；两者Story任务因40分钟预算取消。WebKit298通过/17失败，涉及窄屏图表溢出、树折叠焦点及窄屏消费布局；平台项目保持开放。本批Linux引擎任务预算调整为60分钟，配置修改不算实际通过。Safari26.6.1/macOS15.7.9的243默认示例与32既有交互通过、32截图已下载并审阅；新增题组场景仍需实际执行。详见[追踪](audits/2026-10-06/input-hover-platforms/acceptance.json)。

题组提交cae010c的[实际CI](https://github.com/shaloong/loongark/actions/runs/37451275443)：Chromium四端367项和Story162项通过；Firefox四端363项通过、Story161通过/1失败（remediation浮层场景）；WebKit四端347通过/16失败（窄屏图表8项、树折叠焦点7项、Vue窄屏消费1项），Story未执行。原生Safari完成247默认示例和32既有交互后，在React浅色新增题组的首字段焦点失败；已下载并实际查看失败图。该场景尚未通过，后续修复后继续复验，不关闭平台清单。

自定义题型提交e237fd8的[实际CI](https://github.com/shaloong/loongark/actions/runs/37467299209)：Chromium四端394项、Story166项通过；Firefox四端390项通过、Story164通过/2失败（富文本删表及remediation浮层）；WebKit四端373通过/17失败（窄屏图表8项、树折叠焦点6项、窄屏消费布局3项），Story未执行。原生Safari26.6.1/macOS15.7.9完成251默认示例和9项交互后，在Vue深色批量提交后的触发器焦点失败；失败截图已下载并实际查看，题组与自定义题型尚未执行。新增平台验收继续处理，未将CI配置或Linux定向通过计作平台清单完成。

横向窗口提交b435507的[实际CI](https://github.com/shaloong/loongark/actions/runs/37486637681)：Chromium四端411项、Story170项通过；Firefox四端407项通过、Story168通过/2失败（remediation浮层、全Story挂载扫描超时）；WebKit四端392通过/15失败（窄屏图表8项、树折叠焦点5项、React/Vue窄屏消费布局2项），Story未执行。原生Safari26.6.1/macOS15.7.9完成255默认示例及32既有交互后，React浅色新增题组首字段焦点失败；32交互截图及失败图已下载并实际查看，新增题组显示但首字段未获得焦点。横向窗口专项未加入该版Safari runner，不将默认挂载视作高级行为通过；平台清单继续开放。
