import { defineComponent, h, ref, onBeforeUnmount } from "vue";
import {
  LoongArkChart,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/vue";
import { createChartInteractionDemo } from "../shared/chartInteractionDemo";
export const ChartInteractionExample = defineComponent({
  setup() {
    const version = ref(0),
      demo = createChartInteractionDemo(() => version.value++);
    onBeforeUnmount(() => demo.dispose());
    return () => {
      version.value;
      const state = demo.state;
      const button = (label: string, action: () => void) =>
        h(
          LoongArkButton,
          { type: "button", variant: "outline", onClick: action },
          () => label,
        );
      return h(
        "div",
        {
          style: {
            maxWidth: "900px",
            display: "grid",
            gap: "var(--lk-space-component-md)",
          },
        },
        [
          h(LoongArkTypography, { as: "h2" }, () => "Explore changing data"),
          h(
            LoongArkTypography,
            { variant: "muted" },
            () =>
              "Zoom or adjust the category window. Inspect values with a pointer or the category selector.",
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
              button("Append point", demo.append),
              button(
                state.controlled
                  ? "Use uncontrolled range"
                  : "Use controlled range",
                demo.toggleControlled,
              ),
              button("Trim data", demo.trim),
              button(
                state.data.length ? "Clear data" : "Restore data",
                demo.toggleData,
              ),
              button(
                state.reject ? "Accept range changes" : "Reject range changes",
                demo.toggleReject,
              ),
              button(
                state.disabled ? "Enable chart" : "Disable chart",
                demo.toggleDisabled,
              ),
              button(
                state.type === "line" ? "Use bars" : "Use lines",
                demo.toggleType,
              ),
              button(
                state.shown ? "Hide chart" : "Show chart",
                demo.toggleShown,
              ),
              button(
                state.streaming ? "Stop live updates" : "Start live updates",
                demo.toggleStream,
              ),
            ],
          ),
          state.shown
            ? h(LoongArkChart, {
                data: state.data,
                series: demo.series,
                labelKey: "label",
                title: "Changing samples",
                type: state.type,
                zoomable: true,
                tooltip: true,
                interactive: true,
                showDataTable: true,
                range: state.controlled ? state.range : undefined,
                onRangeChange: demo.onRangeChange,
                disabled: state.disabled,
              })
            : null,
          h("output", {}, state.status),
          h("output", {}, `${state.data.length} samples`),
        ],
      );
    };
  },
});
