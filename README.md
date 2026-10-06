# LoongArk

基于 Ark UI 的 React、Vue、Solid、Svelte 组件库。四端共享组件行为、Shaloong VI 语义 Token 和中性视觉规范。

[在线组件展示](https://shaloong.github.io/loongark/) · [Pages 部署状态](https://github.com/shaloong/loongark/actions/workflows/storybook-pages.yml) · [MIT License](LICENSE)

在线展示使用 Storybook：可以直接浏览示例、操作控件、切换主题和查看 Props，无需克隆仓库。部署状态见工作流；展示自动跟随 develop，属于开发预览。

- `develop`：日常开发与云端任务，频繁提交和推送。
- `main`：稳定版本，通过发布 PR 不定期更新。
- 提交使用 Conventional Commits。

## 开始开发

按 [CONTRIBUTING.md](CONTRIBUTING.md) 配置 Node.js 24 和 pnpm 10.14.0，检出 `develop` 后运行：

```sh
pnpm install --frozen-lockfile
pnpm verify
pnpm storybook
```

[技术架构与验证](docs/README.md) · [组件覆盖](docs/component-coverage.md) · [开发约定](AGENTS.md)

当前组件目录覆盖 117 个组件族、321 个 Story，React/Vue/Solid/Svelte 各 792 个公开值入口；Ark UI 独有部件和 Hook 的安装版本对照已补齐。图标统一采用 Lucide，四端节点与高级 Props 见 [图标说明](docs/icons.md)。高级场景仍逐批验收，范围与限制见 [Ark UI 核对](docs/ark-ui-coverage.md)。

代码采用 [MIT License](LICENSE)。发布包包含相同许可；第三方依赖保留各自许可证。

## 矩阵多选（2026-10-06）

四端Questionnaire复用matrix题型补上逐行多选、数量边界、原生重复字段和首个无效行焦点；保留单选兼容、受控拒绝与嵌套异步快照隔离。当前117族、320Story、四端各792公开值入口、239框架示例。新构建、契约、发布类型/SSR与Svelte检查通过；完整Chromium四端250项、Firefox与WebKit定向各32项、Story27项及Linux视觉174项通过。三引擎96张四端截图和4张新增Linux基线已实际审阅；196张既有基线含Windows哈希未变。过程文件不入Git，准确范围与限制见[验收记录](docs/audits/2026-10-06/questionnaire-matrix-linux/acceptance.json)。排序拖动、重复题组与自定义渲染继续实施，整库平台与真机清单保持开放。

## 排序题拖动与键盘操作（2026-10-06）

四端Questionnaire排序题增加Lucide手柄、鼠标/触摸预览、边缘滚动和键盘拾起/移动/放下/取消；只在放下时提交一次，并覆盖受控拒绝、动态选项、外部答案和卸载。当前117族、321Story、四端各792公开值入口、243框架示例。新构建与契约/发布类型/SSR/Svelte检查通过；间距修正前完整Chromium270项通过，修正后问卷定向Chromium52项、Firefox/WebKit各48项、Story31项和全量Linux视觉178项通过。三引擎及触摸模拟100张截图、8张视觉候选已实际审阅；仅4张旧Linux排序基线改变，196张无关旧基线含Windows保持不变。范围与限制见[验收记录](docs/audits/2026-10-06/questionnaire-ranking-linux/acceptance.json)。重复题组、自定义渲染、虚拟化、日期、Drawer和整库平台/真机验收继续实施。


## 裁剪布局与稳定导出（2026-10-06）

修复ImageCropper根区域占位与窄屏图片约束，四端新增共享`exportImageCropper`，以源图尺寸捕获旋转/翻转/缩放并导出PNG/JPEG，支持像素上限、取消、独立根及SSR。四端示例和既有Story同步使用该能力，原生Ark API保持兼容。目录仍为117族、321Story、四端各792个LoongArk前缀公开值、243示例。

新构建、契约、公开类型/SSR和Svelte检查通过；三引擎裁剪各17项通过，最后像素上限修正后新构建的公共契约另各1项通过；Story10项含321Story明暗质量扫描及全量Linux视觉178项通过。144张四端默认/变换导出/重置截图已实际查看，204张既有基线含Windows哈希未变。全页截图临时布局的隔离诊断、实际范围与限制见[验收](docs/audits/2026-10-06/image-cropper-platforms/acceptance.json)。其余平台失败、重复题组、自定义问卷渲染、虚拟化、日期和Drawer继续实施。


## 原生输入与图表提示一致性（2026-10-06）

CodeEditor 在真实输入事件前应用最新扩展配置，Chart 支持外部焦点下 Escape 关闭提示，并避免 SVG 重建覆盖显式检查分类；原生列拖动与富文本表格操作回归在滚动后重新核对真实命中目标。四端共享实现与示例保持一致，目录仍为117族、321Story、四端各792个LoongArk前缀公开值、243示例。

最终新构建、契约、发布类型/SSR和Svelte检查通过；Chromium/Firefox生产版本定向各112项通过，最终富文本共享回归另各16项通过；WebKit最终完整专项112项、Story32项及全量Linux视觉178项通过。三引擎144张实际截图及最终WebKit48张新图已查看，204张既有基线含Windows哈希未变。原生Safari基提交243默认示例和32交互通过、32截图已审阅，不代替本批新代码验收。范围及仍开放的平台失败见[验收记录](docs/audits/2026-10-06/input-hover-platforms/acceptance.json)。重复题组、自定义渲染、虚拟化、日期、Drawer及真机继续实施。
