import { mediaDemoItems } from "./mediaDemo";
export interface ConversationReply {
  id: string;
  author: string;
  side: "incoming" | "outgoing";
  body: string;
}
export interface MessageScrollerDemoState {
  rows: readonly ConversationReply[];
  preview: "idle" | "loading" | "loaded";
  generation: number;
}
export const messagePreview = mediaDemoItems[1];
export function messageScrollerInitialState(): MessageScrollerDemoState {
  return {
    rows: Array.from({ length: 12 }, (_, i) => ({
      id: "reply-" + i,
      author: i % 2 ? "You" : "Lin",
      side: i % 2 ? "outgoing" : "incoming",
      body:
        i === 0
          ? "Here is the reference for the workspace. I’ll share its preview when the file is ready."
          : i === 4
            ? "I’ll keep the reading view here while we review the earlier reference and add new replies."
            : "Reply " +
              (i + 1) +
              ": the layout leaves enough room for clear notes and the next steps.",
    })),
    preview: "idle",
    generation: 0,
  };
}
/** 模拟媒体元数据到达；真实图片解码与自然尺寸由浏览器处理。 */
export function createMessageScrollerDemo(
  notify: (state: MessageScrollerDemoState) => void,
) {
  let state = messageScrollerInitialState(),
    disposed = false,
    version = 0,
    sequence = 12;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const publish = (next: MessageScrollerDemoState) => {
    state = next;
    if (!disposed) notify(next);
  };
  const stop = () => {
    version++;
    if (timer !== undefined) clearTimeout(timer);
    timer = undefined;
  };
  const reply = (history = false): ConversationReply => {
    const id = sequence++;
    return {
      id: (history ? "history-" : "reply-") + id,
      author: history ? "Lin" : "You",
      side: history ? "incoming" : "outgoing",
      body: history
        ? "Earlier note: keep the reference close to the workspace discussion."
        : "New reply: the next step is ready for review.",
    };
  };
  return {
    get state() {
      return state;
    },
    loadPreview() {
      if (disposed || timer !== undefined || state.preview === "loaded") return;
      const request = ++version;
      publish({ ...state, preview: "loading" });
      timer = setTimeout(() => {
        timer = undefined;
        if (!disposed && request === version)
          publish({ ...state, preview: "loaded" });
      }, 500);
    },
    hidePreview() {
      if (disposed) return;
      stop();
      publish({ ...state, preview: "idle" });
    },
    cancelPreview() {
      if (state.preview === "loading") this.hidePreview();
    },
    insertHistoryAndReply() {
      if (!disposed)
        publish({
          ...state,
          rows: [reply(true), reply(true), ...state.rows, reply()],
        });
    },
    addReply() {
      if (!disposed) publish({ ...state, rows: [...state.rows, reply()] });
    },
    reset() {
      if (disposed) return;
      stop();
      sequence = 12;
      publish({
        ...messageScrollerInitialState(),
        generation: state.generation + 1,
      });
    },
    dispose() {
      disposed = true;
      stop();
    },
  };
}
