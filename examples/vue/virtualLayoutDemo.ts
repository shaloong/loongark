import { defineComponent, h, ref, type PropType } from "vue";
import * as L from "@loongark/vue";
import { createVirtualLayoutDemo } from "../shared/virtualLayoutDemo";
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
export const VirtualLayoutDemo = defineComponent({
  props: {
    kind: { type: String as PropType<"grid" | "masonry">, required: true },
  },
  setup(props) {
    const revision = ref(0),
      demo = createVirtualLayoutDemo(() => revision.value++);
    const button = (label: string, action: () => void) =>
      h(
        L.LoongArkButton,
        { type: "button", variant: "outline", onClick: action },
        () => label,
      );
    return () => {
      revision.value;
      const state = demo.state;
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "960px" } },
        () => [
          h("style", groupsDisclosureCSS),
          h(L.LoongArkTypography, { as: "h2" }, () =>
            props.kind === "grid"
              ? "10,000 rows, 80 columns"
              : "10,000 items, measured heights",
          ),
          h(L.LoongArkTypography, { variant: "muted" }, () =>
            props.kind === "grid"
              ? "Use arrow keys, Home, End or Page Down. Inputs keep their own editing keys."
              : "Scroll, resize and expand a card. Stable keys preserve the reading position.",
          ),
          h(
            "div",
            {
              style: {
                display: "flex",
                flexWrap: "wrap",
                gap: "var(--lk-space-component-sm)",
              },
            },
            [
              button("Go to first item", demo.jumpFirst),
              button("Go to item 5001", demo.jumpMiddle),
            ],
          ),
          h("details", { "data-groups-demo-controls": "" }, [
            h("summary", [
              h(L.LoongArkIcon, {
                icon: groupsDisclosureIcon,
                size: "sm",
                "aria-hidden": "true",
              }),
              "More controls",
            ]),
            h(
              "div",
              {
                style: {
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "var(--lk-space-component-sm)",
                },
              },
              [
                button(state.rtl ? "Use LTR" : "Use RTL", demo.toggleRtl),
                button(
                  state.narrow ? "Use full width" : "Use narrow width",
                  demo.toggleNarrow,
                ),
                button(
                  state.shown ? "Hide layout" : "Show layout",
                  demo.toggleShown,
                ),
                button(
                  state.empty ? "Restore data" : "Clear data",
                  demo.toggleData,
                ),
                button("Prepend item", demo.prepend),
                button("Remove first item", demo.removeFirst),
                button("Remove last item", demo.removeLast),
              ],
            ),
          ]),
          h(
            "div",
            {
              style: {
                width: state.narrow ? "320px" : "100%",
                maxWidth: "100%",
              },
            },
            state.shown
              ? [
                  props.kind === "grid"
                    ? h(L.LoongArkVirtualGrid, {
                        rowKeys: state.rows,
                        columnKeys: state.columns,
                        rowSize: demo.rowSize,
                        height: 360,
                        scrollToRow: state.index,
                        dir: state.rtl ? "rtl" : "ltr",
                        label: "Windowed cells",
                        renderCell: (details) =>
                          details.columnIndex === 1
                            ? h(L.LoongArkInputRoot, null, {
                                default: () =>
                                  h(L.LoongArkInputInput, {
                                    "aria-label": `Note for ${details.rowKey}`,
                                    value: demo.note(details),
                                    onInput: (event: Event) =>
                                      demo.updateNote(
                                        details,
                                        (
                                          event.currentTarget as HTMLInputElement
                                        ).value,
                                      ),
                                  }),
                              })
                            : h(
                                "span",
                                `R${details.rowIndex + 1} · C${details.columnIndex + 1}`,
                              ),
                      })
                    : h(L.LoongArkVirtualMasonry, {
                        keys: state.items,
                        height: 480,
                        minColumnWidth: 220,
                        scrollToIndex: state.index,
                        dir: state.rtl ? "rtl" : "ltr",
                        label: "Windowed collection",
                        renderItem: (entry) =>
                          h(L.LoongArkCard, {}, () =>
                            h(L.LoongArkCardContent, {}, () =>
                              h(L.LoongArkStack, { gap: "sm" }, () => [
                                h(L.LoongArkCardTitle, {}, () =>
                                  demo.title(entry),
                                ),
                                h(
                                  L.LoongArkTypography,
                                  { variant: "muted" },
                                  () => demo.body(entry),
                                ),
                                h(
                                  L.LoongArkButton,
                                  {
                                    type: "button",
                                    variant: "outline",
                                    "aria-expanded": demo.isExpanded(entry.key),
                                    onClick: () => demo.toggleItem(entry.key),
                                  },
                                  () =>
                                    `${demo.isExpanded(entry.key) ? "Collapse" : "Expand"} ${entry.key}`,
                                ),
                              ]),
                            ),
                          ),
                      }),
                ]
              : [],
          ),
        ],
      );
    };
  },
});
