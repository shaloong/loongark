export interface ConversationActionContext {
  /** 组件卸载或业务主动取消时中止；请求实现必须自行响应信号。 */
  signal: AbortSignal;
}
export type ConversationActionHandler =
  | ((context: ConversationActionContext) => void)
  | ((context: ConversationActionContext) => Promise<void>);
export interface ConversationActionLabels {
  group?: string;
  pending?: string;
  error?: string;
}
export interface ConversationAction {
  id: string;
  label: string;
  onAction: ConversationActionHandler;
  disabled?: boolean;
  successLabel?: string;
}
export interface ConversationActionState {
  pendingId?: string;
  message?: string;
  outcome?: "pending" | "success" | "error";
}
/** 每个组合实例只允许一个动作；同步异常与异步拒绝都进入同一反馈路径。 */
export function createConversationActionController(
  notify: (state: ConversationActionState) => void,
) {
  let state: ConversationActionState = {},
    disposed = false,
    version = 0;
  let active: AbortController | undefined;
  const publish = (next: ConversationActionState) => {
    state = next;
    if (!disposed) notify(next);
  };
  return {
    get state() {
      return state;
    },
    async run(action: ConversationAction, labels?: ConversationActionLabels) {
      if (disposed || active || action.disabled) return;
      const request = new AbortController(),
        current = ++version;
      active = request;
      publish({
        pendingId: action.id,
        outcome: "pending",
        message: labels?.pending ?? "Working…",
      });
      try {
        await action.onAction({ signal: request.signal });
        if (!disposed && current === version && !request.signal.aborted)
          publish(
            action.successLabel
              ? { outcome: "success", message: action.successLabel }
              : {},
          );
      } catch {
        if (!disposed && current === version && !request.signal.aborted)
          publish({
            outcome: "error",
            message: labels?.error ?? "Action failed. Please try again.",
          });
      } finally {
        if (current === version) active = undefined;
      }
    },
    reset() {
      if (disposed) return;
      version++;
      active?.abort();
      active = undefined;
      publish({});
    },
    dispose() {
      disposed = true;
      version++;
      active?.abort();
      active = undefined;
    },
  };
}
export function normalizeConversationActions(
  actions: readonly ConversationAction[] = [],
) {
  const ids = actions.map((action) => action.id);
  if (
    ids.some((id) => !id.trim() || id === "retry") ||
    new Set(ids).size !== ids.length
  )
    throw Error(
      "Message action ids must be unique, non-empty and different from retry",
    );
  if (actions.some((action) => !action.label.trim()))
    throw Error("Message actions require accessible labels");
  return actions;
}
