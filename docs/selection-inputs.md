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

原生时间语义依据 [MDN input/time](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/time)。当前实现分钟级选择；秒、日期、时区及模拟时钟面板不在当前 API 范围内。

## Textarea 自动高度

现有 `LoongArkTextarea` 新增 `autoSize`、`minRows`、`maxRows`。autoSize 默认 false，继续提供原生垂直手动调整；开启时默认 minRows=3，maxRows 不设上限。行数会向下取整并限制至少一行，maxRows 不小于 minRows。

浏览器挂载后测量真实 line-height、padding、border 和 scrollHeight，在上下限间伸缩；超过 maxRows 时内部滚动。受控赋值、键盘输入、容器宽度变化、字体加载和原生表单 reset 均触发重测。自动模式管理 height/minHeight/maxHeight/overflow/resize，关闭后恢复原有内联值并释放监听；卸载会取消异步测量。SSR 使用原生 rows 输出初始高度，不在服务端访问 DOM。

参考 [MUI Textarea Autosize](https://mui.com/material-ui/react-textarea-autosize/) 的按内容伸缩行为，所有框架使用同一测量模块。调用方式见四端 SelectionInputsExample，独立 Story 展示范围、状态和长文本。

## 验证入口

`pnpm verify`、`pnpm check:contracts`、`pnpm check:publication`、`pnpm check:svelte`、`pnpm check:coverage` 检查构建、公开契约、模型、SSR 与覆盖。浏览器回归验证禁用项、键盘搬移与焦点、FormData、时间窗口/步长、弹层关闭、受控文本伸缩、恢复手动调整和窄屏无障碍。

四端消费回归还修复了 Svelte Portal 的异步挂载竞态：主题容器变化或卸载后，会取消待执行挂载并释放旧实例，避免同一弹层出现两个面板。示例测试页的长标题允许换行，防止测试外壳导致手机页面溢出。

验收结果：累计 93 个组件族、229 个 Story、四端各 608 个公开 LoongArk 值入口（统计不含 Provider）；99 个框架示例通过。Storybook 浏览器回归 29 项通过，8 项四端消费测试另行运行并通过；既有视觉基线 2 项通过。明暗各 229 个默认 Story 的 WCAG 2 A/AA Axe 违规、375px 页面溢出和 transition: all 检出均为 0。九包构建、公开声明、四端 SSR、模型/VI/Token 契约通过，Svelte 为 0 错误、0 警告。浏览器验证使用 Chromium，未穷举所有参数、状态或浏览器。


## RatingGroup 受控值与悬停

星形悬停通过原生highlighted/half状态预览，radio的aria-checked和Tab入口始终对应调用方接受的value。鼠标进入后仍可用方向键、Home、End操作；受控值迟到时同步控件内焦点，用户已移到控件外时不会被延迟回调抢回。Root、RootProvider和useRatingGroup复用同一共享状态机；标签、HiddenInput、表单reset、Field及Locale环境保持Ark契约。Svelte在提供onValueChange时由调用方决定接受值；没有该回调时支持bind:value。自定义问卷评分示例只由Questionnaire提交隐藏字段，避免重复FormData，见[问卷契约](questionnaire.md)。

Select 与 Combobox 的默认浮层宽度同时受触发器和当前视口约束；退出动画保留旧触发器测量时，缩窄窗口也不会扩大页面。Sheet 的 positioner 固定占满视口，在绘制边界内播放滑入和滑出动画；面板贴齐上下边缘，覆盖 Dialog 的居中面板高度与圆角限制，保存或 Escape 关闭后恢复触发器焦点。


## 选择控件的原生表单与焦点

Checkbox、RadioGroup、Switch 的键盘操作由原生输入负责；调用方拒绝更新或表单 reset 时，共享行为在框架提交后恢复当前已接受的原生状态，不重复发送 change，卸载取消等待任务。RadioGroup 的只读状态保持原生值参与提交与键盘焦点，并阻止方向键/空格修改；禁用状态仍排除提交。可见 Control/ItemControl 显示同一焦点环。TagsInput 文本输入的焦点环覆盖整个 Control，标签删除和清除按钮保留独立焦点。未指定输入自身状态时继承根节点 disabled/readOnly；文本输入保持原生禁用或只读语义。隐藏输入 reset 后恢复 Ark 当前 valueAsString，不自行重建标签序列化。

Switch 的 `checked`、`defaultChecked`、`onCheckedChange` 应放在 Root。四端 Root 支持 `name`、`form`、`value`、`required`、`readOnly`、`invalid` 和 `disabled`；保持 Ark 原生提交规则：只有选中的开关提交值，禁用控件不提交，只读保留值并拒绝修改。不要用普通隐藏字段替代 HiddenInput，否则会失去键盘和原生表单语义。

四端 `SelectionControlsExample` 与 RadioGroup 的 `ResponsiveControls` Story 演示可信 Tab/Space/方向键、原生表单、受控拒绝、只读/禁用、三种尺寸、水平/垂直布局、长标题和 RTL。水平 RadioGroup 标题占独立一行，选项可换行；长标签的控件对齐首行，Switch 滑块两端留白一致并随 RTL 镜像。现有 TagsInput 示例使用 `name="frameworks"`，支持原生提交、键盘增删和清除后的输入焦点恢复。

Svelte 的 Checkbox、RadioGroup、Switch、TagsInput 在提供对应变更回调时，由调用方决定是否接受值；未提供回调时继续支持 `bind:checked`、`bind:value`、`bind:inputValue` 和非受控默认值；初始值为 `undefined` 的绑定也在首次交互及原生 reset 时回写父状态。拒绝更新时，可见状态与原生表单值保持一致，不将 Ark 内部绑定更新视为调用方接受。TagsInput 保留 Ark 默认的逗号加空格序列化，也保留自定义 delimiter 契约。

Vue 的四种 HiddenInput 保留原生输入属性类型及 `asChild` 默认插槽；可使用调用方提供的 input，同时复用标签、表单、键盘和状态恢复。节点卸载或替换时清理原生监听。Checkbox 未指定 checked/defaultChecked 时保留 undefined，支持非受控交互及预选默认值；标签间距使用根节点逻辑方向无关的 gap，避免 RTL 文字贴边。

Solid 的 Checkbox/RadioGroup HiddenInput 使用 Ark 原生输入 Props；调用方 ref 与内部同步行为共同绑定同一 input，原生属性和 ref 不会绕过受控恢复。卸载释放监听，重新挂载保留相同的表单契约。


## Field 与 Fieldset 的选择控件组合

Checkbox、Switch 和 TagsInput 未声明的 `disabled`、`readOnly`、`required`、`invalid` 及关联 ID 继承 Field。`undefined` 保留父级默认值；显式 `false` 保留调用方覆盖。TagsInput 的实际文本输入与 Checkbox/Switch 的原生输入共同保留调用方描述、Field 帮助和已挂载错误的关联；子控件独立取消 invalid 时不会继续引用父级错误。Field 输入的外框样式只作用于 Field 自身的 Input/Select/Textarea，避免给嵌套复合输入增加第二层边框。

RadioGroup 使用 Ark 的 Fieldset 契约：继承禁用和错误，直接 legend 为组提供标签，帮助/错误由原生 fieldset 关联；只读与必填由 RadioGroup 自身声明。原生 `fieldset disabled` 约束所有后代，不能用单选项或组的 `disabled={false}` 绕过它。四端 `FieldSelectionExample` 与 Field 的 `InheritedSelections` Story 演示动态继承、单字段覆盖、原生必填阻止提交及错误关联。

TagsInput 在删除等操作后可能有待运行的焦点恢复。用户随后用 Tab 离开时，共享行为保留原生 Tab 已产生的目的地，并阻止过期焦点事件再次驱动状态机；保护覆盖标签外框与输入的 Tab 离开路径。其他有效按键、指针操作、窗口失焦及卸载均同步解除保护，允许调用方在按键处理器内主动聚焦；外部只读选择控件拦截的方向键、空格与 Home/End 没有新的焦点请求，保留当前 Tab 目的地。Solid 在 onMount 后安装原生行为，避免 ref 回调早于属性和父节点就绪；替换节点与卸载清理旧监听。

必填 TagsInput 的序列化字段仍参与原生约束校验；若它是首个无效字段，空值提交被阻止时聚焦可见输入，避免浏览器尝试聚焦隐藏字段。多个字段同时无效或约束在恢复帧前改变时保留原生首错顺序。调用方已取消 invalid 的默认行为时由调用方管理提示与焦点；卸载释放 invalid 监听。错误文本与 Field.invalid 仍按现有受控契约提供。

禁用样式同时识别 Ark 的空值状态标记与 LoongArk 的显式 true 标记；Vue 未提供的部件状态不覆盖原生标记。Field 继承的禁用控件与直接声明 disabled 的控件使用同一套 Token 和交互提示。


## NumberInput / PasswordInput 的 Field 组合

四端根节点及输入部件省略 disabled / readOnly 时保留 Field 上下文；根节点显式 false 可取消对应状态，required / invalid 使用相同的 Ark 契约。原生 Fieldset 的 disabled 约束仍优先于子控件。实际输入的 aria-describedby 合并调用方描述、Field 帮助与已挂载错误，独立取消 invalid 后不引用父级错误。密码显示按钮与数字步进按钮保持原生禁用语义，禁用样式绘制在完整 Control；只读输入保留复制、选择和表单值。

Svelte NumberInputRoot 支持初始 undefined 的 bind:value。未提供 onValueChange 时回写绑定；提供回调时由调用方决定是否接受值，原生显示和 FormData 恢复为当前接受的格式值。NumberInputInput / PasswordInputInput 支持 bind:ref；输入替换和卸载取消旧监听与待运行帧。SSR 保留原生属性与关联 ID，不安装 DOM 行为。

四端 CompoundFieldExample 和 Field 的 CompoundInputs Story 展示动态状态、显式 false、必填首错聚焦、拒绝数值更新、原生提交/reset、长描述与 RTL。必填由浏览器约束校验，业务错误仍由调用方声明 Field.invalid 和 ErrorText，不在组件中引入业务校验规则。桌面示例采用共享行轨道，让两列标签换行时输入仍对齐；窄屏按阅读顺序单列展示。

## 前后缀输入

`InputPrefix` 与 `InputSuffix` 放在 `InputGroup` 中，与可见输入共用外框、控件高度和焦点环；文本前后缀仍是不可交互的 span。`InputSuffix action="clear"` 是有可访问名称的原生按钮，默认继承 InputRoot/Field 的禁用及只读状态。`action="button"` 继承禁用，但只读仍允许复制、查看等非编辑操作；调用方负责具体操作。`disabled` 可显式覆盖继承值，包括 false。禁用输入的前后缀一起降弱，不重复降低内部文字透明度。

四端 `InputAdornmentsExample` 和 InputGroup/States 展示三种尺寸、原生键盘清空、禁用、只读、错误、长标签和 RTL；样式与默认搜索图标复用现有 Token 和 Lucide。

Editable 的 `state` 描边应用于 Preview/Input，Control 保持操作区布局；Root 状态或 Control 兼容状态均使用现有错误/成功语义 Token。四端 `EditableStatesExample` 演示默认、错误、成功和禁用，编辑与提交沿用 Ark 的焦点恢复。

Svelte Editable Preview 未提供内容时显示 Ark 的当前值，提供内容时保留自定义预览；初始 SSR 与提交后的客户端预览采用相同契约。
