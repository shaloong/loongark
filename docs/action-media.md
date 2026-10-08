# 浮动动作与媒体布局（2026-10-03）

FloatingActionButton、SpeedDial、ImageList、Masonry，四端共用 Kit 的模型、样式和键盘控制。颜色沿用 Shaloong VI 语义 Token，未添加新调色板。浮动动作参考 [MUI FAB](https://mui.com/material-ui/react-floating-action-button/) 与 [Speed Dial](https://mui.com/material-ui/react-speed-dial/)，媒体组合参考 [MUI Image List](https://mui.com/material-ui/react-image-list/)。

## FloatingActionButton

公开入口 `LoongArkFloatingActionButton` 为原生 button，默认 type=button，保留 disabled、aria-label、事件与原生按钮属性。size 为 sm/md/lg，对应默认 Token 下 40/48/56px；variant 为 primary/secondary，extended 提供带文字的胶囊形按钮。单图标按钮需提供 aria-label。页面固定位置及安全区间距由调用方通过 style/class 或容器设置；组件可以放入已有 Portal。

## SpeedDial

公开入口 `LoongArkSpeedDial` 接收必填 label、actions。每个动作包含唯一非空 value、label、可选字符串 icon、disabled。动作文案始终显示，支持触屏；推荐用于少量相关操作。direction 支持 up/down/left/right，调用方应给展开方向预留空间。菜单在组件本地布局，不自动翻转或挂到全局 body。

使用 defaultOpen 控制初始非受控状态；open 与 onOpenChange({open}) 支持受控状态。Vue 另支持 v-model:open，Svelte 支持 bind:open。onSelect({value}) 返回动作值，选择后关闭并返回触发器焦点；禁用项不会参与方向键遍历。

按钮具有 aria-haspopup、aria-expanded、aria-controls；容器使用 menu，原生动作按钮使用 menuitem。Enter/Space 切换，任意方向键可打开并进入动作；方向键循环遍历，Home/End 到首尾。Escape 关闭并恢复触发器焦点；Tab、焦点离开和外部按下关闭，保留自然页面焦点。监听与待执行焦点任务在卸载时清理。旋转图标和轻量展开动效使用现有 motion Token，并遵循主题的减弱动效策略。

## ImageList

公开入口 `LoongArkImageList`、`LoongArkImageListItem`、`LoongArkImageListCaption`，以 CSS Grid 排列。Root 提供 columns（1–12，默认 3）、gap（现有间距 Token）、rowHeight（像素，默认 4 × control.height.lg，即 160px）、responsive（默认 true）。Item 提供 columnSpan、rowSpan；列跨度限制在可用列内，窄屏自动收缩。

Item 是 figure，Caption 是 figcaption，Caption 应作为 Item 的直接子组件。图片使用原生 img，保留 alt、width、height、srcset、loading 等浏览器属性；网格裁切采用 object-fit:cover。Root/Item 提供 list/listitem 语义。需要交互时，在内部使用有名称的原生链接或按钮。

## Masonry

公开入口 `LoongArkMasonry`、`LoongArkMasonryItem`，提供相同 columns/gap/responsive。图片保留自然比例，不做图片下载、虚拟化或 JavaScript 高度测量。Item 防止跨列拆分。

实现采用 [CSS 多列布局](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Multicol_layout)，按列从上到下排列，并保留 DOM/键盘顺序；不是按行逐项填入最短列的 JavaScript 算法。适合非排序敏感的图片与信息卡片。排序敏感的网格使用 ImageList/Grid。

两种布局在 640px 以下最多两列、400px 以下单列；responsive=false 保留指定列数。ImageListCaption 限于 ImageListItem，MasonryItem 的说明可使用原生 figcaption。

## 验证

四端 ActionMediaExample 验证受控菜单开关、禁用与跳过、键盘选择、Escape/外部关闭、表单隔离、原生图片比例、跨行跨列和手机单列。服务端回归检查新按钮、隐藏菜单及媒体内容；共享模型回归检查数量边界、列数继承和动作键唯一性。

首次全量测量捕获日期范围浮层在缩小窗口后的异步定位中间态。测量现在等待浮层位置稳定后再断言宽度，并新增明暗反复缩放回归；受影响的全量布局检查重跑通过，初始失败记录和后续验证分别保留。九包构建、49 个 Token 契约、公开声明、四端 SSR、Svelte 检查和工作区规范校验通过；未执行 npm 发布。
