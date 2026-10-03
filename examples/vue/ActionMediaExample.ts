import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { quickActions, mediaDemoItems } from "../shared/mediaDemo";
export const ActionMediaExample = defineComponent({
  setup() {
    const selected = ref("None"),
      submitted = ref(0),
      opened = ref(false),
      el = (c: any, p: any, ...children: any[]) => h(c, p, () => children);
    return () =>
      h(
        "form",
        {
          onSubmit: (e: Event) => {
            e.preventDefault();
            submitted.value++;
          },
        },
        el(
          L.LoongArkStack,
          { style: { width: "100%", maxWidth: "800px" } },
          el(
            L.LoongArkPaper,
            {},
            el(
              L.LoongArkStack,
              {},
              h("h2", "Workspace actions"),
              el(
                L.LoongArkStack,
                { orientation: "horizontal", gap: "sm" },
                el(
                  L.LoongArkFloatingActionButton,
                  {
                    "aria-label": "Create workspace",
                    onClick: () => (selected.value = "workspace"),
                  },
                  h("span", { "aria-hidden": "true" }, "＋"),
                ),
                el(
                  L.LoongArkFloatingActionButton,
                  {
                    extended: true,
                    variant: "secondary",
                    onClick: () => (selected.value = "import"),
                  },
                  "Import files",
                ),
                el(
                  L.LoongArkFloatingActionButton,
                  { disabled: true, "aria-label": "Unavailable action" },
                  h("span", { "aria-hidden": "true" }, "−"),
                ),
              ),
              h(
                "div",
                {
                  style: {
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    minHeight: "200px",
                  },
                },
                el(L.LoongArkSpeedDial, {
                  label: "Quick actions",
                  actions: quickActions,
                  open: opened.value,
                  onOpenChange: (d: { open: boolean }) =>
                    (opened.value = d.open),
                  onSelect: (d: { value: string }) =>
                    (selected.value = d.value),
                }),
              ),
              h(
                "output",
                { "data-testid": "action-value" },
                "Action: " + selected.value,
              ),
            ),
          ),
          h("section", [
            h("h2", "Image list"),
            el(
              L.LoongArkImageList,
              {
                columns: 3,
                gap: "sm",
                rowHeight: 180,
                "aria-label": "Image collection",
              },
              ...mediaDemoItems.slice(0, 4).map((item, i) =>
                el(
                  L.LoongArkImageListItem,
                  { columnSpan: i === 0 ? 2 : 1, rowSpan: i === 0 ? 2 : 1 },
                  h("img", {
                    src: item.src,
                    alt: item.alt,
                    width: item.width,
                    height: item.height,
                  }),
                  el(L.LoongArkImageListCaption, {}, item.label),
                ),
              ),
            ),
          ]),
          h("section", [
            h("h2", "Masonry"),
            el(
              L.LoongArkMasonry,
              { columns: 3, gap: "sm", "aria-label": "Masonry collection" },
              ...mediaDemoItems.map((item) =>
                el(
                  L.LoongArkMasonryItem,
                  {},
                  h("img", {
                    src: item.src,
                    alt: item.alt,
                    width: item.width,
                    height: item.height,
                  }),
                ),
              ),
            ),
          ]),
          h(
            "span",
            { hidden: true, "data-testid": "action-submitted" },
            submitted.value,
          ),
        ),
      );
  },
});
