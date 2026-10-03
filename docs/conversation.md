# 附件、消息与问卷

本批补齐 Attachment、Message、Bubble、MessageScroller、Questionnaire。现有 FileUpload 负责文件选择与接受规则；Attachment 展示已选择文件的上传或下载状态。ScrollArea 负责通用滚动条；MessageScroller 负责消息跟随、暂停与前插历史消息的视口保持。Field/Fieldset 提供字段语义；Questionnaire 在其原生语义基础上组织多题导航、答案与校验，不增加等价别名。

React、Vue、Solid、Svelte 使用相同的五个公开名称。共享类型、答案归一化与滚动行为在 Kit，适配层负责渲染、绑定与生命周期。样式消费已有中性 Token，未新增调色板或依赖。

## API 与职责

- `LoongArkAttachment`：必需 `name`，可选 `size`（字节）、`href`、`status=ready|uploading|error`、`progress`（0–100，未传表示不确定进度）、`disabled`、`onRemove`、`onRetry`。上传与失败状态不显示下载链接；禁用状态禁用下载和操作。`errorLabel` 定义错误说明，`removeLabel/retryLabel` 定义包含文件名的操作可访问名称（可见短标签为 Remove / Retry）。上传、文件移除与重试的数据操作由调用者提供。
- `LoongArkBubble`：内容容器，`side=incoming|outgoing` 控制中性背景。支持长文本与显式换行；无需消息作者或发送状态，适合消息内容与其它回复内容。
- `LoongArkMessage`：原生 article，必需 `author`，支持 `side`、`dateTime`（机器时间）、`timeLabel`（展示时间）、`status=sent|sending|error`、`statusLabel`、`retryLabel`、`onRetry`。内容可组合 Bubble、Attachment 或其它基础组件。不会自行发送消息，也不解析 HTML/Markdown。
- `LoongArkMessageScroller`：`label` 命名可聚焦滚动区域，`jumpLabel` 命名回到底部按钮，`onAtBottomChange({atBottom})` 报告跟随状态。初次挂载到最新消息；用户上翻后新消息不强制滚动，前插消息保持当前阅读位置；回到最新后恢复跟随。监听器、MutationObserver 和 ResizeObserver 在卸载时释放。高度可覆盖共享 viewport 的 CSS；默认使用已有控件高度 Token。容器不会接管消息数据、分页或虚拟化。
- `LoongArkQuestionnaire`：必需 `label/questions`；题型为 `text/single/multiple`。题目具有唯一 `id`、`label`、`description`、`required`，文本支持 `minLength/maxLength`，`when(value)` 控制条件可见性，`validate(answer, value)` 返回同步业务错误说明或 undefined；选项具有唯一 `value`、`label`、`disabled`。`value/defaultValue` 保存答案，`onValueChange({value})` 通知变化，`onComplete({value})` 只在全部题目有效时调用。`disabled/submitting` 阻止交互，`completed` 展示完成状态，`error` 展示提交错误。空题集有明确空状态，不提供提交按钮。显示文本支持 `emptyLabel/successLabel/nextLabel/backLabel/submitLabel/requiredLabel/invalidLabel`。

Questionnaire 在当前题内校验，前进与后退将焦点移动到第一项可用输入，校验失败保留当前题并聚焦。答案按题目与可用选项归一化，移除陈旧题目、无效或禁用选项，去重多选答案。原生 FormData 按题目 id 序列化；多选为同名多个值，未作答的多选无条目。答案长度按去除首尾空白后的字符数校验。题目变化时页码限制到合法范围；需要重新开始一个独立问卷时重新挂载组件。

Vue 支持 `v-model`（modelValue）；Svelte 支持 `bind:value`；React/Solid 使用 `value/onValueChange`。提交服务、异步状态与完成页面由业务控制，本组件不会假定后端协议、持久化或评分。

## 示例、验证与限制

四端 `ConversationExample` 使用同一题目数据，展示上传、错误重试、禁用、消息追加与问卷完成。五组独立 Story 加入长文本、未知进度、发送中、空状态、提交中与服务错误。回归覆盖答案保留、必填与长度、FormData、焦点、下载禁用、上翻暂停、跟随恢复、前插消息、四端真实发布产物与 SSR。

本批 Linux 证据位于 [验收记录](audits/2026-10-03/conversation-linux/acceptance.json)。截图单独建立 Linux 基线，未覆盖 Windows。测试浏览器与验证范围以该记录为准。

滚动组件不提供虚拟列表或像素级媒体加载锚定；上翻期间图片延迟加载的高度变化可能改变内容位置，调用方应为媒体预留尺寸。Questionnaire 按可见题目导航，支持条件跳题与同步业务校验；不提供文件题目或评分引擎。未测试全部 peer 版本与浏览器。

本次目视修正：附件使用共享 SVG 文件图标，避免系统字体缺字；双操作按钮在窄屏独立成行，长文件名保持可读宽度。问卷题组按 id 维护渲染身份，避免跨题导航复用原生 radio 节点导致 checked 状态丢失。Linux 测试输出目录与既有 Windows 审查证据隔离。

## 条件题与业务校验

`when` 接收已归一化的完整答案。隐藏题的答案保留在 value/onValueChange 中，返回分支时恢复；它们不参与题数、前后导航、FormData、最后提交校验和 onComplete。所有题目 ID 与选项仍需合法唯一，隐藏不会绕过结构检查。条件函数必须是纯函数，不在其中发起请求或修改答案。

`validate` 在内建必填与长度校验通过后执行，接收当前题的归一化答案及完整答案对象；可以验证邮件、格式和确认字段。返回 undefined 表示通过，字符串作为字段错误与 aria-describedby/aria-invalid 关联。校验函数应保持纯函数；初始渲染与 SSR 不执行提交校验，不发出答案或完成回调。异步服务校验继续由 submitting/error/completed 控制。

受控值被业务拒绝后，真实 radio/checkbox/textarea 会恢复业务值，不只恢复选中样式。Svelte 的 onValueChange 由业务决定是否接受，和其它三端一致；简单双向绑定可以只使用 bind:value，初值可以为 undefined，首次输入也会写回父级。若同时使用 bind:value 与 onValueChange，请在回调里明确写回答案，或省略回调使用自动绑定。这样避免业务拒绝后组件先自行改变 value。

四端 QuestionnaireAdvancedExample 展示工作区分支、答案保留、锁定受控更新、格式与跨题校验、提交和重置；Conditional/ConditionalEmpty Story 对应相同能力。验收见 [问卷高级能力](audits/2026-10-03/questionnaire-advanced-linux/acceptance.json)。隐藏规则不自动清除编辑值；若业务要求删除，应自行更新 value。外部替换问卷结构时页码按可见题集限界；新问卷会话可重新挂载，不自动持久化。
