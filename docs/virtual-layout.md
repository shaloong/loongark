# 二维网格与虚拟瀑布流

`LoongArkVirtualGrid` 用于同时跨行、列滚动的通用网格。表格的排序、过滤、编辑、树结构和批量操作继续使用 `LoongArkDataTable`；这里提供布局与原生内容渲染。

四端采用同一套几何与键盘控制，根入口均提供框架对应的 VirtualGridProps、VirtualMasonryProps 与共享尺寸/详情类型。React/Solid 的 `renderCell` 返回原生节点，Vue 返回 VNode，Svelte 提供 `renderCell` snippet。参数为 `{rowKey,columnKey,rowIndex,columnIndex}`，索引始终对应完整数据。`rowKeys` 与 `columnKeys` 必须各自唯一、非空。`rowSize` 和 `columnSize` 可为像素值或按稳定键/索引返回像素值的函数；默认48和160，属于调用方的尺寸契约，不自动推断单元格内容高度。

`height` 默认320；`width` 默认640，用于 SSR 首窗，挂载后采用实际宽度。`overscan` 默认1。`scrollToRow`、`scrollToColumn` 在值改变时定位对应索引。`label` 与 `dir` 提供名称和方向。语义为 `grid/row/gridcell`，包含完整行列计数与绝对索引；方向键、Home/End、Ctrl/Cmd+Home/End、PageUp/PageDown移动单元格游标。导航模式只让当前单元格参与 Tab；普通原生输入、按钮、选择框、链接和 contenteditable 通过 Enter/F2 进入编辑，Escape/F2 返回单元格导航，组合确认键不会退出编辑。编辑模式中输入保留自身方向键，Tab 可离开网格。显式负 tabindex 不参与自动进入，自定义嵌套 grid/tree/listbox/menu 保留内部键盘管理。数据删除导致焦点节点脱离时，恢复有效游标；已经聚焦到外部控件时不抢回。连续方向键先于绘制时仍累计请求位置，也能继续请求进入目标单元格编辑。虚拟窗口保留活动游标；数据删除后清理无效键。数据和编辑草稿由调用方按稳定键持有，窗口之外的数据不会自动缓存为 DOM。

`LoongArkVirtualMasonry` 用于内容高度不同的长集合，和静态 CSS `LoongArkMasonry` 职责不同。React/Solid/Vue 通过 `renderItem`，Svelte 通过同名 snippet 渲染原生内容，参数为 `{key,index,top,inlineStart,width,height,column}`。`height` 是共享模型的最近高度估算/测量值，不应把它回写为项目 CSS 高度；项目按自身内容自然展开。

`keys` 必须唯一、非空。`minColumnWidth` 默认220，`maxColumns` 默认20，`gap` 为像素几何间距，默认16；项目中的外观使用既有 Token 与基础组件。`estimateSize` 默认180，可为像素值或按稳定键/索引返回值的函数。`overscan` 默认200像素，`scrollToIndex` 的值改变时定位。`width`、`height`、`label`、`dir` 与网格一致。

瀑布流把项目放到当前最短列，通过 ResizeObserver 修正自然高度。未渲染项目继续使用 estimateSize，因此远距离跳转的列位置会随已测量数据修正；同一尺寸与测量缓存使用同一布局算法，调用方应提供贴近内容的估算。首窗会在挂载测量后从 SSR 估算布局重新排布。容器宽度变化后原有高度缓存失效，重新测量并恢复阅读锚点。每列通过二分查找可见项目，DOM 保持完整数据中的顺序；`list/listitem` 带有绝对 `aria-posinset` 与 `aria-setsize`。焦点所在项目在滚动时保留，调用方插入/删除数据沿用稳定键。卸载时释放滚动、焦点、ResizeObserver、MutationObserver 和 RAF。

两种布局均支持 SSR，SSR 只计算首窗，不访问 DOM。空状态、数据加载或请求错误由调用方在布局外使用已有 Empty、Skeleton、Alert 等组件表达。SSR 宽度是估算值，客户端测量后可能改变窗口大小；这不表示浏览器或真实手机已经完成验收。


组合输入、连续操作、受控拒绝、生命周期及放大文字的当前契约与验收限制，见[高级边界说明](advanced-boundaries.md)。
