import { defineComponent, h, ref } from "vue";
import {
  LoongArkChart,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/vue";
import { createChartTypesDemo, chartTypeModes } from "../shared/chartTypesDemo";
export const ChartTypesExample = defineComponent({
  setup() {
    const version = ref(0),
      demo = createChartTypesDemo(() => version.value++);
    return () => {
      version.value;
      const state = demo.state;
      return h(
        "div",
        {
          dir: state.rtl ? "rtl" : "ltr",
          style: {
            maxWidth: "900px",
            display: "grid",
            gap: "var(--lk-space-component-md)",
          },
        },
        [
          h(LoongArkTypography, { as: "h2" }, () => "Explore chart types"),
          h(
            LoongArkTypography,
            { variant: "muted" },
            () =>
              "Compare distributions, stacks and continuous axes. Missing values remain gaps.",
          ),
          h(
            "label",
            { style: { display: "grid", gap: "var(--lk-space-component-xs)" } },
            [
              "Chart type",
              h(
                "select",
                {
                  value: state.mode,
                  onChange: (e: Event) => {
                    if (e.currentTarget instanceof HTMLSelectElement)
                      demo.choose(e.currentTarget.value);
                  },
                  style: {
                    font: "inherit",
                    height: "var(--lk-control-height-md)",
                    background: "var(--lk-color-semantic-background)",
                    color: "var(--lk-color-semantic-foreground)",
                    border:
                      "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
                    borderRadius: "var(--lk-radius-md)",
                  },
                },
                chartTypeModes.map((item) =>
                  h("option", { value: item.value }, item.label),
                ),
              ),
            ],
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
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleReject,
                },
                () =>
                  state.reject
                    ? "Accept slice changes"
                    : "Reject slice changes",
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleControlled,
                },
                () =>
                  state.controlled
                    ? "Use uncontrolled slices"
                    : "Use controlled slices",
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleDisabled,
                },
                () => (state.disabled ? "Enable chart" : "Disable chart"),
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleEmpty,
                },
                () => (state.empty ? "Restore data" : "Clear data"),
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleDirection,
                },
                () => (state.rtl ? "Use LTR" : "Use RTL"),
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleShown,
                },
                () => (state.shown ? "Hide chart" : "Show chart"),
              ),
            ],
          ),
          state.shown ? h(LoongArkChart, demo.options) : null,
          h("output", {}, state.status),
        ],
      );
    };
  },
});
