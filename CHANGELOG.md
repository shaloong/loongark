# 变更日志

## Unreleased（当前包清单 0.1.0）

### 按需接入

- 虚拟网格的数据更新在绘制前同步，清空数据时可立即通过 Tab 进入空网格，不再短暂跳过键盘入口。
- 四端新增119个组件族、Provider 与 Collection 子路径，保留根入口和延迟编辑器入口；Solid 条件导出支持各子路径 SSR。
- Provider 使用独立共享样式启动入口，移除基础页面中的无关高级行为依赖。
- Storybook 增加四端快速开始与组件对应引入代码；发布演练覆盖全部子路径类型和真实外部消费。

### 组件与维护

- 联动升级 Ark React/Vue/Solid 至 5.39.3、Ark Svelte 至 5.24.3 及 Zag 至 1.45.0；兼容 Field 错误提示从 aria-errormessage 合并到 aria-describedby 的契约，保留复合输入的提示关联，显式 invalid=false 不再继承父级错误描述。
- 升级 TypeScript 至 6.0.3 并迁移弃用的 baseUrl 和 Node10 模块解析配置；更新 Playwright、Axe 及固定 SHA 的 Pages/Node Actions。Node 类型保留在实际使用的 24 系列，未采用 Node 26 类型。

- 联动升级 React/react-dom 至19.3.0、Storybook及addons至10.6.1，更新React/Svelte构建插件与固定SHA的Actions；Dependabot按运行时与展示工具分组，并为develop PR启用完整验证。

- 修复菜单快速关闭后的过期聚焦任务，四端统一保留关闭后触发器焦点，同时尊重用户移走焦点与卸载。

- 修复 Token 合并的嵌套引用共享、原型键、CSS/HTML 逃逸与循环输入；修复问卷嵌套类型和属性转义，补充富文本标记资源限额与安全回归。
- 更新安全依赖并提高 Vue/Solid/Svelte peer 下限；增加 SSR/扩展安全说明与私密漏洞报告入口。
- 重写 README 与贡献指南，删除历史审计和迭代流水文档，保留实际展示/消费验证依赖的四端 examples。

- 补齐119族组件的四端 Docs 代码、真实 API 缺省值来源、状态 Story 与组合场景；整理当前能力、限制和验收入口。
- 新增四端编辑器独立入口，消除未使用编辑器的首包初始化成本；增加生产包体、SSR、最低 peer、真实 tgz 与大数据/重复挂载测量。
- 修正 Password Input cursor、Checkbox 选中 hover、NativeSelect 箭头/RTL 留白、原生属性类型与 Svelte DatePicker 单元格可选声明。
- 修正放大字体与长文案下 Button 溢出、Marquee 固有宽度、Vue 文本触发器和 Tour 遮挡；四端 Tour 示例明确结束焦点与卸载清理。
- 修正日期已选项 hover 对比度，识别 Ark 空属性状态，统一日期范围、今日与焦点的语义配色。
- main 用于正式 Pages，develop 仅保留临时预览；完善支持矩阵、发布演练与流程。
- 当前框架安全版本与迁移见 [说明](docs/migration.md)。

此前版本历史通过 Git 提交查阅；不将未发布开发提交编造成正式发行版本。
