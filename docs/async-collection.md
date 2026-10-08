# 异步 Collection 契约

四端继续使用 Ark 原生 `useAsyncList` 的状态机和 API。`createAsyncCollectionLoader` 是共享数据边界适配器，负责请求快照、取消、稳定键去重、成功页确认和游标检查，不创建第二套 Hook、请求客户端或业务服务。

```ts
const loader = createAsyncCollectionLoader<Item, number>({
  getKey: item => item.id,
  load: async ({ signal, cursor, filterText, sortDescriptor }) => {
    // 调用方实现服务；signal 始终存在，cursor 为 null/undefined 表示首次页。
    return service({ signal, cursor, filterText, sortDescriptor });
  },
});
const props = {
  load: loader.load,
  onSuccess: loader.onSuccess,
  autoReload: false,
};
// React: useAsyncList(props)
// Vue: useAsyncList(props) -> ComputedRef
// Solid / Svelte: useAsyncList(() => props) -> Accessor
```

`load` 与 `onSuccess` 必须成对接入。返回的页先暂存；原生 Hook 同步接收该页并调用 `onSuccess` 后才更新去重与游标账本。Ark 成功退出加载也会中止请求信号，适配器允许同一轮的成功确认；真实取消且未确认的页会被丢弃。组合业务回调时先同步调用 `loader.onSuccess(details)`，再执行自己的通知。独立使用 load 时，消费者实际接收结果后调用 onSuccess，不能只将 load 接到 Hook 而遗漏确认。

- `getKey` 必须返回稳定、非空字符串或有限数值。页内与此前已接收页的重复键保留首次项，保持服务顺序，不修改源数组。
- 游标支持字符串或有限数值，`0` 和空字符串都是有效游标；`null`/`undefined` 表示首次请求或返回时的结束。相同游标、已返回过的游标循环会整页拒绝，不追加部分数据。
- 每个后续请求必须使用同一筛选/排序上下文中的已接收游标。重载、筛选与远端排序用首次页请求；成功接收新首页后替换账本。
- 同步服务异常转换为 Promise 拒绝，交由原生 error 状态处理。失败页、无效键或循环游标不会更新账本，可以用同一原游标重试。
- 新请求中止旧请求；忽略 signal 的服务迟到成功或失败都会被消费并丢弃。请求参数与排序描述会复制为快照。服务仍应响应 signal，以释放网络与计算资源。
- `cancel()` 中止并丢弃当前暂存页，保留已接收页，可重用；`dispose()` 永久释放适配器。挂载中取消使用原生 `list.abort()` 来同步 Hook 状态，卸载时释放适配器；React effect 重放先 cancel，确认最终卸载后再 dispose。示例提供了 StrictMode 回归。

首次/重载失败应调用 reload，分页失败应调用 loadMore 重试。原生 Hook 在重载失败时可能保留之前的 cursor，不能只根据 hasMore 推断重试操作；示例记录请求种类，并在错误期间禁用普通 Load more。加载时分页、重载和排序按钮遵循原生 busy 状态；筛选允许替换进行中的请求。若要自动加载，应显式设置 autoReload，并按业务处理 SSR 取数；本库示例和 SSR 回归使用 false，不在服务端请求。

四端 `AsyncCollectionExample` 和 Story `Compositions/Ark Utilities/AsyncCollection` 展示重叠页去重、数字游标 0、循环游标、同步失败、原位重试、快速筛选竞争、排序、取消和重挂。HTTP 缓存、鉴权、服务错误映射、筛选防抖和业务实体更新由调用方实现。
