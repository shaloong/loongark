import { complexEditableColumns } from "./dataTableEditDemo";
import type { DataRow, DataTableProps } from "@loongark/kit";
export interface VirtualDemoMessage {
  key: string;
  author: string;
  text: string;
}
const initialRows = (): readonly DataRow[] =>
  Array.from({ length: 1000 }, (_, index) => ({
    id: `row-${index}`,
    name: `Project ${String(index + 1).padStart(4, "0")}${index % 12 === 0 ? " · A longer project title that wraps when the column is narrow" : ""}`,
    owner: index % 2 ? "Platform" : "Design",
    amount: (index + 1) * 20,
  }));
const initialMessages = (): readonly VirtualDemoMessage[] =>
  Array.from({ length: 500 }, (_, index) => ({
    key: `message-${index}`,
    author: index % 2 ? "Lin" : "Aki",
    text: `Message ${index + 1}. ${index % 8 === 0 ? "A longer note to exercise variable heights and keep the reading position stable across updates." : "Review the next step."}`,
  }));
const wait = (signal: AbortSignal) =>
  new Promise<void>((resolve) => {
    const finish = () => {
      signal.removeEventListener("abort", abort);
      resolve();
    };
    const timer = setTimeout(finish, 250);
    const abort = () => {
      clearTimeout(timer);
      finish();
    };
    if (signal.aborted) abort();
    else signal.addEventListener("abort", abort, { once: true });
  });
export function createVirtualizationDemo(changed: () => void) {
  let rows = initialRows(),
    messages = initialMessages(),
    rowIndex: number | undefined,
    messageIndex: number | undefined,
    shown = true,
    status = "No changes saved",
    history = 0,
    nextMessage = 500,
    atBottom = true;
  const update = () => changed();
  const onCellCommit: NonNullable<DataTableProps["onCellCommit"]> = async ({
    rowId,
    columnKey,
    value,
    signal,
  }) => {
    await wait(signal);
    if (signal.aborted) return;
    rows = rows.map((row) =>
      row.id === rowId ? { ...row, [columnKey]: value } : row,
    );
    status = `Saved ${columnKey} for ${rowId}`;
    update();
  };
  const onBatchCommit: NonNullable<DataTableProps["onBatchCommit"]> = async ({
    changes,
    signal,
    operation,
  }) => {
    await wait(signal);
    if (signal.aborted) return;
    rows = rows.map((row) =>
      changes
        .filter((change) => change.rowId === row.id)
        .reduce<DataRow>((current, change) => {
          const next = { ...current };
          if (change.value === undefined) delete next[change.columnKey];
          else next[change.columnKey] = change.value;
          return next;
        }, row),
    );
    status = `${operation === "undo" ? "Undid" : "Applied"} ${changes.length} changes`;
    update();
  };
  return {
    columns: complexEditableColumns,
    get state() {
      return {
        rows,
        messages,
        rowIndex,
        messageIndex,
        shown,
        status,
        atBottom,
        messageMap: new Map(messages.map((message) => [message.key, message])),
      };
    },
    onCellCommit,
    onBatchCommit,
    firstRow() {
      rowIndex = 0;
      update();
    },
    middleRow() {
      rowIndex = 500;
      update();
    },
    middleMessages() {
      messageIndex = 250;
      update();
    },
    prepend() {
      messages = [
        {
          key: `history-${++history}`,
          author: "Aki",
          text: "Earlier context. Keep reading the same message.",
        },
        ...messages,
      ];
      update();
    },
    append() {
      const id = nextMessage++;
      messages = [
        ...messages,
        {
          key: `message-${id}`,
          author: "Lin",
          text: `Message ${id + 1}. A newly received update.`,
        },
      ];
      update();
    },
    expand() {
      messages = messages.map((message) =>
        message.key === "message-250"
          ? {
              ...message,
              text:
                "Message 251. " +
                "Additional detail with variable height. ".repeat(25),
            }
          : message,
      );
      update();
    },
    removeMessage() {
      messages = messages.filter((message) => message.key !== "message-250");
      update();
    },
    toggleShown() {
      shown = !shown;
      update();
    },
    onAtBottomChange(details: { atBottom: boolean }) {
      if (atBottom !== details.atBottom) {
        atBottom = details.atBottom;
        update();
      }
    },
  };
}
