# LoongArk 整改与验收

后续全量设计检查、VI 灰阶派生、间距与动效清理见 [设计质量整改](design-quality.md)；本页保留首轮运行、架构与补组件的验收范围。

视觉基准为 shadcn 的中性默认界面。固定 VI 保留为基础调色板，默认控件使用黑白灰，品牌预设使用 Sky Blue；错误和成功使用独立语义色。

## 顺序

- [x] 修运行与发布：修复旧 Ark 调用、日期浮层尺寸、Vue/Solid 入口、Svelte 源码及声明发布。
- [x] 修主题与表单语义：明暗与高对比模式、主题作用域及生命周期、Field 标签与错误关联、隐藏表单控件、弹窗关闭语义。
- [x] 统一核心视觉：共享控件高度、圆角、图标、边框、焦点环、浮层；默认中性主题与可选 VI 品牌主题。
- [x] 四端回归：真实 dist 消费、公开类型、SSR、绑定和键盘交互、91 个现有组件示例、375px 窄屏及 Axe。
- [x] 补组件：原计划 9 项、常规缺口 25 项和独立组合入口 4 项；共新增 38 族，现有 78 族均有四端入口。

## 整改结果

| 维度       | 整改前                                                        | 整改后                                                                                                     |
| ---------- | ------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Storybook  | 164 个故事，31 个首屏错误                                     | 203 个故事，运行错误、按钮嵌套与页面横向异常检查通过                                                       |
| 组件覆盖   | 40 族，原计划与常规目录存在缺口                               | 78 族，React/Vue/Solid/Svelte 的 574 个公开 LoongArk 值导出一致                                            |
| 发布与类型 | Vue/Solid 导入失败，Svelte 发布遗漏源码声明；旧 shim 掩盖问题 | 真实依赖构建、发布入口及本地公开声明通过；四端 SSR 通过                                                    |
| 主题       | 明暗语义不完整，作用域和卸载存在问题                          | light/dark/high-contrast、动态覆盖、多个主题、ShadowRoot、Portal 和引用计数验证通过                        |
| 表单与交互 | 标签/错误关联、隐藏表单控件及关闭弹窗语义不完整               | Input Field 语义、disabled、键盘选择、Escape 与回焦、表格操作和确认弹窗验收通过                            |
| Token      | 有失效路径与硬编码外观                                        | 49 个 Primitive Token 契约和共享样式 CSS 变量引用全部有效                                                  |
| 示例支持   | React 故事覆盖，其他框架缺少真实运行证据                      | React 25 个、Vue/Solid/Svelte 各 22 个组件示例运行通过；补颜色面板、受控 Steps、Listbox 选择及嵌套按钮检查 |

修复中的额外回归包括确认弹窗 Action/Cancel 定位重叠、Vue 受控 Steps 事件未更新、Svelte 自定义树节点泛型、Sidebar 展开裁切、ColorPicker 色值换行与色域背景高度。

## 验收命令与范围

| 命令                                                                          | 验收内容                                                                                             |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `pnpm verify`                                                                 | 仓库结构检查、真实类型项目引用、九个包构建                                                           |
| `pnpm check:contracts`                                                        | 模式/VI/Token 契约、CSS 变量、四端导出一致性、DataTable 和 Chart 边界                                |
| `pnpm check:publication`                                                      | 真实发布入口、本地公开声明、React/Vue/Solid/Svelte SSR 与服务端主题样式收集                          |
| `pnpm check:svelte`                                                           | Svelte 源码与现有示例：0 errors、0 warnings                                                          |
| `pnpm test:frameworks`                                                        | 8 项四端浏览器回归，包含 91 个现有组件示例；核心消费场景与展开的颜色面板 Axe 均无违规                |
| `pnpm storybook:build`                                                        | 静态 Storybook 构建                                                                                  |
| `node scripts/run-playwright.mjs --project=chromium --workers=2`              | 11 项 Storybook 回归，遍历 203 故事、78 个默认组件展示，检查明暗/高对比展示与窄屏；展示页 Axe 无违规 |
| `node scripts/run-playwright.mjs --project=chromium-visual --workers=1`       | 2 项视觉基线及展开弹窗 Axe 回归                                                                      |
| `node packages/cli/dist/index.js extract --dir dist/tokens --format css,json` | 导出 CSS/JSON Token                                                                                  |
| `node packages/cli/dist/index.js verify --dir dist/tokens`                    | 校验 Token 产物                                                                                      |

Storybook 任务中的 8 个四端测试按设计跳过，由独立 `test:frameworks` 任务执行。公开声明检查启用真实依赖类型，并仅以本仓库声明的诊断作为失败条件；不将上游 node_modules 的全部类型诊断称为已修复。

实际浏览器为 Windows Chromium；运行时为 React 19.2.1、Vue 3.5.25、Solid 1.9.15、Svelte 5.45.2。Ark React/Vue/Solid 为 5.30.0，Svelte 为 5.15.0。未逐个验证 peer 范围内所有历史版本，也未声明所有组件的每一种交互状态均经过 Axe 或逐像素跨框架对照。

默认视觉采用中性语义色与统一尺寸，参考 shadcn 默认示例的简洁层次；不是对远程页面的像素级复刻。VI 保留固定基础值，品牌语义色可为前景对比度进行衍生。

## 架构与发布整理

保留 Tokens → Theme → Primitives → Kit → 四端 Adapters 的分层。组件 CSS、布局元数据、数据模型和菜单栏焦点逻辑共享；框架层负责渲染与事件。删除一次性迁移脚本和冗余检查配置，统一源码格式。构建产物与 tsbuildinfo 从版本控制中退出，源码目录不再混入生成 JS。

旧类型桩及源码目录的生成物共 163 个文件，在移除前已保存到 [归档 ZIP](audits/2026-10-02/legacy-generated-sources.zip)，并逐文件校验 [SHA-256 清单](audits/2026-10-02/legacy-source-hashes.json)。原始视觉基线也已保存，避免覆盖历史证据。历史审查报告保持原样，反映整改前状态。

发布方面已修复构建产物、入口、ESM 引用、Solid DOM/SSR 分离和 Svelte 资产复制；本轮未执行 npm registry 发布。

## 交付边界与证据

本轮审查要求的传统组件入口缺口为 0；额外 AI 专用组件不在此次范围。Chart 是自适应 SVG 柱状/折线图，DataTable 使用标量行模型，Drawer 为底部模态抽屉；不提供 Recharts/Vaul 的完整高级能力或第三方 API 兼容。详细能力见 [组件覆盖](component-coverage.md)。

- [整改前审查](audits/2026-10-02/review.md)
- [浅色中性组合展示](audits/2026-10-02/gallery-light.png)
- [深色中性组合展示](audits/2026-10-02/gallery-dark.png)
- [深色 375px 窄屏](audits/2026-10-02/gallery-dark-mobile.png)
- [展开颜色面板](audits/2026-10-02/color-picker-open.png)
- [78 个默认组件截图](audits/2026-10-02/after-components/)
- [最终机器验收记录](audits/2026-10-02/acceptance.json)

固定 VI：Sky Blue #006EFF；Deep Blue #0A3565；Dawn Blue #5AC8FA；Coral #F58220；Cloud White #F2F2F2；Lead Gray #767680；Stone Gray #3A3A3C；Ink Night #121212。

新增构建依赖用途：babel-preset-solid 与 @babel/core 将保留的 JSX 编译为真实 Solid DOM 运行时；vite-plugin-solid 与 @sveltejs/vite-plugin-svelte 构建四端消费样例；@types/react 与 @types/react-dom 用于真实外部类型检查。

svelte-check 检查 Svelte 源组件及公开属性；Prettier 统一适配层和文档格式。

验收针对真实 dist 和实际依赖；旧类型桩已归档，不再参与检查。

新增依赖：prettier-plugin-svelte 统一 Svelte 源码与示例格式。Vue/Solid 运行时在工作区统一版本，避免多个副本的类型或上下文不兼容。
