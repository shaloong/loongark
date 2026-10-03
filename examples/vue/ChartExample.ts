import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import {
  chartRows,
  chartSeries,
  gapRows,
  gapSeries,
} from "../shared/chartDemo";
export const ChartExample = defineComponent({
  setup() {
    const type = ref<"bar" | "line">("bar"),
      rows = ref(chartRows);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: "width:100%;max-width:800px" },
        () => [
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h1", style: "font-size:var(--lk-typography-fontsize-xl)" },
              () => "Regional performance",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () =>
                "Compare regional revenue, operating costs and contribution margin.",
            ),
          ]),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                onClick: () =>
                  (type.value = type.value === "bar" ? "line" : "bar"),
              },
              () => (type.value === "bar" ? "Show lines" : "Show bars"),
            ),
            h(
              L.LoongArkButton,
              {
                variant: "outline",
                disabled: !rows.value.length,
                onClick: () => (rows.value = []),
              },
              () => "Clear data",
            ),
            h(
              L.LoongArkButton,
              { variant: "ghost", onClick: () => (rows.value = chartRows) },
              () => "Restore data",
            ),
          ]),
          h(L.LoongArkChart, {
            data: rows.value,
            series: chartSeries,
            labelKey: "name",
            title: "Regional revenue",
            type: type.value,
          }),
          h(L.LoongArkStack, { gap: "sm" }, () => [
            h(
              L.LoongArkTypography,
              { as: "h2", style: "font-size:var(--lk-typography-fontsize-lg)" },
              () => "Weekly availability",
            ),
            h(
              L.LoongArkTypography,
              { variant: "muted" },
              () => "Missing Wednesday data leaves a gap in the line.",
            ),
            h(L.LoongArkChart, {
              data: gapRows,
              series: gapSeries,
              labelKey: "name",
              title: "Completed runs",
            }),
          ]),
        ],
      );
  },
});
