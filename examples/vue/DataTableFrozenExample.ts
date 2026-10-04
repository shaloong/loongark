import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  frozenRows,
  frozenColumns,
  frozenTitle,
  frozenDescription,
  frozenKeys,
  frozenPins,
} from "../shared/dataTableFrozenDemo";
export const DataTableFrozenExample = defineComponent({
  setup() {
    const enabled = ref(true);
    const extra = ref(false);
    const owner = ref(true);
    const reversed = ref(false);
    const rtl = ref(false);
    const visible = ref(true);
    const ids = ref<string[]>([]);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: "width:100%;max-width:800px" },
        () => [
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(L.LoongArkTypography, { as: "h2" }, () => frozenTitle),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () => frozenDescription,
            ),
          ]),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => (enabled.value = !enabled.value),
              },
              () => (enabled.value ? "Unfreeze columns" : "Freeze columns"),
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => (extra.value = !extra.value),
              },
              () => (extra.value ? "Unfreeze owner" : "Freeze owner"),
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => (owner.value = !owner.value),
              },
              () => (owner.value ? "Hide owner" : "Show owner"),
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => (reversed.value = !reversed.value),
              },
              () =>
                reversed.value ? "Restore column order" : "Move notes first",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: () => (rtl.value = !rtl.value) },
              () => (rtl.value ? "Use LTR" : "Use RTL"),
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () => (visible.value = !visible.value),
              },
              () => (visible.value ? "Hide table" : "Show table"),
            ),
          ]),
          h("div", { dir: rtl.value ? "rtl" : "ltr" }, [
            visible.value
              ? h(L.LoongArkDataTable, {
                  label: "Release projects",
                  data: frozenRows,
                  columns: frozenColumns,
                  columnKeys: frozenKeys(owner.value, reversed.value),
                  pinnedColumns: frozenPins(enabled.value, extra.value),
                  pageSize: 3,
                  selectedIds: ids.value,
                  onSelectionChange: (next: string[]) => (ids.value = next),
                })
              : h("p", "Table hidden"),
          ]),
          h(
            "output",
            { "aria-label": "Selected release projects" },
            ids.value.length ? ids.value.join(", ") : "No projects selected",
          ),
        ],
      );
  },
});
