import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { createStructureDemo } from "../shared/dataTableStructureDemo";
export const DataTableStructureExample = defineComponent({
  setup() {
    const version = ref(0);
    const demo = createStructureDemo(() => version.value++);
    return () => {
      version.value;
      const s = demo.snapshot;
      return h(
        L.LoongArkStack,
        {
          gap: "md",
          style: { width: "100%", maxWidth: "850px" },
          dir: s.rtl ? "rtl" : "ltr",
        },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Explore teams and project hierarchy",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Group budgets by team or expand parent projects. Filters keep matching descendants in context.",
          ),
          h(L.LoongArkStack, { orientation: "horizontal", gap: "sm" }, () => [
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleKind },
              () =>
                s.kind === "group" ? "Show tree rows" : "Show grouped rows",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleReject },
              () => (s.reject ? "Allow expansion" : "Reject expansion"),
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleControlled },
              () =>
                s.controlled
                  ? "Use internal expansion"
                  : "Use controlled expansion",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleLoading },
              () => (s.loading ? "Finish loading" : "Start loading"),
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleVirtual },
              () =>
                s.virtual ? "Disable virtualization" : "Enable virtualization",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleRtl },
              () => (s.rtl ? "Use LTR" : "Use RTL"),
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.toggleShown },
              () => (s.shown ? "Hide table" : "Show table"),
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.collapseAll },
              () => "Collapse all",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.expandAll },
              () => "Expand all",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.removeChild },
              () => "Remove token row",
            ),
            h(
              L.LoongArkButton,
              { variant: "outline", onClick: demo.reset },
              () => "Reset data",
            ),
          ]),
          s.shown ? h(L.LoongArkDataTable, demo.tableProps(s)) : null,
          h(
            "output",
            { "aria-label": "Expansion state" },
            `Expanded rows: ${s.expanded.length} · Changes: ${s.changes}`,
          ),
          h(
            "output",
            { "aria-label": "Selected rows" },
            `Selected: ${s.selected.join(", ") || "none"}`,
          ),
        ],
      );
    };
  },
});
