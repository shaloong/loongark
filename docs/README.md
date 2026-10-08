# 使用与维护文档

先通过 [Storybook](https://shaloong.github.io/loongark/) 操作组件、查看状态及四端代码，再按下面的主题接入。正式展示对应 main，develop 的新功能需稳定发布后进入正式站点。

## 开始使用

- [四端接入与仓库说明](../README.md)
- [组件目录](component-coverage.md) / [机器清单](component-coverage.json)
- [能力与限制](capabilities.md)
- [主题与 SSR](theme-system.md) / [图标](icons.md)
- [版本、性能与发布](releases.md) / [迁移](migration.md) / [变更日志](../CHANGELOG.md)
- [安全边界](security.md) / [漏洞报告](../SECURITY.md)

## 组件与组合

- [表格](data-table.md) / [编辑器](editors.md) / [图表](chart.md)
- [问卷](questionnaire.md) / [消息与附件](conversation.md)
- [虚拟布局](virtual-layout.md) / [异步集合](async-collection.md)
- [日期本地化](localized-date.md) / [Drawer](drawer.md)
- [选择与输入](selection-inputs.md) / [动作与媒体](action-media.md)

## 参与维护

- [贡献与验证](../CONTRIBUTING.md)
- [四端示例职责](../examples/README.md) / [Storybook 维护](../stories/README.md)
- [视觉规范](design-quality.md) / [高级行为边界](advanced-boundaries.md)
- [Ark UI 封装边界](ark-ui-coverage.md) / [展示部署](storybook-hosting.md)

逐次审计、失败追踪和优化流水记录不保存在使用文档中；当前限制直接写在相关文档，过程产物使用临时 Artifact，历史变更通过 Git 与 CHANGELOG 追溯。
