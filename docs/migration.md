# 迁移说明

以下说明对应当前 develop 的待发布变更；以最终发布的 CHANGELOG 为准。仓库清单0.1.0不等于已经发布 npm。

- Svelte 最低范围从5.20改为5.29。Ark Svelte5.24.2 实际包含 `{@attach}`，最低编译器探针证实5.20失败。使用5.20–5.28的应用需同时升级应用编译器和运行时；不要只升级运行时或忽略 peer 警告。
- 可以使用 `@loongark/react/editors`、`@loongark/vue/editors`、`@loongark/solid/editors`、`@loongark/svelte/editors` 做路由级延迟加载；根组件入口及同步挂载函数保持兼容。Solid 的 node 条件会选择 SSR 文件，Svelte 入口需由应用编译。
- 默认 Checkbox 选中 hover 改为语义中性色，修正了不存在的 `solidHover` Token 回退到蓝色的问题。显式品牌视觉应通过正式 Token 覆盖，避免依赖旧回退色。
- `data-disabled="false"` 不再显示禁止 cursor；真正禁用保持禁止指针。应用自己的自定义控件应使用原生 disabled、空/true 的 data-disabled 或 aria-disabled=true 表达实际禁用。
- NativeSelect 的单选箭头统一为 Lucide，右侧（RTL 左侧）保留 Token 留白；multiple 不绘制单选箭头，forced-colors 恢复系统绘制。Solid/React 的原生事件目标与 Svelte 的原生属性/绑定声明补齐；无需将现有选择组件迁移到自定义 Select。
- Svelte DatePickerTableCell 的 disabled、columns、visibleRange 改为真正可选，只有 value 必填；之前为满足声明而显式传 undefined 的写法仍可使用。
- Button 的长文本现在可以换行，文字放大时增长高度；常规字号保留 Token 最小高度。Popover/Tooltip 的 Vue 文本触发器可以显式关闭 asChild，与对应 API 保持一致。
- 日期的选中、范围、禁用及焦点样式同时识别 Ark 空属性与显式 true，选中 hover 不再出现浅底浅字；焦点与今日指示使用语义 Token。错误输入的文字保持正文色，错误由既有状态边框与语义表达。
- GitHub 默认分支为 main，开发仍在 develop。正式 Pages 不再随 develop 推送改变；开发预览下载 Actions 中的临时 Storybook 产物。

较早高级表格、编辑器、图表与问卷的新增契约，见对应组件 Docs 的四端示例及公开类型；持久化、权限、上传和业务请求不迁入组件侧。
