# 变更日志

## 未发布

- 发布后自动等待 registry 的精确版本、安装清单、latest 与 provenance 可见，核对原始 tarball，并从 registry 执行四端最低版本消费验收；重跑先核对已有版本内容，只发布缺失包，已有附件内容一致时保留。
- 新增四端工单工作台组合示例，包含筛选、表格选择、弹窗校验、草稿重置、异步保存失败重试、请求取消与状态通知。
- 修复 Solid Dialog 关闭按钮的公开类型，保留 Ark 的原生 button 属性和引用类型。

## 0.1.0

首次发布版本：包含 React、Vue、Solid、Svelte 四端适配，以及共享 Token、主题、Primitives、Kit 和 CLI。支持版本与验收边界见 [发布指南](docs/releases.md)，接入注意事项见 [迁移说明](docs/migration.md)。

### 按需接入

- 虚拟网格的数据更新在绘制前同步，清空数据时可立即通过 Tab 进入空网格，不再短暂跳过键盘入口。
- 四端新增119个组件族、Provider 与 Collection 子路径，保留根入口和延迟编辑器入口；Solid 条件导出支持各子路径 SSR。
- Provider 使用独立共享样式启动入口，移除基础页面中的无关高级行为依赖。
- Storybook 增加四端快速开始与组件对应引入代码；发布演练覆盖全部子路径类型和真实外部消费。

### 组件与维护

- 修复 React 富文本编辑器在渲染提交延迟时把已接受的输入回滚的问题，保留受控拒绝、输入规则与外部文档替换行为。
- 修复 WebKit 富文本工具栏及链接操作的跨帧点击失效：标签未变化时保留文字节点，四端均保留真实指针操作。

- 修复 React Select 公开别名和 Svelte Dialog/PinInput/Switch 组合入口遗漏的自动样式；样式绑定守卫覆盖四端公开转发入口，Story 验收使用通用主题就绪标记；下载 Story 使用真实 Button 组合，保留自动样式和深色对比。

- 补齐 Svelte TypeScript 导出与 Ark namespace 的自动样式声明，修复 Tour 遮罩拦截关闭按钮等未挂载样式的组合入口；样式守卫检查四端 TS 与 Svelte 转发叶子，日常回归覆盖四端 Tour 的三主题、窄屏、真实指针关闭与焦点恢复。

- 自动样式保留 Menubar 等组合别名自身的布局规则，并显式加载 DataTable 内部 Table 滚动容器样式，修复菜单栏布局缺失与 Svelte 表格窄屏溢出；同步四端基础组合配方，恢复 React/Vue 的原生菜单触发按钮，lint 检查生成示例与配方一致。

- 默认四端 Provider、Vue 插件及 Svelte theme store 自动随组件入口裁剪样式，支持根入口、子路径、动态导入、共享所有权及原有注册覆盖；将 Kit 共享 CSS 移到 Primitives，保留完整样式兼容入口与显式 Core。

- CI 复用同一提交的浏览器生产者 Artifact，保留日常关键交互与原生 Safari，完整示例、Story 审计和外部消费演练保留为完整验收；避免 develop → main 重复运行，增加 Node22.12 与当前26的构建和四端 SSR 兼容检查。

- 四端新增 `provider-core` 与显式 Primitives 样式入口，复用 Provider 的主题生命周期、级联顺序、焦点、动效和 CSP；基础页面可显式选择共享 CSS，保留现有 Provider 调用方式。增加真实生产包体、四端 SSR、三主题、共享所有权与卸载回归。

- 共享 Theme 和四端 Provider 支持可选样式 `nonce`，在 DOM 插入前配置变量、Primitives 与 Kit style；增加浏览器实际 CSP 响应头的允许/拒绝、主题更新与四端交互回归，说明 SSR、内联属性和第三方引擎的独立边界。

- React 运行时模块保留 `use client` 边界，支持 Next.js App Router 服务端页面直接导入根入口及按需命名组件；增加真实 tarball 生产构建、SSR 样式与水合交互回归，纯日期工具仍可在服务端使用。

- Playwright 类型检查新增源码覆盖守卫，拒绝被配置静默排除的测试文件，覆盖入口导入的辅助模块及独立 Svelte 编译单元。

- ColorPicker 四端复用固定明暗 Token 的双色选中轮廓，修复深色 Deep Blue 标记低对比；保留独立键盘焦点及边缘完整绘制，增加高对比主题、系统强制颜色和桌面/模拟手机回归。

- 完整检查 Playwright 浏览器测试与四端消费源码，独立解析 React/Solid JSX 和 Svelte 组件；修正 DOM 类型、测试参数与生成示例的挂载/选择边界，并纳入 CI。

- 四端 DatePicker 默认以 left/top 布局定位，修复 WebKit 缩屏与入场动画重叠时保留旧滚动范围的问题，并保留自定义 transform 契约；ColorPicker 对比度验收等待实际淡入完成，保留最终状态的 WCAG AA 检查，并将 Vue 颜色示例的色板与其余三端 VI 对齐，补齐四端日期示例的打开图标。

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
