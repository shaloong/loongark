# LoongArk 文档

main 用于稳定版本与正式 Storybook；develop 用于日常开发和临时预览。当前组件能力与限制先看下面三份文档，不必从历史验收记录或截图判断是否适用。

- [当前能力与限制](capabilities.md)：常规/高级能力、默认视觉、业务职责和验证边界。
- [当前验收索引](acceptance.md)：各批次对应源码、实际范围与未验收项。
- [支持版本、性能与发布](releases.md)：最低版本实测、可复测探针、打包和正式发布顺序。
- [迁移说明](migration.md) 与 [CHANGELOG](../CHANGELOG.md)。
- [在线 Storybook](https://shaloong.github.io/loongark/)：状态交互、四端同场景代码、API 默认值来源与组合用法；正式站点仅在 main 发布节点更新。

## 接入与设计

四端应用根挂载对应包的 LoongArkProvider。共享行为与模型位于 Kit，共享样式位于 Primitives，框架适配负责渲染与生命周期；事件和受控绑定保留各框架语法。

- [组件覆盖](component-coverage.md) / [机器清单](component-coverage.json)
- [主题系统](theme-system.md) / [图标](icons.md) / [设计质量](design-quality.md)
- [表格](data-table.md) / [编辑器](editors.md) / [高级边界](advanced-boundaries.md)
- [问卷](questionnaire.md) / [虚拟布局](virtual-layout.md) / [异步 Collection](async-collection.md)
- [日期本地化](localized-date.md) / [Drawer](drawer.md) / [表单组合](selection-inputs.md)
- [Storybook 部署](storybook-hosting.md) / [开发与验证](../CONTRIBUTING.md)

## 历史记录

[历史架构与验收正文](history.md) 保留原记录；[高级能力清单](advanced-capabilities.md)、[Ark 覆盖](ark-ui-coverage.md) 和 [迭代记录](sprint-plan.md) 用于追溯。过程文件的保存规则见 [验收目录说明](audits/README.md)，截图、日志和逐次性能报告不进源码仓库。
