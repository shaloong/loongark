# Ark UI 组件与高级能力核对

核对时间：2026-10-03。官方仓库固定在 [28f20ae](https://github.com/chakra-ui/ark/tree/28f20ae0cbe27c1927fc6a86cc69cd06cf194ed7)，目录快照见 [ark-ui-upstream.json](ark-ui-upstream.json)。npm 当前发布的 React/Vue/Solid 是 5.39.2，Svelte 是 5.24.2；本批已从锁定的 5.30.0 / 5.15.0 同步升级至上述发布版。源目录与安装版本分开核对，不把 main 分支源代码视作已安装能力。

## 原目录以外的实际缺口

| 能力 | 原有状态 | 本批处理 |
| --- | --- | --- |
| ImageCropper | 未封装 | 开放 Root、Provider、Context、Viewport、Image、Selection、Grid、Handle 和控制 Hook；例子实际缩放、旋转、翻转、重置、键盘移动与 PNG 导出 |
| JsonTreeView | 未封装；TreeView 不等同于 JSON 类型预览 | 开放 Root、Provider、Tree、Hook；例子实际展开、折叠、动态数据、嵌套数组与文本转义 |
| ClientOnly | 未公开 | 原生客户端渲染与 SSR fallback |
| DownloadTrigger | Attachment 有链接下载，缺少程序生成内容下载 | 原生字符串、Blob/File 和函数数据下载；例子真实下载文本 |
| FocusTrap | Dialog 自带焦点管理，缺少独立焦点约束 | 原生独立约束、初始焦点与结束后恢复；例子检查 Tab 环绕 |
| Format | 未公开 | 数字、字节与相对时间；LocaleProvider 同步公开 |
| Frame | 未公开 | 原生 iframe 环境；示例在 iframe 内创建独立深色 LoongArkProvider |
| Highlight | 未公开 | 原生文本匹配高亮与 Hook；共享样式使用既有语义 Token |
| Presence | 浮层已有内置生命周期，缺少独立封装 | 原生 lazyMount、unmountOnExit、present 与 Hook |
| Collection / Environment / Locale | 部分助手已公开 | 补网格/文件树 Collection 工厂、环境与语言 Provider，不计为新组件族 |
| DateInput / Swap / TOC | 原锁定依赖没有提供，本批升级后已经提供 | 下一批实现四端，仍记录待补 |
| 手势抽屉 | 现有 Drawer/Sheet 基于 Dialog；不具备拖拽关闭、吸附点 | 旧锁定版有 BottomSheet；新版更名 Drawer，需要单独补齐与迁移验证 |

官方 [Ark UI 文档](https://ark-ui.com/docs/overview/introduction) 是行为/API 参考。Portal 在 React/Svelte 是组件，在 Vue/Solid 采用框架原生传送机制；现有 LoongArkPortal 已提供四端局部主题容器，不增加别名。Collection、factory 与 hooks 等辅助模块不混入组件族数量。

## 既有组件高级部件

本批补出 RootProvider、Context、ItemContext、受控 Hook，以及之前未公开的 Checkbox.Group、Combobox.Empty、Listbox.Input/Empty/ValueText、Pagination.FirstTrigger/LastTrigger、NavigationMenu.Viewport/Indicator 等部件。原生类型与状态机保持在 Ark，样式集中在 Primitives；框架层处理渲染和生命周期。Provider 接受 Ark 原生 Props；LoongArk 自定义 `size` 并非 Ark Provider Props，Provider 默认消费 md 样式，特殊尺寸可通过已有 class/style 定制。

[原生部件对照](ark-ui-parts-audit.json)按安装版本记录值部件；[公开模块 API 对照](ark-ui-api-audit.json)包含 Hook 和类型名称。命名空间缺失不代表 Root 缺失，类型/Collection 类也不代表缺少组件。Dialog.Backdrop 已由 LoongArkDialogOverlay 提供；Listbox.Content 已由 LoongArkListboxList 提供，不为等价部件再增加别名。

SegmentGroup 原实现是 ToggleGroup 外观，无法与 Ark SegmentGroup 的 Provider/Item 部件组合。本批统一使用真正的单选 SegmentGroup，补隐藏表单输入、指示器和可访问名称；值从 `string[]` 改为 `string | null`，回调也同步。多选按钮继续使用 ToggleGroup，不把多个勾选值压入单选 API。迁移示例：`value={['overview']}` → `value="overview"`；Item 内组合 ItemHiddenInput 与 ItemText。Svelte Root 同步 `bind:value/ref`；Vue 将四端一致的 value 与 update:value 桥接到原生 modelValue，同时支持 v-model。例子验证程序重置与真实 FormData。

高级例子使用 Hook + RootProvider 控制多选，并通过原生 FormData 提交；分页检查首页/末页与禁用边界。Vue 多选 DOM 更新会把数组写成 select 的单个 value 属性，本批在更新后同步原生选中项，保证状态机值与真实表单一致；同步模型归 Kit，Vue 生命周期归适配层。

Vue/Svelte JsonTreeView 的 npm 发布版在初始化时分割 Props，会保留旧数据；官方 main 已有修复但尚未随上述版本发布。本批通过原生 TreeView Hook 与 JsonTreeView Provider 修正响应式计算：JSON 构建和默认展开模型放 Kit，框架负责计算和生命周期。Svelte 在数据集合更新时只重挂节点，保留父状态机的展开/选中状态；集合只依赖数据，避免展开动作造成节点重挂；节点重挂后恢复仍存在的焦点，用户已移到其他控件时不夺回焦点。Root 保留 Svelte 双向绑定；Vue 转发原生更新事件。SSR 与动态数据回归必须一起通过。

Svelte Frame 在写入文档前保存了旧 body，Portal 会挂到脱离文档的节点。本批使用 iframe load 后的真实文档，并在卸载时清理 ResizeObserver 和待执行帧；Vue Format.Number 补原生遗漏的 Intl 货币、style 与精度选项。新增的 `@zag-js/json-tree-utils@1.43.3` 直接依赖用于 Kit 的 JSON 节点模型，与本批 Ark 的传递版本一致；不引入新的解析库或色板。

`node scripts/audit-ark-coverage.mjs` 在成功构建后可重建两份 API 对照，按四端实际安装路径解析版本，并排除命名空间中的纯类型属性。

## 高级能力仍需持续补齐

公开 Ark 原生能力不代表所有 LoongArk 组合组件的高级场景已经全部交付。继续处理新版组件、手势抽屉及组合模型的明确能力：DataTable 列与服务端数据控制、Chart 序列交互/坐标范围/可访问数据、Questionnaire 条件与校验、消息与附件的操作状态。具体交付必须同步四端示例、逻辑回归和桌面/手机明暗截图；不通过一个布尔“完整”字段掩盖未验收场景。

Linux 手工截图复核修正了裁剪图片顶对齐、手机默认裁剪框越出图片、拖拽命中区域被画成粗白条、分页首尾按钮高度不一致，以及 JSON 导航起点/装饰箭头错误显示焦点框。四端裁剪与 iframe 像素一致；JSON 分隔符空格和 Select 原生箭头有细微差异，保留实际像素对照，不声称四端完全逐像素相同。组件 Context Hook 与 Collection 异步 Hook 也仍需继续复核，不把本批已开放的控制 Hook 误写成所有 Hook 均完整。

本批验证与限制见 [Linux 验收](audits/2026-10-03/ark-ui-linux/acceptance.json)。保留 Windows 基线；系统 Chromium 与 Playwright 固定下载版本分别记录。
