import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { createRangeDemo } from "../shared/dataTableRangeDemo";
export const DataTableRangeExample = defineComponent({
  setup() {
    const version = ref(0),
      demo = createRangeDemo(() => version.value++);
    return () => {
      version.value;
      const snapshot = demo.snapshot();
      const buttons = (start: number, end?: number) =>
        h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () =>
          demo.actions
            .slice(start, end)
            .map((action) =>
              h(
                L.LoongArkButton,
                { variant: "outline", onClick: action.run },
                () => action.label(),
              ),
            ),
        );
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "850px" } },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Edit a range of cells"),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Select with the pointer or Shift + arrows. Copy a range, then paste tab-separated values. Each accepted paste is one undoable transaction.",
          ),
          buttons(0, 3),
          h("details", [h("summary", "More test controls"), buttons(3)]),
          h(
            "div",
            { dir: snapshot.rtl ? "rtl" : "ltr" },
            snapshot.shown
              ? [h(L.LoongArkDataTable, demo.tableProps(snapshot))]
              : [],
          ),
          h(
            "output",
            { "aria-label": "Batch result" },
            `${snapshot.notice} · ${snapshot.count} batches · ${snapshot.canceled} canceled`,
          ),
          h(
            "output",
            {
              "aria-label": "Cell selection",
              style: { overflowWrap: "anywhere" },
            },
            snapshot.range
              ? `${snapshot.range.anchor.rowId}/${snapshot.range.anchor.columnKey} → ${snapshot.range.focus.rowId}/${snapshot.range.focus.columnKey}`
              : "No selection",
          ),
        ],
      );
    };
  },
});
