# Shaloong VI 与组件设计整改

本轮在运行、发布、四端入口和组件补齐之后，继续检查全部现有组件与 Story 的颜色、尺寸、内外边距、动效和窄屏呈现。采用 Shaloong 自有 VI；参考 shadcn 默认示例的简洁层次和控件密度，不引入它的 Zinc/Neutral 调色板。

## 颜色来源

固定 VI 的 8 个色值均保留，并由契约测试锁定。品牌色仍可用于主题覆盖和业务强调，默认界面以 VI 中性色为主。

| VI 中性色   | 固定值    | 默认用途                       |
| ----------- | --------- | ------------------------------ |
| Ink Night   | `#121212` | 浅色文字、主要按钮、深色画布   |
| Stone Gray  | `#3A3A3C` | 悬停与中间灰阶的基础           |
| Lead Gray   | `#767680` | 焦点环、边框和次要文字派生基础 |
| Cloud White | `#F2F2F2` | 浅色次级面、深色文字及主要按钮 |

派生色由 `neutralPalette` 集中生成，采用 sRGB 通道插值并取整，没有另置一套第三方灰阶。纯白是 Cloud White 的亮度扩展，用于画布与高对比前景；错误/成功是独立状态语义。高对比模式使用纯黑与纯白。

| 派生角色      | 结果      | 来源                         |
| ------------- | --------- | ---------------------------- |
| Paper         | `#F9F9F9` | Cloud White → 白，50%        |
| 浅色边框      | `#D9D9DB` | Cloud White → Lead Gray，20% |
| 浅色输入边框  | `#898991` | Cloud White → Lead Gray，85% |
| 浅色次要文字  | `#6E6E77` | Lead Gray → Ink Night，8%    |
| 深色卡片/浮层 | `#1B1B1B` | Ink Night → Cloud White，4%  |
| 深色次级面    | `#242424` | Ink Night → Cloud White，8%  |
| 深色次要文字  | `#A1A1A8` | Lead Gray → Cloud White，35% |

基础灰阶用于调色与边框，组件文字使用 `color.semantic.foreground` / `mutedForeground` / `primaryForeground`。文本不能直接选一个灰阶编号，避免换主题后对比不足。契约检查主要文本色对在 light、dark、high-contrast 下达到 4.5:1，并校验浅色灰阶按亮度递减、深色灰阶按亮度递增。

## 尺寸与间距

| 场景                       | 规范                                               |
| -------------------------- | -------------------------------------------------- |
| 表单 sm / md / lg          | 32 / 36 / 40px，统一 14px 字号                     |
| 按钮 xs / sm / md / lg     | 28 / 32 / 36 / 40px                                |
| 表单水平内边距             | `space.component.compact`，12px                    |
| 标签与输入间距             | `control.fieldGap`，6px                            |
| 常规间距                   | 4 / 8 / 12 / 16 / 24 / 32 / 48px，共享 space token |
| 菜单与选择列表内边距       | 4px；选项采用 6px × 8px                            |
| Popover / HoverCard 内边距 | 16px                                               |
| 日期、颜色面板内边距       | 8px                                                |
| Story 画布内边距           | 桌面 32px，480px 以下 16px                         |

去除 Story 居中布局与重复画布边距；示例宽度受父容器限制。PinInput、分组按钮、分页与筛选栏支持窄屏换行。修正 Select/Combobox 大尺寸遗留的 48px 高度、NumberInput 内部撑高、PasswordInput 大尺寸挤压，以及 Field/NativeSelect 的默认高度。Input 的浮动标签、分组前后缀和只读状态采用同一份样式。三个前后缀 Story 改用已有 InputGroup，清空按钮具有名称且可操作。修正滑块多尺寸示例的容器收缩、刻度组无高度，以及垂直刻度的网格定位。Tabs、Menubar 与 Collapsible 去除多余控件边框，Splitters 去除原生按钮边框，ScrollArea 只显示实际溢出方向的滚动条。

## 动效与关闭语义

交互反馈使用 120ms，浮层进入/折叠展开使用 200ms，退出使用 150ms。Sheet 横向滑入，Drawer 纵向滑入；浮层使用短距离移动、淡入和轻微缩放。无限旋转与脉冲分别使用 800ms / 2000ms token。

移除 `transition: all`，仅声明需要变化的属性。系统减少动态效果规则集中到 Theme，覆盖伪元素，并保留嵌套 `motionPreference="force"` 的明确覆盖。Storybook 提供“跟随系统 / 展示动效”切换。

修正主题构造时过早挂载导致 Portal 容器移除的问题；构造保持无 DOM 副作用，实际挂载由生命周期执行。修正 Dialog 默认 scale 选择器的状态范围，并确保原生 `hidden` 在退出完成后生效。弹层关闭后回到触发按钮。Sheet 内容按自然高度从顶部排列，避免整屏网格把标题、描述与表单平均拉开；Popover 关闭按钮使用同一套中性控件样式。

## 清理与结构

按钮、输入框由重复基础样式和覆盖样式收敛为单一实现；删除未使用的 `neutral-controls.ts`。30 处重复减少动态效果规则收敛到 Theme。FilterBar 去除固定 `isDark = false` 和无法进入的分支，直接消费语义变量。四端继续共享 Primitives/Kit，适配层只承担框架渲染和语义默认值。

无障碍扩展检查同时修正：上传区嵌套交互、滚动区键盘聚焦、Splitters 拖柄名称、Steps 部件角色与内容关联。变体检查补充修复分页逗号选择器造成的禁用样式误用、禁用标签的文字对比、进度演示标签和树复选框嵌套交互。所有修正均保留组件公开入口和 Story 覆盖。

## 验收与证据

验收对象为 78 个组件族、203 个 Story；浅色和深色各遍历一轮 375px 页面宽度与最终 padding/margin/gap/transition 属性，保存每个 Story 的桌面截图及每族默认展示的窄屏截图。整改前每种模式有 64 个 Story 页面溢出、23 个 Story 使用 `transition: all`。

| 最终检查                                    | 结果                                                            |
| ------------------------------------------- | --------------------------------------------------------------- |
| 明暗各 203 个 Story，375px 页面溢出         | 均为 0（整改前各 64）                                           |
| 明暗各 203 个 Story，transition: all        | 均为 0（整改前各 23）                                           |
| 明暗默认展示 Axe WCAG 2 A/AA                | 各 203 个 Story，0 违规                                         |
| Storybook 完整回归                          | 25 通过；8 个四端用例在独立框架套件执行                         |
| React / Vue / Solid / Svelte 发布消费与示例 | 8 通过，91 个既有示例全部运行                                   |
| 最后布局修正后的定向复验                    | 11 通过（表单、前后缀、滑块、30 种弹层动效组合和全 Story 测量） |
| 视觉基线                                    | 人工检查后更新，2 项再次通过；旧基线保留                        |
| 构建、Token 契约、发布声明、四端 SSR、CLI   | 全部通过；Svelte 0 错误、0 警告                                 |

本轮计划补齐的 38 个组件族已完成，合计 78 个组件族；四端公开 LoongArk 值导出各 574 个一致。已完成构建及发布产物检查，未执行 npm 发布。

人工检查包含明暗默认组件与其他 Story 的 26 张联系表；由最终桌面截图重新生成。示例见 [浅色默认](https://github.com/shaloong/loongark/blob/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits/2026-10-02/design-quality/after-light-default-01.png)、[深色默认](https://github.com/shaloong/loongark/blob/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits/2026-10-02/design-quality/after-dark-default-01.png)、[滑块与 Tabs 变体](https://github.com/shaloong/loongark/blob/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits/2026-10-02/design-quality/after-light-variants-07.png)、[窄屏 Sheet 展开](https://github.com/shaloong/loongark/blob/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits/2026-10-02/design-quality/expanded/light/sheet.png)。

最终机器结果见 [设计验收记录](audits/2026-10-02/design-quality/acceptance.json)，完整测量见 [浅色](https://github.com/shaloong/loongark/blob/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits/2026-10-02/design-quality/after/light/metrics.json) / [深色](https://github.com/shaloong/loongark/blob/c6e0d14eb282c985a9dd4eab0f8d7b32d1668262/docs/audits/2026-10-02/design-quality/after/dark/metrics.json)。截图对照和展开状态证据保存在同一目录；此前运行与架构整改见 [整改与验收](remediation.md)。

自动化检查覆盖默认展示、关键表单密度、浮动标签、五类弹层的三种动效策略、四端真实发布产物与既有示例。无障碍覆盖全部 203 个 Story 的明暗默认状态；不将这些结果解释为每个组件的所有组合状态、所有浏览器或所有运行时版本均已认证。视觉检查用于识别布局缺陷，不能以自动化结果保证主观设计品质与任一库完全等同。

复验：`pnpm verify`、`pnpm check:contracts`、`pnpm check:publication`、`pnpm check:svelte`、`pnpm test:frameworks`、`pnpm test:e2e`、`pnpm visual:test`。

参考：[shadcn Button 默认样式](https://ui.shadcn.com/docs/components/base/button)、[MUI 间距体系](https://mui.com/material-ui/customization/spacing/)、[MUI 动效体系](https://mui.com/material-ui/customization/transitions/)。这些作为密度、层次和状态反馈参考；品牌色源由本项目 VI 决定。
