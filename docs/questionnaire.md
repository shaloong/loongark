# Questionnaire 复杂题型

`text` 已提供多行文本；`single`、`multiple` 保留原生单选/复选。新增 `number`、`date`、`select`、`matrix`、`ranking`，四端共享归一化、校验和表单契约。

- `number` 的答案保持字符串，支持有限数值 `min`/`max` 与正数 `step`；允许十进制和科学记数法，拒绝非有限值。步长以 min 或 0 为基准，容忍浮点表示误差。
- `date` 使用原生日期输入，答案是 `YYYY-MM-DD`；校验真实日历日期、闰年与字符串 min/max，不引入时区和业务日期规则。
- `select` 复用 options，使用带空占位的原生 select；未知或禁用选项被清理。
- `matrix` 使用 `rows: {id,label,disabled?}[]` 和共用 options。答案是只包含已回答有效行的对象。required 要求所有可用行回答，禁用行和过期键不参与提交。默认每行独立 fieldset/radio group，表单名称为 `questionId[rowId]`。设置 `multiple: true` 后，每行使用原生 checkbox，行答案为只读键数组；同一行的每个选中项重复该字段名。`minSelections`/`maxSelections` 为逐行数量边界，required 要求所有可用行至少选择一项；空的可选行不触发最小值。未知、禁用、重复和不匹配答案形状的选项被清理。数量边界也适用于普通 multiple 题，必须是非负安全整数，且最小值不大于最大值。
- `ranking` 使用 options。答案是有序键数组；保留有效既有顺序，删除禁用/重复/过期键并将新增项追加末尾。初始顺序就是合法答案，业务若需要确认或其他规则，使用 validate。原生“上移/下移”按钮支持键盘，焦点随条目保留；到边界时移至同条目的可用按钮。可配置 moveUpLabel/moveDownLabel。表单按答案顺序重复 questionId。

`QuestionAnswer` 为字符串、只读字符串数组或只读行答案对象；`QuestionnaireValue` 仍以问题 id 为键。异步 validateAsync 收到冻结的数组、矩阵对象及嵌套行数组与完整快照，编辑、页面切换、替换题目、禁用或卸载都会中止并忽略过期结果。业务评分、题库服务和请求地址由调用方负责。

高级题型使用真实原生控件名称，不重复添加当前题隐藏字段。其余可见题通过共享 questionnaireFormEntries 序列化；条件隐藏题仍保留编辑答案但不提交。受控父级拒绝更新后恢复实际控件，并在重绘时保留题内逻辑焦点；外部焦点不会被抢回。

参见四端 `QuestionnaireTypesExample`、`QuestionnaireMatrixExample` 和 Story `Components/Questionnaire/StructuredTypes`、`MatrixMultiple`。矩阵校验失败将焦点移到首个无效可用行，并通过 aria-describedby 关联当前错误；必填多选不把每个 checkbox 单独声明为 required。输入与日期选择保留平台原生外观；矩阵使用适配窄屏的网格，排序条目使用中性色、已有 Token 和原生按钮。
