import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  queryColumns,
  queryRows,
  createDataTableQueryDemo,
} from "../shared/dataTableQueryDemo";
export const DataTableQueryExample = defineComponent({
  setup() {
    const version = ref(0),
      demo = createDataTableQueryDemo(() => version.value++);
    const button = (
      label: string,
      action: () => void,
      variant: "outline" | "ghost" = "outline",
    ) => h(L.LoongArkButton, { variant, onClick: action }, () => label);
    return () => {
      version.value;
      const s = demo.snapshot;
      return h(
        L.LoongArkStack,
        { gap: "md", style: { width: "100%", maxWidth: "800px" } },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Find and compare projects",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Combine column filters. Hold Shift when sorting another column to add a priority.",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              s.locked ? "Allow query updates" : "Reject query updates",
              demo.toggleLocked,
            ),
            button(
              s.loading ? "Finish loading" : "Start loading",
              demo.toggleLoading,
            ),
            button(s.shown ? "Hide table" : "Show table", demo.toggleShown),
            button("Reset query", demo.reset, "ghost"),
          ]),
          s.shown &&
            h(L.LoongArkDataTable, {
              label: "Queryable projects",
              data: queryRows,
              columns: queryColumns,
              pageSize: 3,
              state: s.state,
              loading: s.loading,
              onStateChange: demo.change,
            }),
          h(
            "output",
            {
              "aria-label": "Query state",
              style: { overflowWrap: "anywhere" },
            },
            JSON.stringify(s.state),
          ),
        ],
      );
    };
  },
});
