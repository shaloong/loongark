# 附件、消息与问卷：Linux 目视验收

本批完成 Attachment、Message、Bubble、MessageScroller、Questionnaire 四端组件；先核对现有 FileUpload、ScrollArea 与表单能力，再定义专用职责，未新增等价别名。API 和边界见 [组件说明](../../../conversation.md)，命令结果与环境见 [acceptance.json](acceptance.json)。

## 实际查看与修正

实际查看了 `review/` 中 1280px、375px 的浅色和深色组合截图、核心默认/弹窗截图，`regressions/conversation/` 的四端手机截图，以及 `common-*.jpg` 的常用组件联系图。Linux 的默认字体环境使最初的附件字符图标显示缺字；改为共享 SVG 后重新截图核验。窄屏双操作按钮调整到独立行，文件名保留可读宽度。

禁用附件最初使用整体透明度，浅色下文件文本对比度只有 3.49；改为已有 mutedForeground Token，保留禁用按钮的视觉弱化。修正后完整浅深色 WCAG 检查通过。组合页补齐 main 和一级标题，新增交互用例运行完整 Axe 检查，不降低规则范围。

四端问卷按题目 ID 保持渲染身份，修复返回前题时 Vue/Svelte 的原生 radio checked 状态丢失。四端示例统一 Stack 层级和 16px 间距，避免 Vue/Svelte 额外的 24px 间距。手机截图同为 327×1154：React/Solid 与参考完全相同；Vue/Svelte 仅题目计数的少量字形像素不同，记录见 `regressions/conversation/parity.json`。

`common-*.jpg` 对 Button、Input、Checkbox、Select、Dialog、Card、Tabs、DataTable、TimePicker、SpeedDial、ImageList、Textarea 及新附件/消息/问卷进行浅深色和桌面/手机复核，未发现需要无目的重构或增加别名的证据。全量自动化截图归档于 `screenshots-light.tar.gz`、`screenshots-dark.tar.gz`，测量保存在 `after/`，不声称逐张人工验收了全部 257 个 Story。

自动截图使用 tar.gz 归档，减少仓库中散落的图片文件；执行 `tar -xzf screenshots-light.tar.gz` 等命令可恢复原路径。人工核验图、联系图、四端手机图与测量 JSON 保留为可直接查看的文件。

## 基线与回归

既有两张核心 Windows 基线保留；Linux 新增两张核心基线及四张对话组合基线。更新前已查看对应新截图，建立后使用普通比较模式再次通过。缺少 Linux 基线的初次失败不计入成功结果；`logs/e2e-before-fixes.txt` 与 `accessibility-before/` 保留初始失败证据。

上传未知/确定进度、禁用下载、重试/移除、消息失败重试、上翻暂停、追加跟随、前插视口保持、跳回焦点、问卷必填/长度/答案保留/FormData、禁用/提交中/空状态均有行为回归。另补题目 ID 为 `__proto__` 的模型回归。既有 TimePicker 回归等待 Ark 延迟初始焦点完成后再点击 Done，避免测试与焦点调度竞争。

## 范围与限制

使用系统 Chromium 151.0.7922.173：Playwright 固定浏览器下载受环境网络策略限制，未声称与固定 Chromium 143 或 Windows 像素结果等同。Node 24.19.0、pnpm 10.14.0；冻结锁文件安装，未改变依赖和调色板。

全量 Story 检查默认展示；交互状态使用专门用例，并非所有 props 组合。四端运行真实发布产物与已有全部示例，SSR 与公开声明另行校验；未覆盖全部 peer 版本、Firefox/WebKit、真实移动设备或屏幕阅读器。滚动组件不提供虚拟化和延迟媒体的像素锚定，问卷不提供条件跳题或评分引擎。
