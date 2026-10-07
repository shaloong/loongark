# 选择与输入组件补齐（2026-10-03）

继基础组件批次之后，新增 TransferList、TimePicker 两个组件族，并增强现有 Textarea 自动高度。React、Vue、Solid、Svelte 共用 Kit 数据模型、尺寸测量和 CSS；框架层负责绑定、生命周期与原生事件。全部颜色消费现有 Shaloong VI 语义 Token，没有加入参考库色号。

## TransferList

公开入口为 `LoongArkTransferList`，参数 `items` 为包含唯一非空 `value`、`label`、可选 `description`、`disabled` 的列表。`value/defaultValue` 表示右侧已分配值，结果始终按 items 顺序排列，已不存在的值会忽略。左右临时勾选与业务分配值分开；全选和搬移会跳过禁用项。

`onValueChange({value,moved,direction})` 返回完整分配值、本次搬移值和 right/left 方向。React/Solid 使用 value 与回调；Vue 同时支持 v-model；Svelte 支持 bind:value。非受控模式使用 defaultValue。传入 name 后，以重复的隐藏字段提交右侧值，整体 disabled 时不提交。

左右列表采用 fieldset/legend、原生 checkbox 和 button。Tab 移动焦点，Space 勾选，Enter 执行搬移；完成后焦点移至目标列表第一项。本地状态区播报搬移数量。560px 以下改为上下布局。支持 leftLabel、rightLabel、emptyLabel 定义文案。

设计参考 [MUI Transfer List](https://mui.com/material-ui/react-transfer-list/) 的组合方式，并补充本库的窄屏布局。当前为适合普通项目数量的双栏选择，不包含拖放或虚拟滚动；表单 reset 后的业务值由调用方控制。

## TimePicker

公开入口为 `LoongArkTimePicker`。原生 type=time 字段保留 name、id、required、disabled、readOnly、min、max 语义。回调为 `onValueChange({value,valid})`；Vue 支持 v-model，Svelte 支持 bind:value，非受控使用 defaultValue。

业务值为 HH:mm，显示支持 locale 与 hourCycle（h12/h23）。自定义弹层通过原生小时、分钟 select 操作，提供焦点进入、Escape 关闭、关闭后返回触发器和禁用选项。label、hourLabel、minuteLabel、triggerLabel、doneLabel、invalidLabel 可翻译。原生输入的展示格式仍由浏览器地区设置决定，弹层标签和预览采用指定 locale。

minuteStep 为 1–60 之间且能整除 60 的整数；步长从 min（未提供时 00:00）起算。min > max 表示跨午夜窗口，例如 22:00–02:00。切换小时会保留仍有效的分钟；否则选该小时第一个有效分钟。非空值超出范围或步长不符时，会标记 aria-invalid 并显示关联提示；required 空值由原生表单约束校验阻止提交。

原生时间语义依据 [MDN input/time](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time)。本批实现分钟级选择；秒、日期、时区及模拟时钟面板不在当前 API 范围内。

## Textarea 自动高度

现有 `LoongArkTextarea` 新增 `autoSize`、`minRows`、`maxRows`。autoSize 默认 false，继续提供原生垂直手动调整；开启时默认 minRows=3，maxRows 不设上限。行数会向下取整并限制至少一行，maxRows 不小于 minRows。

浏览器挂载后测量真实 line-height、padding、border 和 scrollHeight，在上下限间伸缩；超过 maxRows 时内部滚动。受控赋值、键盘输入、容器宽度变化、字体加载和原生表单 reset 均触发重测。自动模式管理 height/minHeight/maxHeight/overflow/resize，关闭后恢复原有内联值并释放监听；卸载会取消异步测量。SSR 使用原生 rows 输出初始高度，不在服务端访问 DOM。

参考 [MUI Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/) 的按内容伸缩行为，所有框架使用同一测量模块。调用方式见四端 SelectionInputsExample，独立 Story 展示范围、状态和长文本。

## 验证入口

`pnpm verify`、`pnpm check:contracts`、`pnpm check:publication`、`pnpm check:svelte`、`pnpm check:coverage` 检查构建、公开契约、模型、SSR 与覆盖。浏览器回归验证禁用项、键盘搬移与焦点、FormData、时间窗口/步长、弹层关闭、受控文本伸缩、恢复手动调整和窄屏无障碍。

四端消费回归还修复了 Svelte Portal 的异步挂载竞态：主题容器变化或卸载后，会取消待执行挂载并释放旧实例，避免同一弹层出现两个面板。示例测试页的长标题允许换行，防止测试外壳导致手机页面溢出。

验收结果：累计 93 个组件族、229 个 Story、四端各 608 个公开 LoongArk 值入口（统计不含 Provider）；99 个框架示例通过。Storybook 浏览器回归 29 项通过，8 项四端消费测试另行运行并通过；既有视觉基线 2 项通过。明暗各 229 个默认 Story 的 WCAG 2 A/AA Axe 违规、375px 页面溢出和 transition: all 检出均为 0。九包构建、公开声明、四端 SSR、模型/VI/Token 契约通过，Svelte 为 0 错误、0 警告。浏览器验证使用 Chromium，未穷举所有参数、状态或浏览器。

本批验收记录位于 [selection-inputs/acceptance.json](audits/2026-10-03/selection-inputs/acceptance.json)。历史批次记录保留；后续待补清单见 [component-coverage.json](component-coverage.json)。


## RatingGroup 受控值与悬停

星形悬停通过原生highlighted/half状态预览，radio的aria-checked和Tab入口始终对应调用方接受的value。鼠标进入后仍可用方向键、Home、End操作；受控值迟到时同步控件内焦点，用户已移到控件外时不会被延迟回调抢回。Root、RootProvider和useRatingGroup复用同一共享状态机；标签、HiddenInput、表单reset、Field及Locale环境保持Ark契约。Svelte在提供onValueChange时由调用方决定接受值；没有该回调时支持bind:value。自定义问卷评分示例只由Questionnaire提交隐藏字段，避免重复FormData，见[问卷契约](questionnaire.md)。

Select 与 Combobox 的默认浮层宽度同时受触发器和当前视口约束；退出动画保留旧触发器测量时，缩窄窗口也不会扩大页面。Sheet 的 positioner 固定占满视口，在绘制边界内播放滑入和滑出动画；面板贴齐上下边缘，覆盖 Dialog 的居中面板高度与圆角限制，保存或 Escape 关闭后恢复触发器焦点。
