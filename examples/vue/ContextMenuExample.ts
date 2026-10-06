import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { contextMenuDemoCSS } from "../shared/contextMenuDemo";
export const ContextMenuExample = defineComponent({
  setup() {
    const selection = ref("No action selected");
    return () =>
      h(
        "section",
        {
          "data-context-demo": "",
          style: { display: "grid", gap: "var(--lk-space-component-md)" },
        },
        [
          h("style", contextMenuDemoCSS),
          h("h2", "Context actions"),
          h(
            "p",
            "Right-click or press and hold the target. The actions button also supports keyboard navigation.",
          ),
          h(
            L.LoongArkMenuRoot,
            {
              onSelect: (details: { value: string }) => {
                selection.value = details.value;
              },
            },
            () => [
              h(
                L.LoongArkContextMenu.Trigger,
                {
                  tabindex: 0,
                  style: {
                    padding: "var(--lk-space-component-lg)",
                    border:
                      "var(--lk-control-borderwidth) solid var(--lk-color-semantic-border)",
                    borderRadius: "var(--lk-radius-lg)",
                  },
                },
                () => "Context target",
              ),
              h(L.LoongArkMenuTrigger, {}, () =>
                h(
                  L.LoongArkButton,
                  { variant: "outline", "data-context-actions": "" },
                  () => "Open actions",
                ),
              ),
              h(L.LoongArkPortal, {}, () =>
                h(L.LoongArkMenuPositioner, {}, () =>
                  h(L.LoongArkMenuContent, {}, () => [
                    h(
                      L.LoongArkMenuItem,
                      { value: "refresh" },
                      () => "Refresh",
                    ),
                    h(
                      L.LoongArkMenuItem,
                      { value: "archive" },
                      () => "Archive",
                    ),
                  ]),
                ),
              ),
            ],
          ),
          h("output", { "aria-label": "Selected action" }, selection.value),
        ],
      );
  },
});
