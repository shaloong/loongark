# 附件、消息与问卷

本批补齐 Attachment、Message、Bubble、MessageScroller、Questionnaire。现有 FileUpload 负责文件选择与接受规则；Attachment 展示已选择文件的上传或下载状态。ScrollArea 负责通用滚动条；MessageScroller 负责消息跟随、暂停与前插历史消息的视口保持。Field/Fieldset 提供字段语义；Questionnaire 在其原生语义基础上组织多题导航、答案与校验，不增加等价别名。

React、Vue、Solid、Svelte 使用相同的五个公开名称。共享类型、答案归一化与滚动行为在 Kit，适配层负责渲染、绑定与生命周期。样式消费已有中性 Token，未新增调色板或依赖。

## API 与职责

- `LoongArkAttachment`：必需 `name`，可选 `size`（字节）、`href`、`status=ready|uploading|error`、`progress`（0–100，未传表示不确定进度）、`disabled`、`onRemove`、`onRetry`、`onPreview`、`onCancel`。上传与失败状态不显示下载链接；禁用状态禁用下载和操作。`errorLabel` 定义错误说明，`removeLabel/retryLabel/previewLabel/cancelLabel` 同时定义可见与可访问标签；默认短标签为 Remove/Retry/Preview/Cancel，可访问名称包含文件名。上传、文件移除与重试的数据操作由调用者提供。
- `LoongArkBubble`：内容容器，`side=incoming|outgoing` 控制中性背景。支持长文本与显式换行；无需消息作者或发送状态，适合消息内容与其它回复内容。
- `LoongArkMessage`：原生 article，必需 `author`，支持 `side`、`dateTime`（机器时间）、`timeLabel`（展示时间）、`status=sent|sending|error`、`statusLabel`、`retryLabel`、`onRetry`。内容可组合 Bubble、Attachment 或其它基础组件。不会自行发送消息，也不解析 HTML/Markdown。
- `LoongArkMessageScroller`：`label` 命名可聚焦滚动区域，`jumpLabel` 命名回到底部按钮，`onAtBottomChange({atBottom})` 报告跟随状态。初次挂载到最新消息；用户上翻后新消息不强制滚动，前插消息保持当前阅读位置；回到最新后恢复跟随。监听器、MutationObserver 和 ResizeObserver 在卸载时释放。高度可覆盖共享 viewport 的 CSS；默认使用已有控件高度 Token。容器不会获取消息数据或分页；可选虚拟化见下文。
- `LoongArkQuestionnaire`：必需 `label/questions`；题型为 `text/single/multiple/number/date/select/matrix/ranking`。题目具有唯一 `id`、`label`、`description`、`required`，文本支持 `minLength/maxLength`，`when(value)` 控制条件可见性，`validate(answer, value)` 返回同步业务错误说明或 undefined；选项具有唯一 `value`、`label`、`disabled`。`value/defaultValue` 保存答案，`onValueChange({value})` 通知变化，`onComplete({value})` 只在全部题目有效时调用。`disabled/submitting` 阻止交互，`completed` 展示完成状态，`error` 展示提交错误。空题集有明确空状态，不提供提交按钮。显示文本支持 `emptyLabel/successLabel/nextLabel/backLabel/submitLabel/requiredLabel/invalidLabel`。

Questionnaire 在当前题内校验，前进与后退将焦点移动到第一项可用输入，校验失败保留当前题并聚焦。答案按题目与可用选项归一化，移除陈旧题目、无效或禁用选项，去重多选答案。原生 FormData 按题目 id 序列化；多选为同名多个值，未作答的多选无条目。答案长度按去除首尾空白后的字符数校验。题目变化时页码限制到合法范围；需要重新开始一个独立问卷时重新挂载组件。

Vue 支持 `v-model`（modelValue）；Svelte 支持 `bind:value`；React/Solid 使用 `value/onValueChange`。提交服务、异步状态与完成页面由业务控制，本组件不会假定后端协议、持久化或评分。

## 示例、验证与限制

四端 `ConversationExample` 使用同一题目数据，展示上传、错误重试、禁用、消息追加与问卷完成。五组独立 Story 加入长文本、未知进度、发送中、空状态、提交中与服务错误。回归覆盖答案保留、必填与长度、FormData、焦点、下载禁用、上翻暂停、跟随恢复、前插消息、四端真实发布产物与 SSR。

本批 Linux 证据位于 [验收记录](audits/2026-10-03/conversation-linux/acceptance.json)。截图单独建立 Linux 基线，未覆盖 Windows。测试浏览器与验证范围以该记录为准。

原生消息滚动支持稳定消息与文字节点的媒体高度锚定；可通过 `virtualization` 开启后文说明的可变高度消息窗口。调用方仍建议为媒体预留尺寸以减少布局变化。Questionnaire 按可见题目导航，支持条件跳题与同步/异步业务校验；不提供文件题目或评分引擎。未测试全部 peer 版本与浏览器。

本次目视修正：附件使用共享 SVG 文件图标，避免系统字体缺字；双操作按钮在窄屏独立成行，长文件名保持可读宽度。问卷题组按 id 维护渲染身份，避免跨题导航复用原生 radio 节点导致 checked 状态丢失。Linux 测试输出目录与既有 Windows 审查证据隔离。

## 条件题与业务校验

`when` 接收已归一化的完整答案。隐藏题的答案保留在 value/onValueChange 中，返回分支时恢复；它们不参与题数、前后导航、FormData、最后提交校验和 onComplete。所有题目 ID 与选项仍需合法唯一，隐藏不会绕过结构检查。条件函数必须是纯函数，不在其中发起请求或修改答案。

`validate` 在内建必填与长度校验通过后执行，接收当前题的归一化答案及完整答案对象；可以验证邮件、格式和确认字段。返回 undefined 表示通过，字符串作为字段错误与 aria-describedby/aria-invalid 关联。校验函数应保持纯函数；初始渲染与 SSR 不执行提交校验，不发出答案或完成回调。异步逐题校验使用 `validateAsync`，提交服务仍由 `submitting/error/completed` 控制。

受控值被业务拒绝后，真实 radio/checkbox/textarea 会恢复业务值，不只恢复选中样式。Svelte 的 onValueChange 由业务决定是否接受，和其它三端一致；简单双向绑定可以只使用 bind:value，初值可以为 undefined，首次输入也会写回父级。若同时使用 bind:value 与 onValueChange，请在回调里明确写回答案，或省略回调使用自动绑定。这样避免业务拒绝后组件先自行改变 value。

四端 QuestionnaireAdvancedExample 展示工作区分支、答案保留、锁定受控更新、格式与跨题校验、提交和重置；Conditional/ConditionalEmpty Story 对应相同能力。验收见 [问卷高级能力](audits/2026-10-03/questionnaire-advanced-linux/acceptance.json)。隐藏规则不自动清除编辑值；若业务要求删除，应自行更新 value。外部替换问卷结构时页码按可见题集限界；新问卷会话可重新挂载，不自动持久化。

## 消息与附件异步操作

Message 的 `actions` 接受 `{id, label, onAction, disabled?, successLabel?}`；ID 必须非空唯一，`retry` 保留给发送失败重试。`disabled` 禁用整个消息的操作，单项 disabled 保持可见并保留原生禁用语义。菜单式操作可在 children 中组合已有 Menu，当前 actions 为常驻按钮，不增加重复菜单组件。

Attachment 仅在 ready 提供 `onPreview`，uploading 提供 `onCancel`；既有 onRemove 和错误 onRetry 同步支持异步操作。预览内容、删除确认、真实上传与请求协议由业务负责，组件不自行下载文件用于预览，也不推断取消请求。默认下载仍为原生带 download 的链接，建议文件名使用 name；操作进行期间暂时取消下载链接，避免重复处理。

所有操作接收 `{signal: AbortSignal}`，兼容不接收参数的旧回调。返回 Promise 时组件等待其完成；同一个实例只允许一个进行中的操作，aria-busy 和禁用按钮同步，避免重复请求。失败统一显示可重试的 alert；不会把原始异常信息直接暴露给用户。actionLabels.pending/error/group 可本地化反馈与操作组名称，单项 successLabel 提供成功状态。同步异常与异步拒绝采用同一路径。

`actionKey` 标识业务对象版本：变化时中止旧操作并清除反馈，旧完成不能覆盖新对象状态；卸载也中止并清理监听。请求实现必须响应 signal，组件不能撤销业务已经提交的数据。disabled 在操作过程中变化只阻止新操作，已有操作继续；需要取消时由业务取消请求或更新 actionKey。React 在客户端提交阶段更新控制器，StrictMode 重挂产生新实例；其它三端按各自生命周期释放控制器。SSR 不执行操作回调，也不创建 DOM 监听。

操作造成原按钮消失后，焦点恢复到对应的新按钮或当前组件根；用户已移到外部时保留外部焦点。删除整个组件后的业务焦点由调用方负责。四端 ConversationActionsExample 展示真实剪贴板复制、延迟保存与失败、替换消息中止旧保存、下载、Dialog 文本预览、模拟上传进度/取消及删除后的恢复按钮。剪贴板需要安全上下文与浏览器权限；上传是可取消的模拟源，没有真实服务器。Bubble 仍只呈现业务内容；Markdown、评分和消息虚拟化未包含在这批能力中。

迁移说明：显式传入 Attachment removeLabel/retryLabel 时，现在可见文字也使用该标签，与可访问名称一致。需要短按钮文字时请传入短而明确的标签。验收范围与平台限制见 [操作批次记录](audits/2026-10-03/conversation-actions-linux/acceptance.json)。


## 媒体变化与阅读锚点

MessageScroller 在用户暂停跟随后记录首条可见消息及可见文字位置。图片在视口上方加载、同条消息内媒体撑高、上方增高同时下方缩短、历史与新回复同时插入，都会按实际阅读锚点调整 scrollTop；不会使用整个列表的高度差替代前插位移。位于底部时继续跟随；用户主动滚动立即更新锚点，Jump to latest 保留键盘焦点语义。

共享行为使用临时 Range 测量横排文字，不改变 Selection；ResizeObserver 同时观察内容、视口和直接消息行，MutationObserver 跟踪消息与文字变化，更新合并到动画帧。卸载取消帧、断开观察器、释放引用，恢复接管前的 overflow-anchor/跟随属性/跳转按钮状态，并保留调用方后续覆盖。嵌套滚动组件只接管自己直接所属的部件。

四端 MessageScrollerAdvancedExample 与 Advanced Story 提供延迟预览、加载取消、历史和新回复同时插入、重置、隐藏与重新挂载。图片复用既有中性媒体示例，媒体真正解码并改变自然高度；示例500ms延迟仅模拟元数据，不假定后端协议。

锚定依赖稳定的消息与文字 DOM 身份：被阅读消息移除时以当前合法位置重新取锚点；文字节点替换时退回消息边界。纯图片内容保留消息边界，不能承诺图片缩放后的内部像素位置。该媒体批次未涵盖虚拟化，后续实现见下文；竖排/旋转文本、跨浏览器与真实手机专项验收尚未交付。详细证据见 [媒体锚点验收](audits/2026-10-03/message-anchor-linux/acceptance.json)。

Button 的 `loading` 会同时禁用交互并设置 `aria-busy=true`；其余情况保留调用方显式 `aria-busy`。预览加载中的取消按钮因此保持可操作，取消/完成后移除忙碌标记；四端均验证调用方 true/false 和 loading 优先级。

清理后若容器仍留在 DOM，恢复 `overflow-anchor:auto` 会重新交回浏览器锚定，Chromium 可能自行调整位置。卸载回归分别检查关闭原生锚定时无延迟滚动、auto 恢复与外部覆盖；不把浏览器恢复行为误判为组件遗留帧。

## 问卷异步校验与对齐

`Question.validateAsync(answer, value, { signal })` 返回 `Promise<string | undefined>`；字符串作为当前字段错误，undefined 表示通过。答案快照只读使用；仅在前进或最终提交时调用，渲染与 SSR 不发送请求。所有待校验题目的内建及同步校验先通过，才请求异步服务；最终提交重新校验全部可见题目，包括前面已通过的题目。业务请求、账户规则和服务端权限由调用方实现。

等待期间表单具有 `aria-busy`、状态说明和取消按钮，前进/提交互斥；答案仍可编辑，后退仍可用。编辑、后退、主动取消、可见题集/题目元数据/校验函数替换、外部答案替换、禁用、提交中、完成和卸载均使当前请求失效并中止 signal。即使请求忽略 signal，组件也立即停止等待并忽略迟到的成功、错误或拒绝。异步异常显示可重试的字段错误，不把异常对象直接显示给用户；可通过 `validatingLabel/cancelValidationLabel/validationErrorLabel` 本地化。

失败保留答案并标记输入 `aria-invalid`，最终校验失败会回到对应题目；失败恢复因禁用触发器丢失的焦点；用户已移到表单外的控件时保留外部焦点。取消不会发出完成回调；输入重新通过校验后可以继续。题目描述和错误通过既有 `aria-describedby` 关联，隐藏答案仍不参与最终提交。新问卷会话通过重新挂载重置，不提供跨会话缓存或后台自动保存。

单选/多选的原生控件使用既有尺寸 Token，清除浏览器默认 margin，并与多行标签首行居中对齐；操作区按按钮中心对齐，提交按钮换行后仍位于逻辑结束边缘。四端 `QuestionnaireAsyncExample` 和 `AsyncValidation/LongOptions/CallbackUpdates` Story 展示实际延迟校验、错误重试、取消、题目替换、卸载以及长文本换行。375px 视口验证不等同于真机测试。

校验期间替换 `onComplete` 后，完成时使用最新回调；React 使用实例引用追踪，其他框架使用当前绑定。`CallbackUpdates` 展示更新处理函数后仍由新函数接收结果。

## 消息虚拟化

通过 `virtualization={{keys,height:360,estimateSize:96,overscan:3,scrollToIndex:250}}` 提供稳定且唯一的有序消息键。React/Solid 使用 `renderItem({key,index})`，Vue 使用 item 插槽，Svelte 使用 `item` Snippet；按键读取调用方的最新内容。索引从0开始，改变 scrollToIndex 发出定位命令。默认从最新消息开始，只有用户位于末尾时追加才自动跟随。前插历史、可见内容增高时保留消息边界与内部偏移；正在阅读的键删除后优先定位后一个合法键。

真实测量包含每条消息的容器间距。内容使用原生 list/listitem 与 aria-posinset/aria-setsize；活动焦点消息额外保留，缓冲之外的其他消息卸载，消息组件的局部状态如需跨卸载保存由调用方管理。SSR 输出末尾的估算窗口，不触发 onAtBottomChange。观察器、滚动及焦点监听器在卸载时清理。此模式保证消息边界/内部偏移；原生非虚拟模式继续提供可见文字锚点，不承诺虚拟模式保持文字节点内部的像素位置。

## 矩阵多选

`Question.type: "matrix"` 默认保持每行单选；设置 `multiple: true` 后，答案为 `{questionId: {rowId: [optionValue, ...]}}`。`minSelections/maxSelections` 适用于普通多选及矩阵多选，每行独立校验；必须为非负安全整数且最小值不大于最大值。`required` 要求全部可用行有答案，可选行的空答案不触发最小数量限制。

答案按选项顺序归一，去重并移除无效、禁用行与选项；单选与多选答案不会互相强制转换。原生 FormData 为每个已选项重复 `questionId[rowId]` 名称。矩阵行是原生 fieldset，数量错误关联到对应行，前进失败聚焦首个无效行。禁用选项在多选模式可见且不可操作。受控拒绝恢复勾选状态；异步校验收到独立且冻结的嵌套行数组，不能修改编辑答案。`questionMap` 继续返回单选字符串行；多选答案可按公开 `QuestionAnswer` 类型读取。四端 `QuestionnaireMatrixExample` 与 `MatrixMultiple` Story 展示同一 API。

排序题手柄、预览、取消、受控拒绝及本地化说明见[复杂问卷题型](questionnaire.md)。
