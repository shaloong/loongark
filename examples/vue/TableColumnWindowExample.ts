import { defineComponent, h, ref, computed } from "vue";
import * as L from "@loongark/vue";
import { createTableColumnWindowDemo } from "../shared/tableColumnWindowDemo";
import {
  groupsDisclosureCSS,
  groupsDisclosureIcon,
} from "../shared/questionnaireGroupsDemo";
export const TableColumnWindowExample = defineComponent({
  setup() {
    const revision = ref(0),
      demo = createTableColumnWindowDemo(() => revision.value++),
      state = computed(() => {
        revision.value;
        return demo.state;
      });
    const button = (label: string, action: () => void) =>
      h(
        L.LoongArkButton,
        { type: "button", variant: "outline", onClick: action },
        { default: () => label },
      );
    const row = (children: ReturnType<typeof h>[]) =>
      h(
        "div",
        {
          style: {
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--lk-space-component-sm)",
          },
        },
        children,
      );
    return () => {
      const value = state.value;
      return h(
        L.LoongArkStack,
        { gap: "md", style: { maxWidth: "960px", width: "100%" } },
        {
          default: () => [
            h("style", groupsDisclosureCSS),
            h(
              L.LoongArkTypography,
              { as: "h2" },
              { default: () => "80 columns, 120 rows" },
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              {
                default: () =>
                  "Scroll in either direction. Frozen columns and the active cell stay available while the rest of the table is windowed.",
              },
            ),
            row([
              button("Go to first column", demo.jumpFirst),
              button("Go to column 41", demo.jumpMiddle),
            ]),
            h("details", { "data-groups-demo-controls": "" }, [
              h("summary", [
                h(L.LoongArkIcon, {
                  icon: groupsDisclosureIcon,
                  size: "sm",
                  "aria-hidden": "true",
                }),
                "More controls",
              ]),
              row([
                button(value.rtl ? "Use LTR" : "Use RTL", demo.toggleRtl),
                button(
                  value.pinned ? "Unfreeze columns" : "Freeze columns",
                  demo.togglePins,
                ),
                button(
                  value.virtual ? "Render all columns" : "Use column windows",
                  demo.toggleVirtual,
                ),
                button(
                  value.shown ? "Hide table" : "Show table",
                  demo.toggleShown,
                ),
                button(
                  value.reject ? "Accept updates" : "Reject updates",
                  demo.toggleReject,
                ),
                button(
                  value.held ? "Release held requests" : "Hold new requests",
                  demo.toggleHold,
                ),
                button("Remove column 41", demo.removeMiddle),
              ]),
            ]),
            h(
              "div",
              { dir: value.rtl ? "rtl" : "ltr" },
              value.shown
                ? h(L.LoongArkDataTable, {
                    label: "Windowed projects",
                    data: value.data,
                    columns: value.columns,
                    pageSize: 120,
                    virtualization: {
                      height: 360,
                      estimateSize: 64,
                      overscan: 2,
                    },
                    columnVirtualization: value.virtual
                      ? { width: 640, overscan: 2, scrollToIndex: value.index }
                      : undefined,
                    pinnedColumns: value.pinned
                      ? { start: ["c0"], end: ["c79"] }
                      : undefined,
                    cellSelection: true,
                    columnReorderable: true,
                    columnResizable: true,
                    onCellCommit: demo.onCellCommit,
                    onBatchCommit: demo.onBatchCommit,
                    onColumnKeysChange: demo.onColumnKeysChange,
                    onColumnWidthsChange: demo.onColumnWidthsChange,
                  })
                : undefined,
            ),
            h("output", { style: { overflowWrap: "anywhere" } }, value.status),
          ],
        },
      );
    };
  },
});
