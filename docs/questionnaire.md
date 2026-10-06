# Questionnaire 复杂题型

`text` 已提供多行文本；`single`、`multiple` 保留原生单选/复选。新增 `number`、`date`、`select`、`matrix`、`ranking`，四端共享归一化、校验和表单契约。

- `number` 的答案保持字符串，支持有限数值 `min`/`max` 与正数 `step`；允许十进制和科学记数法，拒绝非有限值。步长以 min 或 0 为基准，容忍浮点表示误差。
- `date` 使用原生日期输入，答案是 `YYYY-MM-DD`；校验真实日历日期、闰年与字符串 min/max，不引入时区和业务日期规则。
- `select` 复用 options，使用带空占位的原生 select；未知或禁用选项被清理。
- `matrix` 使用 `rows: {id,label,disabled?}[]` 和共用 options。答案是只包含已回答有效行的对象。required 要求所有可用行回答，禁用行和过期键不参与提交。默认每行独立 fieldset/radio group，表单名称为 `questionId[rowId]`。设置 `multiple: true` 后，每行使用原生 checkbox，行答案为只读键数组；同一行的每个选中项重复该字段名。`minSelections`/`maxSelections` 为逐行数量边界，required 要求所有可用行至少选择一项；空的可选行不触发最小值。未知、禁用、重复和不匹配答案形状的选项被清理。数量边界也适用于普通 multiple 题，必须是非负安全整数，且最小值不大于最大值。
- `ranking` 使用 options。答案是有序键数组；保留有效既有顺序，删除禁用/重复/过期键并将新增项追加末尾。初始顺序就是合法答案，业务若需要确认或其他规则，使用 validate。原生“上移/下移”按钮支持键盘，焦点随条目保留；到边界时移至同条目的可用按钮。可配置 moveUpLabel/moveDownLabel。Lucide 手柄支持鼠标和触摸指针；仅手柄禁止页面滚动，拖动靠近滚动容器上下边缘时自动滚动。键盘 Space/Enter 拾起，ArrowUp/ArrowDown/Home/End 调整预览，Space/Enter 放下提交一次完整顺序，Escape 取消且不提交。离开问卷、禁用、题目/答案改变、导航或卸载会取消预览；受控拒绝恢复原顺序和对应手柄焦点。`rankingLabels` 配置手柄名称、键盘说明与实时状态播报。原生移动按钮继续保留。表单按答案顺序重复 questionId。

`QuestionAnswer` 为字符串、只读字符串数组、只读行答案对象或只读 `QuestionGroupInstance[]`；`QuestionnaireValue` 仍以问题 id 为键。异步 validateAsync 收到冻结的数组、矩阵对象及嵌套行数组与完整快照，编辑、页面切换、替换题目、禁用或卸载都会中止并忽略过期结果。业务评分、题库服务和请求地址由调用方负责。

高级题型使用真实原生控件名称，不重复添加当前题隐藏字段。其余可见题通过共享 questionnaireFormEntries 序列化；条件隐藏题仍保留编辑答案但不提交。受控父级拒绝更新后恢复实际控件，并在重绘时保留题内逻辑焦点；外部焦点不会被抢回。

参见四端 `QuestionnaireTypesExample`、`QuestionnaireMatrixExample`、`QuestionnaireRankingExample` 和 Story `Components/Questionnaire/StructuredTypes`、`MatrixMultiple`、`RankingInteraction`。矩阵校验失败将焦点移到首个无效可用行，并通过 aria-describedby 关联当前错误；必填多选不把每个 checkbox 单独声明为 required。输入与日期选择保留平台原生外观；矩阵使用适配窄屏的网格，排序条目使用中性色、已有 Token 和原生按钮。


## 重复题组

`type: "group"` 配合非空 `questions` 定义组内题目，答案为 `{ id, value }[]`。实例 id 在所属题组内必须唯一且非空，增删其他实例不改变答案身份；子题 id 只在所属 schema 内唯一，允许不同题组复用同一字段名。支持嵌套组、`minGroups`/`maxGroups` 非负整数边界及 `groupLabels` 的新增/删除/实例标签。必填组至少有一个实例；默认不会为最小数量自动伪造答案。

组内 `when`、同步/异步校验读取该实例的局部完整答案。条件隐藏的子答案保留在编辑值中，递归排除于提交与表单；表单名称形如 `contacts[alpha][name]`，嵌套组继续展开稳定实例路径。矩阵多选和排序继续采用重复名称。异步校验收到深度冻结的局部快照，编辑、删除实例、修改 schema 或卸载中止请求，过期结果不写回。

新增组后聚焦新实例首个可用控件，删除后聚焦相邻实例；受控拒绝保持原答案和实例数量。数量边界通过按钮禁用和提交校验共同约束，外部提供超界值会显示错误而不会静默截断数据。提交失败定位首个无效子控件，组数量不足时定位新增按钮。示例 `QuestionnaireGroupsExample` 与 Story `RepeatedGroups` 展示普通、嵌套、条件、异步及受控/内部答案。

## 原生自定义题型

`type: "custom"` 配合 `customKind` 选择渲染器；`answerKind` 为 `"string"`（默认）、`"strings"` 或 `"map"`。数组会过滤空值并去重，映射接受字符串或字符串数组；不接受任意对象或题组实例。已有内置题型无需改成自定义。

Questionnaire 的 `renderers` 按 kind 注册。React 回调返回 ReactNode，Vue 返回 VNodeChild，Solid 返回 JSX.Element；Svelte 使用 `Snippet<[QuestionnaireCustomContext]>`。四端均在原生框架中渲染，支持根题和嵌套题组。实际评分控件见 `QuestionnaireCustomExample` 和 Storybook 的 CustomRenderer。

上下文包含当前 `question`、只读 `answer`、冻结的实例局部 `value`、稳定 `path`、`disabled`、`pending`、`invalid`、`error` 及控制、标签、描述、错误节点 ID。使用 `onAnswerChange(answer)` 提交答案，不修改上下文。外层负责原生表单隐藏字段、必填和校验消息；渲染器不要重复添加同名字段，并应将 label/description/error ID 连接到实际控件，转发 question.required 的必填语义。

DOM 挂载后用 `registerControl({ element, restore?, focus?, dispose? })` 注册，卸载时调用返回的清理函数。完全受控的控件通过 context.answer 渲染即可，不必提供 restore；有内部可变状态时，`restore` 将第三方控件内部状态恢复为已接受的答案，避免外层拒绝更新后控件与表单不同步；恢复期间同步回调受到抑制。`focus` 定位内部可操作节点，缺省使用第一个可聚焦节点；提交失败时可获得正确焦点。保持 renderer 函数/snippet 身份稳定，以免不必要地替换生命周期。

`signal` 在题目隐藏、实例删除、kind/答案形状/renderer 替换、禁用或根卸载后中止。上述旧上下文的答案回调会被忽略；第三方异步工作仍应监听 signal 自行释放资源。SSR 不注册 DOM、不启动交互，也不会执行提交回调；可见 customKind 缺少 renderer 时明确抛错，隐藏题不要求提前提供 renderer。同步/异步校验、取消及跨题依赖继续复用 Questionnaire 的既有契约。

评分示例复用已有 RatingGroup。四端 Root 与 useRatingGroup 共享原生 Zag 状态机修正：悬停仅预览，不改变 aria-checked；快速点击使用实际条目；键盘导航清除过期悬停并保持焦点；程序化设置不受悬停影响。Svelte 与 Questionnaire 一样，在提供 onValueChange 时由调用方接受答案；不提供回调时支持 bind:value。共享层直接声明已有传递版本 @zag-js/rating-group 1.43.3，无新增版本或独立调色板。
