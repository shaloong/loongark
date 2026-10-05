import { createAsyncCollectionLoader, type AsyncCollectionLoadDetails } from "@loongark/kit";
export interface CollectionDemoItem { id: string; label: string; }
export function createAsyncCollectionDemo(notify: () => void) {
  let fail = false, cycle = false, aborted = 0, requests = 0, disposed = false, pageRequest = false;
  const pending = new Set<{timer: ReturnType<typeof setTimeout>; reject: (error: Error) => void; cleanup: () => void}>();
  const loader = createAsyncCollectionLoader<CollectionDemoItem, number>({
    getKey: item => item.id,
    load(details: AsyncCollectionLoadDetails<CollectionDemoItem, number>) {
      pageRequest = details.cursor != null;requests++;if (!disposed) notify();
      if (fail) { fail = false; throw Error("Demo service unavailable; retry the same page."); }
      const prefix = details.filterText || "item", page = details.cursor == null ? 0 : details.cursor === 0 ? 1 : 2;
      const all = [1,2,3,4,5,6];if (details.sortDescriptor?.direction === "descending") all.reverse();
      const ids = page === 0 ? all.slice(0,3) : page === 1 ? all.slice(2,5) : all.slice(4);
      const result = {items: ids.map(index => ({id:`${prefix}-${index}`,label:`${prefix} ${index}${index === 3 ? " · A longer collection item that wraps on smaller screens" : ""}`})),cursor: cycle && page === 1 ? 0 : page === 0 ? 0 : page === 1 ? 1 : undefined};
      cycle = false;
      return new Promise((resolve, reject) => {
        const finish = () => {task.cleanup();pending.delete(task);resolve(result);};
        const cancel = () => { aborted++;if(!disposed) notify();if(details.filterText !== "slow") { clearTimeout(task.timer);task.cleanup();pending.delete(task);reject(new DOMException("Cancelled","AbortError")); } };
        const task = { timer:setTimeout(finish, details.filterText === "slow" ? 650 : 180), reject, cleanup:() => details.signal?.removeEventListener("abort",cancel) };
        pending.add(task);details.signal?.addEventListener("abort",cancel,{once:true});if(details.signal?.aborted)cancel();
      });
    },
  });
  const cancel = () => {loader.cancel();for(const task of pending){clearTimeout(task.timer);task.cleanup();task.reject(new DOMException("Cancelled","AbortError"));}pending.clear();};
  return {
    loader,
    cancel,
    get snapshot() { return {aborted, requests, pageRequest, summary: `${requests} requests · ${aborted} aborted`}; },
    failNext() { fail = true; },
    cycleNext() { cycle = true; },
    dispose() { disposed = true;cancel();loader.dispose(); },
  };
}
