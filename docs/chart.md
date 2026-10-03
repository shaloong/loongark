# Chart 的标签、缺失数据与系列说明

Chart 使用共享 SVG 模型和 HTML 图例，四端适配只负责渲染与容器 ResizeObserver 的生命周期。默认颜色依次消费 primary、mutedForeground 和 vi.skyBlue；第三个序列使用现有 Sky Blue 强调，未新增调色板。折线同时以实线、长虚线、短虚线辅助区分，完整系列名称在自然换行的图例中显示。

`data/series/labelKey` 保持原 API。`type` 为 line 或 bar，`title` 提供图像名称，`width/height` 可指定几何尺寸；默认测量容器宽度，卸载释放观察器。`labels.empty` 覆盖空状态，`labels.series` 覆盖图例的无障碍名称，未提供字段时采用共享默认值。

数值轴使用紧凑数值，大于等于 1e15 或很小的非零值使用科学记数法。轴留白根据实际标签长度确定；分类轴依据容器宽度减少标签并截短显示，原生 title 保留完整分类名称。每个点/柱的提示包含完整分类、系列名称和原始数值，SVG desc 和显式 aria-description 提供完整数据说明，保持四端一致的无障碍描述。窄屏图例自然换行，不挤压标签。

只有有限的 number 参与绘图，null、缺失、非数值和 Infinity/NaN 不作为 0 绘制。折线在缺失位置断开，柱形省略缺失值；全部缺失、无行或无序列时显示空状态，并把空状态提示写入 SVG desc 提供无障碍描述。0 仍是有效数值。坐标先归一化再计算，避免有限极大正负值相减溢出；使用循环归约，避免大数组展开为函数参数导致异常。

`renderChartSVG` 保留单独 SVG 输出；`renderChartMarkup` 为四端提供 SVG 与共享图例，没有增加 Chart 的组件别名。共享 CSS 归入 Primitives，使用既有尺寸、排版与中性色 Token。

[ChartExample](../examples/react/ChartExample.tsx) 同步 React、Vue、Solid、Svelte，展示八个长分类、多系列、正负数据、柱线切换、清空/恢复与缺失值。独立 Story 补空数据、缺失值和极值；[Linux 验收](audits/2026-10-03/chart-linux/acceptance.json)保留实际截图、回归和环境限制。

图表是信息展示，原生 title/desc 不等同于可交互工具提示或数据表。需要逐行键盘比较时可组合 DataTable；未提供缩放、刷选、实时流、统计插值或第三方 Chart 引擎兼容 API。三种默认颜色循环，超过三系列时可显式传入既有 Token 或合法颜色，不声称任意数量的颜色都会自动唯一。

现代运行时通过 Intl.Segmenter 保留完整 grapheme；旧环境缺少该 API 时，超长轴标签只显示省略号，完整 title/desc 仍保留，组件不因 API 缺失而崩溃。共享模型通过标准 lib reference 声明 ES2022.Intl 类型，不更改 ES2020 编译目标或添加类型桩。
