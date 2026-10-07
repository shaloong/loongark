# Drawer 方向、吸附与手势

既有 `LoongArkDrawer` 的 Root、RootProvider、Stack、Portal、Grabber 等部件沿用 Ark 原生 API；不增加方向别名或第二套拖动控制器。四端 `DrawerDirectionsExample` 和 Directions Story 展示全部逻辑方向与明暗/窄屏布局。

`swipeDirection` 是关闭方向：`down` 贴底，`up` 贴顶，`start` 和 `end` 使用文字方向对应的边缘。`LocaleProvider locale="ar-EG"` 使逻辑 start 贴右、end 贴左；单独设置 DOM `dir` 不能替代原生上下文。

`useDrawer` 必须在 DrawerStack 子组件中调用。React 直接传配置，Vue 传配置或 computed，Solid/Svelte 使用配置 getter；RootProvider 分别接收 React 返回值、Vue `.value`、Solid/Svelte accessor。滑动和焦点/浮层生命周期由原生实现负责，框架层负责部件渲染与事件绑定。

`snapPoints` 使用原生长度：大于 1 的数字表示像素，0–1 数字按视口计算，字符串支持原生 CSS 长度。不要把 `0.5` 误当成面板高度的一半。示例纵向使用 `240px/480px`，侧向使用 `256px/320px`。`setSnapPoint` 可提供等效按钮操作；允许用户只使用键盘而不拖动。非受控关闭完成后吸附点回到 defaultSnapPoint；需要跨次打开保留时由调用方控制 snapPoint。吸附改变可见长度，不会自动重排内容；方向示例用共享滚动视口适应原生吸附偏移，保证紧凑状态下内容可滚动。共享示例行为在吸附后的视口尺寸变化和拖动结束时，将已聚焦控件完整滚回可见区域；拖动中不干预，打开/关闭时由各框架挂载和释放观察器及帧任务。

手柄使用可命名的 group 语义；指针拖动的等效操作由吸附与关闭按钮提供，不给装饰手柄增加无法操作的键盘角色。顶边与侧边的手柄放在可见自由边，半开后仍能继续拖动。

Grabber 在 Ark 原生启动拖动后，通过共享行为取消主鼠标/触控笔的兼容默认事件，避免移动手柄下方的页面文字被意外选中；用户指针回调、ref、asChild 和触摸流程继续透传；附加手柄交互应使用指针事件，兼容鼠标事件可能因默认行为取消而不产生。只限制手柄的文本选择，内容正文仍可正常选择；不增加第二套手势状态机。

提供 Title 与 Description 以建立弹窗名称和说明。内容中的输入使用原生 Label；Escape、关闭按钮及滑动关闭都应恢复对应触发器焦点。嵌套 Drawer 继续复用既有 SnapPoints Story，不改变其业务内容。

减弱动效模式的 Drawer 退出动画设为零时长，让原生 Presence 立即卸载，避免极短动画先结束而监听尚未建立；强制动效模式仍保留原动画。

触摸模拟和 375px 视口不等同真实手机；Linux WebKit 不等同原生 Safari。验收清单按实际平台分别保持开放。
