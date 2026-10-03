import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { inspectionData } from "../shared/arkAdditionsDemo";
export const JsonTreeViewExample = defineComponent({
  setup() {
    const data = ref(inspectionData);
    return () =>
      h(
        L.LoongArkStack,
        { gap: "md", style: "width:100%;max-width:640px" },
        () => [
          h(
            L.LoongArkTypography,
            { as: "h2" },
            () => "Inspect structured data",
          ),
          h(
            L.LoongArkTypography,
            { variant: "muted" },
            () =>
              "Expand branches with arrow keys. Values are rendered as text.",
          ),
          h(
            L.LoongArkButton,
            {
              type: "button",
              variant: "outline",
              onClick: () => {
                data.value = {
                  ...inspectionData,
                  project:
                    data.value.project === "LoongArk"
                      ? "Updated project"
                      : "LoongArk",
                };
              },
            },
            () => "Update data",
          ),
          h(
            L.LoongArkJsonTreeViewRoot,
            { data: data.value, defaultExpandedDepth: 1 },
            () =>
              h(
                L.LoongArkJsonTreeViewTree,
                { "aria-label": "Project data" },
                { arrow: () => h("span", { "aria-hidden": "true" }, "›") },
              ),
          ),
        ],
      );
  },
});
