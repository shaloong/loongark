import type { ConversationActionContext } from "@loongark/kit";
export const conversationNote =
  "The launch checklist is ready. Please review the final files before sharing.";
/** 模拟业务延迟，示例并不提供上传/消息服务。 */
export function waitForConversationAction(
  context: ConversationActionContext,
  milliseconds = 500,
) {
  return new Promise<void>((resolve, reject) => {
    const signal = context.signal;
    const abort = () => {
      clearTimeout(timer);
      signal.removeEventListener("abort", abort);
      reject(new DOMException("Operation aborted", "AbortError"));
    };
    const timer = setTimeout(() => {
      signal.removeEventListener("abort", abort);
      resolve();
    }, milliseconds);
    if (signal.aborted) abort();
    else signal.addEventListener("abort", abort, { once: true });
  });
}
export interface DemoUploadState {
  status: "ready" | "uploading" | "cancelled";
  progress: number;
}
/** 真实推进的模拟上传；取消和卸载停止计时，不连接网络。 */
export function createDemoUpload(notify: (state: DemoUploadState) => void) {
  let timer: ReturnType<typeof setInterval> | undefined,
    disposed = false;
  let state: DemoUploadState = { status: "ready", progress: 0 };
  const stop = () => {
    if (timer !== undefined) clearInterval(timer);
    timer = undefined;
  };
  const publish = (next: DemoUploadState) => {
    state = next;
    if (!disposed) notify(next);
  };
  return {
    get state() {
      return state;
    },
    start() {
      if (disposed || timer !== undefined) return;
      publish({ status: "uploading", progress: 0 });
      timer = setInterval(() => {
        const progress = Math.min(100, state.progress + 8);
        publish({ status: progress === 100 ? "ready" : "uploading", progress });
        if (progress === 100) stop();
      }, 400);
    },
    cancel() {
      if (disposed) return;
      stop();
      publish({ status: "cancelled", progress: state.progress });
    },
    dispose() {
      disposed = true;
      stop();
    },
  };
}
