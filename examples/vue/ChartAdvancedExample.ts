import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  insightSeries,
  insightRows,
  insightKeys,
} from "../shared/chartAdvancedDemo";
export const ChartAdvancedExample = defineComponent({
  setup() {
    const keys = ref(insightKeys),
      locked = ref(false),
      fixed = ref(false),
      updated = ref(false),
      shown = ref(true);
    const button = (
      label: string,
      action: () => void,
      variant: "outline" | "ghost" = "outline",
    ) => h(L.LoongArkButton, { variant, onClick: action }, () => label);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "640px" } },
        () => [
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h2" },
              () => "Quarterly performance",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () =>
                "Compare series, focus on a value range and read the original numbers.",
            ),
          ]),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            button(
              locked.value ? "Allow series updates" : "Lock series updates",
              () => (locked.value = !locked.value),
            ),
            button(
              fixed.value ? "Use automatic range" : "Use 0–50 range",
              () => (fixed.value = !fixed.value),
            ),
            button(
              updated.value ? "Restore Q4" : "Update Q4",
              () => (updated.value = !updated.value),
            ),
            button(
              shown.value ? "Hide chart" : "Show chart",
              () => (shown.value = !shown.value),
              "ghost",
            ),
          ]),
          shown.value
            ? h(L.LoongArkChart, {
                title: "Quarterly metrics",
                data: updated.value
                  ? insightRows.map((row, index) =>
                      index === 3 ? { ...row, revenue: 72 } : row,
                    )
                  : insightRows,
                series: insightSeries,
                labelKey: "quarter",
                interactive: true,
                seriesKeys: keys.value,
                onSeriesKeysChange: (next: string[]) => {
                  if (!locked.value) keys.value = next;
                },
                domain: fixed.value ? [0, 50] : undefined,
                showDataTable: true,
              })
            : null,
          h(
            "output",
            { "aria-label": "Visible chart series" },
            keys.value.length ? keys.value.join(", ") : "No series selected",
          ),
        ],
      );
  },
});
