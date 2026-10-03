# Chart 的标签、缺失数据与系列说明

Chart 使用共享 SVG 模型和 HTML 图例，四端适配负责渲染、受控状态和容器 ResizeObserver 的生命周期；图例监听与重绘状态恢复集中在 Kit。默认颜色依次消费 primary、mutedForeground 和 vi.skyBlue；第三个序列使用现有 Sky Blue 强调，未新增调色板。折线同时以实线、长虚线、短虚线辅助区分，完整系列名称在自然换行的图例中显示。

`data/series/labelKey` 保持原 API。`type` 为 line 或 bar，`title` 提供图像名称，`width/height` 可指定几何尺寸；默认测量容器宽度，卸载释放观察器。`labels.empty` 覆盖空状态，`labels.series` 覆盖图例的无障碍名称，未提供字段时采用共享默认值。

数值轴使用紧凑数值，大于等于 1e15 或很小的非零值使用科学记数法。轴留白根据实际标签长度确定；分类轴依据容器宽度减少标签并截短显示，原生 title 保留完整分类名称。每个点/柱的提示包含完整分类、系列名称和原始数值，SVG desc 和显式 aria-description 提供完整数据说明，保持四端一致的无障碍描述。窄屏图例自然换行，不挤压标签。

只有有限的 number 参与绘图，null、缺失、非数值和 Infinity/NaN 不作为 0 绘制。折线在缺失位置断开，柱形省略缺失值；全部缺失、无行或无序列时显示空状态，并把空状态提示写入 SVG desc 提供无障碍描述。0 仍是有效数值。坐标先归一化再计算，避免有限极大正负值相减溢出；使用循环归约，避免大数组展开为函数参数导致异常。

`renderChartSVG` 保留单独 SVG 输出；`renderChartMarkup` 为四端提供 SVG 与共享图例，没有增加 Chart 的组件别名。共享 CSS 归入 Primitives，使用既有尺寸、排版与中性色 Token。

[ChartExample](../examples/react/ChartExample.tsx) 同步 React、Vue、Solid、Svelte，展示八个长分类、多系列、正负数据、柱线切换、清空/恢复与缺失值。独立 Story 补空数据、缺失值和极值；[Linux 验收](audits/2026-10-03/chart-linux/acceptance.json)保留实际截图、回归和环境限制。

原生 title/desc 不等同于可交互工具提示。未提供缩放、刷选、实时流、统计插值或第三方 Chart 引擎兼容 API。三种默认颜色循环，超过三系列时可显式传入既有 Token 或合法颜色，不声称任意数量的颜色都会自动唯一。

现代运行时通过 Intl.Segmenter 保留完整 grapheme；旧环境缺少该 API 时，超长轴标签只显示省略号，完整 title/desc 仍保留，组件不因 API 缺失而崩溃。共享模型通过标准 lib reference 声明 ES2022.Intl 类型，不更改 ES2020 编译目标或添加类型桩。

## 交互、数值范围与可访问数据表

`interactive` 把图例渲染为原生 toggle button，`aria-pressed` 表示序列是否可见，支持 Tab、Enter 和 Space。`seriesKeys` 受控、`defaultSeriesKeys` 仅初始化；未传两者时展示全部序列，空数组表示全部隐藏。`onSeriesKeysChange(keys)` 通知按原始 series 顺序归一化的选择；受控业务可以拒绝更新。Vue 同时支持 `v-model:seriesKeys`。Svelte 的受控更新通过该回调显式赋值。`disabled` 禁用图例操作，图像与数据表仍可读取。series key 必须非空且唯一；重复和未知选中 key 被归一化。隐藏序列不改变其他序列的颜色和虚线身份，全部隐藏时仍保留按钮以恢复。

`domain={[min,max]}` 固定数值轴，要求有限且递增。图形裁切到范围内，原始值仍保留于 SVG 说明和数据表；折线的跨边界段使用共享有限坐标插值，缺失值仍断开。`labels.range(domain)` 可翻译范围说明，必须为纯函数。未传 domain 时继续自动范围。范围裁切不是缩放或刷选。

`showDataTable` 提供原生 details/summary 与按可见序列生成的 table。完整分类作行标题，caption 使用图表 title，缺失值采用 labels.empty，原始值不随图形裁切。`labels.dataTable` 翻译展开标题，`labels.category` 翻译分类列。展开区通过命名 region 局部横向滚动，不导致页面溢出。图例重绘保留键盘焦点、数据表展开和表区焦点；外部控件获得焦点时不抢回。卸载释放点击/焦点/toggle/指针监听及 MutationObserver 和 ResizeObserver，重新挂载不沿用已销毁实例的展开状态。

四端 ChartAdvancedExample 与 Interactive/DisabledControls Story 展示受控接受/拒绝、全部隐藏、固定范围、原始数据更新和卸载。验收记录见 [图表高级能力 Linux 验收](audits/2026-10-03/chart-advanced-linux/acceptance.json)。
