# 业务组合：工单工作台

Storybook 的 `Compositions/Ticket Workflow` 提供可交互示例；DataTable Docs 的“工单筛选与弹窗编辑”可以查看四端对应代码。示例使用实际组件入口和共享主题，包含搜索、状态筛选、表格选择、编辑弹窗、字段校验、草稿重置、保存失败重试以及成功通知。

- [React](../examples/react/TicketWorkflowExample.tsx)
- [Vue](../examples/vue/TicketWorkflowExample.ts)
- [Solid](../examples/solid/TicketWorkflowExample.tsx)
- [Svelte](../examples/svelte/TicketWorkflowExample.svelte)
- [共享场景数据与状态](../examples/shared/ticketWorkflow.ts)

在应用的 LoongArkProvider 内挂载示例，复制时同时带上共享场景文件。筛选和草稿属于应用状态，表格数据通过稳定工单 ID 更新；取消弹窗不会提交草稿。字段错误由 Field 关联到输入，提交无效时聚焦第一个错误字段；保存失败保留草稿，成功后更新表格并通知，关闭后恢复触发器焦点。

示例没有后端，不发送请求，也不在刷新后保留数据。`createTicketWorkflow` 的第二个参数接受应用自己的异步保存函数 `(ticket, signal) => Promise<void>`；重复提交会被阻止，取消和卸载会终止本地等待，过期结果不能覆盖新一轮编辑。接入真实服务时仍需在服务端完成权限、数据校验和并发控制；AbortSignal 不保证撤销服务器已经接受的写入。邮箱检查只是演示规则，应按业务替换。

浏览器回归覆盖四端、浅深主题、桌面及375px模拟窄屏，核对筛选空态、校验描述、重置、失败重试、取消、焦点和 Axe。模拟视口与 Axe 分别不能替代真实手机和屏幕阅读器验收。更多组件自身边界见 [能力说明](capabilities.md)。
