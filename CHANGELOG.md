# 变更日志

## Unreleased（当前包清单0.1.0）

- 补齐119族组件的四端 Docs 代码、真实 API 缺省值来源、状态 Story 与组合场景；整理当前能力、限制和验收入口。
- 新增四端编辑器独立入口，消除未使用编辑器的首包初始化成本；增加生产包体、SSR、最低 peer、真实 tgz 与大数据/重复挂载测量。
- 修正 Password Input cursor、Checkbox 选中 hover、NativeSelect 箭头/RTL 留白、原生属性类型与 Svelte DatePicker 单元格可选声明。
- 修正放大字体与长文案下 Button 溢出、Marquee 固有宽度、Vue 文本触发器和 Tour 遮挡；四端 Tour 示例明确结束焦点与卸载清理。
- 修正日期已选项 hover 对比度，识别 Ark 空属性状态，统一日期范围、今日与焦点的语义配色。
- main 用于正式 Pages，develop 仅保留临时预览；完善支持矩阵、发布演练与流程。
- Svelte 最低版本修正为5.29，迁移原因见 [说明](docs/migration.md)。

此前版本历史按实际提交与 [验收记录](docs/acceptance.md) 查阅；不将未发布开发提交编造成正式发行版本。
