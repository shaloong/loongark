import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
const choices = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Solid", value: "solid", disabled: true },
  { label: "Svelte", value: "svelte" },
];
export const AdvancedSelectionExample = defineComponent({
  setup() {
    const collection = L.createListCollection({ items: choices }),
      select = L.useSelect({
        collection,
        multiple: true,
        name: "frameworks",
        defaultValue: ["react"],
        closeOnSelect: false,
      }),
      pagination = L.usePagination({
        count: 100,
        pageSize: 10,
        defaultPage: 5,
      }),
      submitted = ref("");
    return () =>
      h(
        L.LoongArkStack,
        { gap: "lg", style: "width:100%;max-width:640px" },
        () => [
          h(L.LoongArkTypography, { as: "h2" }, () => "Control a selection"),
          h(
            "form",
            {
              onSubmit: (event: SubmitEvent) => {
                event.preventDefault();
                if (event.currentTarget instanceof HTMLFormElement)
                  submitted.value = new FormData(event.currentTarget)
                    .getAll("frameworks")
                    .join(", ");
              },
            },
            [
              h(L.LoongArkSelectRootProvider<(typeof choices)[number]>, { value: select.value }, () => [
                h(L.LoongArkSelectLabel, {}, () => "Frameworks"),
                h(L.LoongArkSelectControl, {}, () =>
                  h(L.LoongArkSelectTrigger, {}, () => [
                    h(L.LoongArkSelectValueText, {
                      placeholder: "Choose frameworks",
                    }),
                    h(
                      L.LoongArkSelectIndicator,
                      { "aria-hidden": "true" },
                      () => "⌄",
                    ),
                  ]),
                ),
                h(L.LoongArkSelectPositioner, {}, () =>
                  h(L.LoongArkSelectContent, {}, () =>
                    h(L.LoongArkSelectList, {}, () =>
                      choices.map((item) =>
                        h(
                          L.LoongArkSelectItem,
                          { item, key: item.value },
                          () => [
                            h(L.LoongArkSelectItemText, {}, () => item.label),
                            h(L.LoongArkSelectItemIndicator),
                          ],
                        ),
                      ),
                    ),
                  ),
                ),
                h(L.LoongArkSelectHiddenSelect),
              ]),
              h(
                L.LoongArkStack,
                {
                  orientation: "horizontal",
                  gap: "sm",
                  style: "margin-top:var(--lk-space-component-md)",
                },
                () => [
                  h(
                    L.LoongArkButton,
                    {
                      type: "button",
                      variant: "outline",
                      onClick: () => select.value.setValue(["react"]),
                    },
                    () => "Reset selection",
                  ),
                  h(
                    L.LoongArkButton,
                    { type: "submit" },
                    () => "Submit frameworks",
                  ),
                ],
              ),
            ],
          ),
          h(
            "output",
            { "aria-label": "Submitted frameworks" },
            submitted.value || "Not submitted",
          ),
          h(
            L.LoongArkPaginationRootProvider,
            { value: pagination.value, "aria-label": "Results pages" },
            () => [
              h(L.LoongArkPaginationFirstTrigger, {}, () => "First"),
              h(L.LoongArkPaginationPrevTrigger, {}, () => "Previous"),
              h(
                "span",
                `Page ${pagination.value.page} of ${pagination.value.totalPages}`,
              ),
              h(L.LoongArkPaginationNextTrigger, {}, () => "Next"),
              h(L.LoongArkPaginationLastTrigger, {}, () => "Last"),
            ],
          ),
        ],
      );
  },
});
