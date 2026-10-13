# 本地化日期与日期时间

`parseLocalizedDate(text, { locale })` 返回 Gregorian `CalendarDate`，无法完整解析时返回 `undefined`。四端共享同一入口。接受严格 ISO 日期、指定 locale 的数字日月顺序、Intl 的完整/缩写月份名称和本地数字；中文/日文年月日也可使用。`en-US` 的 `10/6/2026` 与 `en-GB` 的 `6/10/2026` 都对应2026-10-06。

调用方必须明确 locale，不猜测日月顺序、两位年份或相对日期。无效闰日和超出年月日范围的文本被拒绝。此接口采用 Gregorian 日历，不声称支持任意历法自由文本；它不使用 `Date.parse` 的浏览器启发式规则。

可把此函数接入已有 DatePicker 的 `parse` 契约；DatePicker 原生的日期约束、格式与提交行为保持由其状态机管理。独立文本字段可在提交时调用此函数，再以现有 Field/Input/ErrorText 呈现解析错误。

`parseDateTime` 接受没有时区的 ISO 日期时间并返回 `CalendarDateTime`；`parseZonedDateTime` 接受附有 IANA 时区的 ISO 文本并返回 `ZonedDateTime`。二者遇到无效格式或数值会抛出错误，调用方应处理错误。单纯 `parseDate` 仍只解析日期。

日期与时间组合复用 `LoongArkDateInputRoot`，以 `granularity="minute"` 或 `"second"`、`hourCycle={12}` 或 `{24}` 提供原生分段编辑；`timeZone` 与带时区值明确时区。隐藏表单值默认使用本地化格式；需要保留完整时分秒和显式时区时，使用原生 `format={(date) => date.toString()}` 契约并通过已有 HiddenInput 提交 ISO 值，不新增重复的 DateTime 组件族。

Kit 显式声明 @internationalized/date 3.12.4，复用 Ark 已采用的日历值与严格 ISO 解析，避免浏览器启发式解析和新的日期库。四端 DateTimeExample 使用独立文本提交呈现错误，保留已编辑的时分秒；切换显式时区保留墙上时间，重置为单独操作。

React/Solid 以 `value` 与 `onValueChange` 接入受控状态；Vue 使用 `modelValue` 与 `onUpdate:modelValue`，Svelte 使用 `bind:value`（可使用 Svelte 5 的 getter/setter 绑定），确保外部重置、键盘编辑和原生 HiddenInput 使用相同的值。

Input/Textarea 子控件未指定 disabled/readOnly 时继承 Root 状态，显式指定时保留原生覆盖契约；Svelte 的 required 同样继承父级。Vue Root 使用原生 readOnly 属性，四端均提供真实只读 DOM 语义。

设置 locale 的同时，在日期控件外使用已有 `LoongArkLocaleProvider locale={locale}`，让原生内部 Control、SegmentGroup 和键盘方向一起继承 RTL；只给 DOM Root 添加 dir 属性不足以配置所有框架的原生状态机。

DatePicker 浮层支持打开时切换桌面与窄屏尺寸；定位器默认使用 Ark 的坐标进行 left/top 布局，避免 WebKit 保留旧滚动范围。调用方传入的 Positioner style 优先于默认布局样式，显式 transform 保留原有变换定位方式，完全自定义定位时仍需自行保证视口边界。
