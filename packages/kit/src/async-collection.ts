export interface AsyncCollectionSort<T> {
  column: keyof T;
  direction: "ascending" | "descending";
}
export interface AsyncCollectionLoadDetails<T, C> {
  signal?: AbortSignal;
  filterText: string;
  /** Ark 首次请求实际传入 null；0 是有效分页游标。 */
  cursor?: C | null;
  sortDescriptor?: AsyncCollectionSort<T>;
}
export interface AsyncCollectionRequest<T, C> extends AsyncCollectionLoadDetails<T, C> {
  signal: AbortSignal;
}
export interface AsyncCollectionPage<T, C> {
  items: readonly T[];
  cursor?: C | null;
}
export interface AsyncCollectionLoaderOptions<T, C> {
  getKey: (item: T) => string | number;
  load: (details: AsyncCollectionRequest<T, C>) => AsyncCollectionPage<T, C> | Promise<AsyncCollectionPage<T, C>>;
}
/** 复用 Ark useAsyncList 状态机；load 与 onSuccess 必须一起接入。 */
export function createAsyncCollectionLoader<T, C extends string | number = string>(options: AsyncCollectionLoaderOptions<T, C>) {
  type Accepted = { filterText: string; sort?: AsyncCollectionSort<T>; keys: Set<string | number>; cursors: Set<C>; cursor?: C };
  let disposed = false, version = 0;
  let active: AbortController | undefined, releaseActive: (() => void) | undefined;
  let accepted: Accepted | undefined;
  let staged: { version: number; items: T[]; accepted: Accepted } | undefined;
  const abortError = () => new DOMException("Collection request cancelled", "AbortError");
  const validCursor = (cursor: C | null | undefined) => cursor == null || typeof cursor === "string" || (typeof cursor === "number" && Number.isFinite(cursor));
  const release = () => { releaseActive?.();releaseActive = undefined;active = undefined; };
  const cancel = () => { version++;active?.abort();release();staged = undefined; };
  return {
    cancel,
    /** Ark 接收页时同步确认；单独调用 load 的消费者在消费结果后调用此方法。 */
    onSuccess(details: { items: T[] }): void {
      if (disposed || staged?.version !== version || staged.items !== details.items) return;
      accepted = staged.accepted;
      staged = undefined;
      release();
    },
    load(input: AsyncCollectionLoadDetails<T, C>): Promise<{ items: T[]; cursor?: C }> {
      const details = { ...input, sortDescriptor: input.sortDescriptor ? { ...input.sortDescriptor } : undefined };
      // 包括同步服务异常和已中止信号，都转换为 Promise 拒绝供 Ark 处理。
      return Promise.resolve().then(async () => {
        if (disposed || details.signal?.aborted) throw abortError();
        cancel();
        const controller = new AbortController(), request = version;
        active = controller;
        let returned = false;
        const cancelSignal = () => {
          controller.abort();
          // Ark 成功退出 loading 也会 abort，但在同一轮同步调用 onSuccess。
          // 延后清除未确认页，使真实接收与取消后的丢弃都能成立。
          queueMicrotask(() => {
            if (staged?.version === request) { staged = undefined;release(); }
          });
        };
        details.signal?.addEventListener("abort", cancelSignal, { once: true });
        const unlink = () => details.signal?.removeEventListener("abort", cancelSignal);
        releaseActive = unlink;
        const current = () => !disposed && request === version && !controller.signal.aborted;
        try {
          const first = details.cursor == null;
          const sameContext = accepted && accepted.filterText === details.filterText && accepted.sort?.column === details.sortDescriptor?.column && accepted.sort?.direction === details.sortDescriptor?.direction;
          if (!validCursor(details.cursor)) throw Error("Collection requires a finite number or string cursor");
          if (!first && (!sameContext || details.cursor !== accepted?.cursor)) throw Error("Collection page cursor does not match the accepted query; reload first");
          const page = await new Promise<AsyncCollectionPage<T, C>>((resolve, reject) => {
            const abort = () => { controller.signal.removeEventListener("abort", abort);reject(abortError()); };
            controller.signal.addEventListener("abort", abort, { once: true });
            if (controller.signal.aborted) { abort();return; }
            Promise.resolve().then(() => {
              if (!current()) throw abortError();
              return options.load({ ...details, sortDescriptor: details.sortDescriptor ? { ...details.sortDescriptor } : undefined, signal: controller.signal });
            }).then(result => { controller.signal.removeEventListener("abort", abort);resolve(result); }, error => { controller.signal.removeEventListener("abort", abort);reject(error); });
          });
          if (!current()) throw abortError();
          if (!Array.isArray(page.items) || !validCursor(page.cursor)) throw Error("Collection load must return items and a finite number or string cursor");
          const keys = new Set(first ? [] : accepted?.keys), cursors = new Set<C>(first ? [] : accepted?.cursors);
          if (page.cursor != null && (page.cursor === details.cursor || cursors.has(page.cursor))) throw Error("Collection cursor cycle detected");
          const items: T[] = [];
          for (const item of page.items) {
            const key = options.getKey(item);
            if ((typeof key !== "string" && typeof key !== "number") || key === "" || (typeof key === "number" && !Number.isFinite(key))) throw Error("Collection requires stable non-empty string or finite number item keys");
            if (keys.has(key)) continue;
            keys.add(key);items.push(item);
          }
          if (!current()) throw abortError();
          if (page.cursor != null) cursors.add(page.cursor);
          staged = { version: request, items, accepted: { filterText: details.filterText, sort: details.sortDescriptor ? { ...details.sortDescriptor } : undefined, keys, cursors, cursor: page.cursor ?? undefined } };
          returned = true;
          return { items, cursor: page.cursor ?? undefined };
        } finally {
          if (!returned) { unlink();if (request === version) release(); }
        }
      });
    },
    dispose() { disposed = true;cancel();accepted = undefined; },
  };
}
