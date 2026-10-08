# 使用安全说明

## 浏览器与后端

LoongArk 提供组件、共享模型与 SSR，不提供认证、授权或数据库隔离。服务端必须重新验证请求字段、文件类型/大小、资源权限及业务约束；客户端的 hidden、disabled、只读和表单验证都不能构成安全控制。

SSR 每个请求独立创建主题和状态。不要把用户提交的配置当作 Props 全量展开；应用应明确允许的字段，限制数据规模并处理模型校验异常。不要在 Storybook、例子、trace 或 CI Artifact 中使用生产凭据和真实个人数据。

## 内容与扩展

内建表格、图表、问卷与编辑器的 HTML 序列化必须转义文本和属性。富文本只接受受支持的 JSON 节点，限制深度、节点、文本和标记数量，并验证链接协议；不会执行代码编辑器内容，不支持直接导入任意 HTML。

应用插件、CodeMirror extensions、ProseMirror nodeViews、自定义问卷 renderer、IconNode 与手动传入的 HTML/DOM Props 是可信代码契约，不是处理远端任意脚本的沙箱。Frame 用于布局/样式隔离，不是运行不可信 HTML 的安全沙箱；外部 iframe 的 sandbox、allow 和来源限制由应用明确配置。普通链接、图片和 iframe 等原生地址由应用按业务来源约束；富文本链接的协议白名单也不等于域名白名单。

合并后的 Token 与基础对象隔离，避免跨主题及 SSR 请求互相污染。主题 Token 校验属性名、有限数字、深度/循环和 CSS/HTML 结构分隔符，防止特殊键及闭合 style 标签逃逸。Token 仍是可信样式配置，不应接收任意用户 CSS；原始 `mountStyles`/`mountStyleSheet` API 接受可信 CSS，不是 CSS sanitizer。严格 CSP 应由应用配置，当前动态样式 API 没有统一的 nonce 接入契约，部署前需验证站点策略兼容性。

## 依赖与发布

Vue、Solid、Svelte 使用当前安全最低版本，见 [支持矩阵](releases.md)。根目录 pnpm overrides 只约束仓库构建，不会自动替消费者修复其锁文件；消费项目也需要审计并更新传递依赖，尤其 SSR 序列化相关依赖。

使用冻结锁文件安装，开发服务器只绑定本地，不将 Vite/Storybook 开发服务暴露到不可信网络。静态 Pages 不需要运行开发服务。CI 默认只读内容权限，Pages 写权限仅授予 main 部署任务；准备流程不自动发布 npm。

```sh
pnpm audit
pnpm verify
pnpm check:security
```

`check:security` 使用真实构建产物测试危险 Token、问卷配置、富文本链接与输出转义；它不是整个依赖图或所有应用插件的安全证明。依赖审计需要联网查询实时公告，扫描细节输出到 `.artifacts/`，不提交逐次报告。
