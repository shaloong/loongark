import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
const items = [
    { value: "design", label: "Design" },
    { value: "docs", label: "Documentation" },
    { value: "dev", label: "Development" },
    { value: "support", label: "Support", disabled: true },
  ],
  longNote =
    "Project note 1\nProject note 2\nProject note 3\nProject note 4\nProject note 5\nProject note 6\nProject note 7\nProject note 8\nProject note 9\nProject note 10\nProject note 11\nProject note 12";
export const SelectionInputsExample = defineComponent({
  setup() {
    const auto = ref(true);
    const assigned = ref(["dev"]),
      time = ref("08:30"),
      notes = ref(""),
      submitted = ref(0);
    const el = (
      component: any,
      attrs: Record<string, unknown>,
      ...children: any[]
    ) => h(component, attrs, () => children);
    return () =>
      el(
        L.LoongArkStack,
        { gap: "lg", style: { width: "100%", maxWidth: "800px" } },
        h(
          "form",
          {
            onSubmit: (event: Event) => {
              event.preventDefault();
              submitted.value++;
            },
          },
          [
            el(
              L.LoongArkStack,
              { gap: "lg" },
              h("section", [
                h("h2", "Workspace access"),
                el(L.LoongArkTransferList, {
                  items,
                  modelValue: assigned.value,
                  "onUpdate:modelValue": (v: string[]) => (assigned.value = v),
                  name: "members",
                }),
                h(
                  "output",
                  { "data-testid": "transfer-value" },
                  "Assigned: " + assigned.value.join(","),
                ),
              ]),
              el(
                L.LoongArkGrid,
                { columns: 2 },
                el(
                  L.LoongArkPaper,
                  {},
                  el(L.LoongArkTimePicker, {
                    label: "Meeting time",
                    name: "meeting",
                    modelValue: time.value,
                    "onUpdate:modelValue": (v: string) => (time.value = v),
                    minuteStep: 15,
                    min: "08:00",
                    max: "18:00",
                    locale: "en-US",
                    hourCycle: "h12",
                  }),
                  h("output", { "data-testid": "time-value" }, time.value),
                ),
                el(
                  L.LoongArkPaper,
                  {},
                  el(
                    L.LoongArkStack,
                    { gap: "sm" },
                    el(L.LoongArkLabel, { htmlFor: "autosize-notes" }, "Notes"),
                    h("label", { "data-lk-autosize-toggle": "" }, [
                      h("input", {
                        type: "checkbox",
                        checked: auto.value,
                        onChange: (e: Event) =>
                          (auto.value = (e.target as HTMLInputElement).checked),
                      }),
                      " Automatic height",
                    ]),
                    el(L.LoongArkTextarea, {
                      id: "autosize-notes",
                      name: "notes",
                      modelValue: notes.value,
                      "onUpdate:modelValue": (v: string) => (notes.value = v),
                      autoSize: auto.value,
                      minRows: 2,
                      maxRows: 5,
                      placeholder: "Add a note…",
                    }),
                    el(
                      L.LoongArkStack,
                      { orientation: "horizontal", gap: "sm" },
                      el(
                        L.LoongArkButton,
                        {
                          variant: "outline",
                          onClick: () => (notes.value = longNote),
                        },
                        "Insert long note",
                      ),
                      el(
                        L.LoongArkButton,
                        { variant: "ghost", onClick: () => (notes.value = "") },
                        "Clear notes",
                      ),
                    ),
                  ),
                ),
              ),
            ),
            h(
              "span",
              { hidden: true, "data-testid": "selection-submitted" },
              String(submitted.value),
            ),
          ],
        ),
      );
  },
});
