import { defineComponent, ref, h } from "vue";
import {
  LoongArkDataTable,
  LoongArkButton,
  LoongArkTypography,
} from "@loongark/vue";
import { createDataTableEditDemo } from "../shared/dataTableEditDemo";
export const DataTableEditExample = defineComponent({
  props: { complex: Boolean },
  setup(props) {
    const version = ref(0),
      demo = createDataTableEditDemo(() => {
        version.value++;
      }, props.complex);
    return () => {
      version.value;
      const state = demo.state;
      return h(
        "div",
        {
          style: {
            maxWidth: "960px",
            display: "grid",
            gap: "var(--lk-space-component-md)",
          },
        },
        [
          h(LoongArkTypography, { as: "h2" }, () => "Edit project details"),
          h(LoongArkTypography, { variant: "muted" }, () =>
            props.complex
              ? "Choose an owner, or enter multiple lines. Ctrl/Command+Enter saves; Escape cancels."
              : "Enter to save, Escape to cancel. Changes stay in the draft until accepted.",
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
                { type: "button", variant: "outline", onClick: demo.failNext },
                () => "Fail next save",
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.removeFirst,
                },
                () => "Remove first row",
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleRevenue,
                },
                () => (state.hidden ? "Show revenue" : "Hide revenue"),
              ),
              h(
                LoongArkButton,
                { type: "button", variant: "outline", onClick: demo.toggleRtl },
                () => (state.rtl ? "Use LTR" : "Use RTL"),
              ),
              h(
                LoongArkButton,
                {
                  variant: "outline",
                  type: "button",
                  onClick: demo.toggleLoading,
                },
                () => (state.loading ? "Stop loading" : "Set loading"),
              ),
              h(
                LoongArkButton,
                {
                  type: "button",
                  variant: "outline",
                  onClick: demo.toggleShown,
                },
                () => (state.shown ? "Hide table" : "Show table"),
              ),
            ],
          ),
          h(
            "div",
            { dir: state.rtl ? "rtl" : "ltr" },
            state.shown
              ? [
                  h(LoongArkDataTable, {
                    label: "Editable projects",
                    data: state.rows,
                    columns: demo.columns,
                    columnKeys: state.hidden ? ["name", "owner"] : undefined,
                    pinnedColumns: { start: ["name"] },
                    loading: state.loading,
                    onCellCommit: demo.onCellCommit,
                  }),
                ]
              : [],
          ),
          h(
            LoongArkTypography,
            { variant: "muted" },
            () => `Cancelled saves: ${state.canceled}`,
          ),
          h("output", state.saved),
        ],
      );
    };
  },
});
