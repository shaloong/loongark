import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  projectRows,
  projectColumns,
  queueRows,
  queueColumns,
} from "../shared/dataTableDemo";
export const DataTableExample = defineComponent({
  setup() {
    const locked = ref(false);
    const rows = ref(projectRows),
      ids = ref<string[]>([]),
      revenue = ref(true),
      queue = ref(queueRows),
      changes = ref(0);
    const button = (
      text: string,
      action: () => void,
      disabled = false,
      variant: "outline" | "ghost" = "outline",
    ) =>
      h(L.LoongArkButton, { variant, onClick: action, disabled }, () => text);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: "width:100%;max-width:800px" },
        () => [
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h1", style: "font-size:var(--lk-typography-fontsize-xl)" },
              () => "Project access",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () =>
                "Review workspaces, select a page and keep your choices while filtering.",
            ),
          ]),
          h(L.LoongArkStack, { gap: "md" }, () => [
            h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
              button(
                "Clear selection",
                () => (ids.value = []),
                !ids.value.length,
              ),
              button(
                "Remove selected rows",
                () => {
                  rows.value = rows.value.filter(
                    (r) => !ids.value.includes(String(r.id)),
                  );
                  ids.value = [];
                },
                !ids.value.length,
              ),
              button(
                "Restore projects",
                () => {
                  rows.value = projectRows;
                  ids.value = [];
                },
                false,
                "ghost",
              ),
              button(
                revenue.value ? "Hide revenue" : "Show revenue",
                () => (revenue.value = !revenue.value),
                false,
                "ghost",
              ),
              button(
                locked.value ? "Unlock selection" : "Lock selection",
                () => (locked.value = !locked.value),
                false,
                "ghost",
              ),
            ]),
            h(L.LoongArkDataTable, {
              label: "Workspace projects",
              data: rows.value,
              columns: revenue.value
                ? projectColumns
                : projectColumns.filter((c) => c.key !== "amount"),
              pageSize: 2,
              selectedIds: ids.value,
              "onUpdate:selectedIds": (next: string[]) => {
                if (!locked.value) ids.value = next;
              },
            }),
          ]),
          h(L.LoongArkStack, { gap: "md" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h2", style: "font-size:var(--lk-typography-fontsize-lg)" },
              () => "Live queue",
            ),
            h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
              button(
                "Remove queued Alpha",
                () => (queue.value = queueRows.filter((r) => r.id !== "a")),
              ),
              button(
                "Restore queue",
                () => (queue.value = queueRows),
                false,
                "ghost",
              ),
            ]),
            h(L.LoongArkDataTable, {
              label: "Live queue",
              data: queue.value,
              columns: queueColumns,
              pageSize: 2,
              defaultSelectedIds: ["a"],
              onSelectionChange: () => changes.value++,
            }),
            h(L.LoongArkTypography, { variant: "muted" }, () =>
              h(
                "output",
                { "data-testid": "queue-changes" },
                `${changes.value} selection changes`,
              ),
            ),
          ]),
        ],
      );
  },
});
