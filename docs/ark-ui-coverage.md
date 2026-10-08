# Ark UI 与封装边界

LoongArk 基于 Ark UI 提供带主题的四端组件，保留键盘导航、集合、Provider/Context、受控状态与表单语义。组合组件的共享模型位于 Kit，外观位于 Primitives。

当前目录见 [组件清单](component-coverage.md)，高级能力见 [能力概览](capabilities.md)。Ark 各框架的类型和事件语法可能不同；LoongArk 只声明实际提供的入口，不通过额外别名扩充数量。新增上游 API 需四端逐项核对。

构建后可运行 `node scripts/audit-ark-coverage.mjs` 对照真实安装版本的声明。输出放在忽略目录 `.artifacts/ark-coverage/`，不将一次扫描结果当作永久支持契约。
