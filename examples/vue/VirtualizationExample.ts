import { defineComponent, ref, h, type PropType } from "vue";
import {
  LoongArkDataTable,
  LoongArkMessageScroller,
  LoongArkMessage,
  LoongArkBubble,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/vue";
import { createVirtualizationDemo } from "../shared/virtualizationDemo";
export const VirtualizationExample = defineComponent({
  props: {
    mode: {
      type: String as PropType<"table" | "messages" | "both">,
      default: "both",
    },
  },
  setup(props) {
    const version = ref(0),
      demo = createVirtualizationDemo(() => {
        version.value++;
      });
    const button = (label: string, action: () => void) =>
        h(
          LoongArkButton,
          { type: "button", variant: "outline", onClick: action },
          () => label,
        ),
      toolbar = (buttons: ReturnType<typeof h>[]) =>
        h(
          "div",
          {
            style: {
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--lk-space-component-sm)",
            },
          },
          buttons,
        );
    return () => {
      version.value;
      const state = demo.state;
      return h(
        "div",
        {
          style: {
            maxWidth: "960px",
            display: "grid",
            gap: "var(--lk-space-component-md)",
          },
        },
        [
          h(LoongArkTypography, { as: "h2" }, () => "Measured windows"),
          h(
            LoongArkTypography,
            { variant: "muted" },
            () =>
              "Only the visible items and focused item stay mounted. Long content is measured as it changes.",
          ),
          toolbar([
            button(
              state.shown ? "Hide windows" : "Show windows",
              demo.toggleShown,
            ),
          ]),
          ...(props.mode !== "messages"
            ? [
                h(
                  LoongArkTypography,
                  { as: "h3" },
                  () => "1,000 editable rows",
                ),
                toolbar([
                  button("Scroll to first row", demo.firstRow),
                  button("Scroll to row 501", demo.middleRow),
                ]),
                state.shown
                  ? h(LoongArkDataTable, {
                      label: "Virtual projects",
                      data: state.rows,
                      columns: demo.columns,
                      pageSize: 1000,
                      virtualization: {
                        height: 360,
                        estimateSize: 56,
                        overscan: 3,
                        scrollToIndex: state.rowIndex,
                      },
                      defaultSelectedIds: ["row-0", "row-1"],
                      onCellCommit: demo.onCellCommit,
                      onBatchCommit: demo.onBatchCommit,
                      pinnedColumns: { start: ["name"] },
                    })
                  : null,
                h("output", state.status),
              ]
            : []),
          ...(props.mode !== "table"
            ? [
                h(
                  LoongArkTypography,
                  { as: "h3" },
                  () => "500 variable height messages",
                ),
                toolbar([
                  button("Read middle messages", demo.middleMessages),
                  button("Add earlier message", demo.prepend),
                  button("Append message", demo.append),
                  button("Expand message 251", demo.expand),
                  button("Remove message 251", demo.removeMessage),
                ]),
                state.shown
                  ? h(
                      LoongArkMessageScroller,
                      {
                        label: "Virtual messages",
                        virtualization: {
                          keys: state.messages.map((message) => message.key),
                          height: 360,
                          estimateSize: 96,
                          overscan: 3,
                          scrollToIndex: state.messageIndex,
                        },
                        onAtBottomChange: demo.onAtBottomChange,
                      },
                      {
                        item: ({ key }: { key: string; index: number }) => {
                          const message = state.messageMap.get(key)!;
                          return h(
                            LoongArkMessage,
                            { author: message.author },
                            () =>
                              h(
                                LoongArkBubble,
                                { style: { whiteSpace: "normal" } },
                                () => [
                                  h("p", message.text),
                                  h(
                                    LoongArkButton,
                                    {
                                      type: "button",
                                      variant: "ghost",
                                      "aria-label": `Inspect ${key}`,
                                    },
                                    () => "Inspect",
                                  ),
                                ],
                              ),
                          );
                        },
                      },
                    )
                  : null,
                h(
                  "output",
                  state.atBottom
                    ? "Following latest"
                    : "Reading earlier messages",
                ),
              ]
            : []),
        ],
      );
    };
  },
});
