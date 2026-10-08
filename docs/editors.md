# 独立编辑器

四端统一提供 `LoongArkCodeEditor` 和 `LoongArkRichTextEditor`。共享模型、原生表单桥接、编辑器行为和样式集中在 kit/primitives，框架适配仅负责挂载、更新与销毁。使用现有中性色和 Shaloong VI Token，工具栏图标来自 Lucide。

## 代码编辑器

代码编辑器使用 MIT 的 CodeMirror 6，提供多行编辑、行号、折叠、缩进、括号匹配、补全、搜索/替换、矩形选择和多级撤销/重做。`language` 接受 plain/javascript/typescript/json/html/css/python/markdown，语法包在客户端按需加载；也可以提供 `(signal: AbortSignal) => Extension | Promise<Extension>`。切换语法或卸载会取消旧请求，迟到的结果不会覆盖新配置；失败保留可编辑的纯文本并通过 `onLanguageError` 报告。

`lineNumbers`、`lineWrapping`、`tabSize` 控制显示，`extensions` 接受真实 CodeMirror Extension，`phrases` 本地化引擎内文案。`onReady(handle)` 可取得 `view`、`focus`、`replaceSelection`、`undo`、`redo` 和 `search`；返回的清理函数在卸载执行。Tab 默认缩进；Escape 后可以用 Tab 离开编辑器。只读、禁用和扩展配置在原生按键/输入事件前读取最新 Props，避免框架已经提交状态而编辑器尚未到下一帧的竞争；文档协调继续在绘制帧执行，不打断组合输入。

## 富文本编辑器

富文本编辑器使用 MIT 的 ProseMirror，值为 `RichTextDocument` 结构化 JSON。支持段落、标题、粗体、斜体、下划线、删除线、行内代码、代码块、引用、列表、安全链接、分隔线、换行及表格。表格提供增删行列、表头、合并/拆分、鼠标调整列宽和键盘跨单元格移动。

模型校验节点、标记、嵌套/文本大小和表格几何，并隔离列宽等嵌套数组。链接支持 http/https/mailto/tel 与明确的相对路径，拒绝脚本协议。SSR 输出经过转义的文档，不调用浏览器构造器。图片上传、协作服务和持久化由应用层提供。

默认输入规则支持 `# ` 标题、`- ` 列表、`1. ` 有序列表、`> ` 引用和三个反引号代码块；Backspace 可撤销刚刚触发的规则。`inputRules={false}` 禁用规则，也可传真实 InputRule 数组。`plugins` 和 `nodeViews` 接受真实 ProseMirror 插件与节点视图；重配置及卸载遵循引擎的 destroy 生命周期。`tableResizable={false}` 禁用鼠标列宽调整。

`onReady(handle)` 提供真实 `view`、`focus`、`run(action)`、`setLink` 和 `insertTable`。只读、禁用和已经销毁的 handle 不执行变更。所有工具和链接弹层文案可通过 `labels` 本地化。

## 状态、表单和框架绑定

两者共用 `label`、`description`、`error`、`requiredMessage`、`name`、`form`、`required`、`disabled`、`readOnly`、`dir` 和 `minRows`。原生 textarea 桥接 FormData、required 与 reset；错误聚焦可见编辑区域。富文本提交 JSON，空段落按语义视为空；只读可提交，禁用不进入 FormData。Reset 恢复 defaultValue 并清空历史。

省略 value 为非受控模式；提供 value 时，调用方必须在 onValueChange 中回写接受的值。不回写即拒绝该次编辑，恢复文档和选择，即使调用方没有重渲染。接受相同值保留历史；外部替换文档清空历史，避免撤销回到旧数据集。组合输入期间延后同步，避免中途重置正在输入的内容。框架配置更新与引擎输入合并调度，等待框架提交当前输入的值，避免Firefox原生替换选择文本时在beforeinput/input之间重配置；卸载取消待执行帧。不要原地修改富文本 JSON。

React/Solid 使用 onValueChange；Vue 同时提供 valueChange 和 update:value。Svelte 支持 bind:value；若同时提供 onValueChange，由调用方负责回写 value。SSR 不触发 onReady、变更回调或语法加载，客户端挂载后再创建引擎。

验证范围以对应提交的 CI 为准；模拟手机视口不代表真实手机，Chromium 通过也不代表 Firefox 或 Safari 已验收。


扩展 Props 的框架更新与文档协调可以合并到下一绘制帧，但真实 keydown、beforeinput 和 paste 在进入引擎前会应用当前扩展。启用或移除键绑定后立即输入使用最新配置，组合输入期间仍延后重配置；监听器随编辑器销毁清理。

编辑器的 Table options 保留原生 details/summary 键盘展开语义，使用统一 Lucide 线条指示器，继承主题颜色；关闭时随 RTL 镜像，展开时朝下。四端编辑器及表格范围示例的附加控制也复用已有 SVG 展开样式，避免 WebKit 将原生标记渲染为彩色 emoji。

富文本表格选项的自定义标签更新仅修改文本节点，保留装饰图标与展开状态。


组合输入、连续操作、受控拒绝、生命周期及放大文字的当前契约与验收限制，见[高级边界说明](advanced-boundaries.md)。
