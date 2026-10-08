import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  columnLayoutRows,
  columnLayoutDefaultWidths,
  createColumnLayoutDemo,
} from "../shared/dataTableColumnsDemo";
export const DataTableColumnsExample = defineComponent({
  setup() {
    const version = ref(0),
      demo = createColumnLayoutDemo(() => version.value++);
    return () => {
      version.value;
      const snapshot = demo.snapshot;
      const button = (label: string, action: () => void, reset = false) =>
        h(
          L.LoongArkButton,
          { variant: reset ? "ghost" : "outline", onClick: action },
          () => label,
        );
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "720px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Arrange your columns"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Drag a handle or use arrow keys to move a column. Drag an edge to resize. Smaller screens scroll within the table.",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              snapshot.controlled
                ? "Use uncontrolled columns"
                : "Use controlled columns",
              demo.toggleControlled,
            ),
            button(
              snapshot.reject
                ? "Accept column updates"
                : "Reject column updates",
              demo.toggleReject,
            ),
            button(
              snapshot.pinned ? "Unfreeze columns" : "Freeze outer columns",
              demo.togglePinned,
            ),
            button(snapshot.rtl ? "Use LTR" : "Use RTL", demo.toggleRtl),
            button(
              snapshot.hiddenRevenue ? "Show revenue" : "Hide revenue",
              demo.toggleRevenue,
            ),
            button(
              snapshot.extra ? "Remove notes column" : "Add notes column",
              demo.toggleExtra,
            ),
            button(
              snapshot.loading ? "Finish loading" : "Start loading",
              demo.toggleLoading,
            ),
            button(
              snapshot.shown ? "Hide table" : "Show table",
              demo.toggleShown,
            ),
            button("Reset columns", demo.reset, true),
          ]),
          h(
            "div",
            { dir: snapshot.rtl ? "rtl" : "ltr" },
            snapshot.shown
              ? [
                  h(L.LoongArkDataTable, {
                    label: "Arrangeable projects",
                    data: columnLayoutRows,
                    columns: snapshot.columns,
                    columnReorderable: true,
                    columnResizable: true,
                    columnKeys: snapshot.controlled ? snapshot.keys : undefined,
                    columnWidths: snapshot.controlled
                      ? snapshot.widths
                      : undefined,
                    defaultColumnWidths: columnLayoutDefaultWidths,
                    pinnedColumns: snapshot.pinned
                      ? { start: ["name"], end: ["revenue"] }
                      : undefined,
                    loading: snapshot.loading,
                    onColumnKeysChange: demo.order,
                    onColumnWidthsChange: demo.resize,
                  }),
                ]
              : [],
          ),
          h(
            "output",
            {
              "aria-label": "Column updates",
              style: { overflowWrap: "anywhere" },
            },
            `${snapshot.notice} · ${snapshot.count} callbacks`,
          ),
          h(
            "output",
            {
              "aria-label": "Configured widths",
              style: { overflowWrap: "anywhere" },
            },
            JSON.stringify(snapshot.widths),
          ),
        ],
      );
    };
  },
});
