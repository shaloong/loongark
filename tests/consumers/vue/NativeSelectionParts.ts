import { defineComponent, h, ref, render } from "vue";
import * as L from "../../../packages/vue/dist/index.js";

const supplied = (part: string) => () =>
  h("input", { "data-supplied-input": part });
const App = defineComponent({
  setup() {
    const tags = ref(["Vue"]);
    return () =>
      h(L.LoongArkProvider, {}, () => [
        h("h1", "Native selection parts"),
        h("form", { "aria-label": "Custom native selections" }, [
          h(L.LoongArkCheckboxRoot, { name: "agreement" }, () => [
            h(L.LoongArkCheckboxControl, {}, () =>
              h(L.LoongArkCheckboxIndicator),
            ),
            h(L.LoongArkCheckboxLabel, {}, () => "Custom agreement"),
            h(
              L.LoongArkCheckboxHiddenInput,
              { asChild: true },
              supplied("checkbox"),
            ),
          ]),
          h(
            L.LoongArkCheckboxRoot,
            { name: "subscribed", defaultChecked: true },
            () => [
              h(L.LoongArkCheckboxControl, {}, () =>
                h(L.LoongArkCheckboxIndicator),
              ),
              h(L.LoongArkCheckboxLabel, {}, () => "Default subscription"),
              h(
                L.LoongArkCheckboxHiddenInput,
                { asChild: true },
                supplied("checkbox-default"),
              ),
            ],
          ),
          h(L.LoongArkSwitchRoot, { name: "notifications" }, () => [
            h(L.LoongArkSwitchControl, {}, () => h(L.LoongArkSwitchThumb)),
            h(L.LoongArkSwitchLabel, {}, () => "Custom notifications"),
            h(
              L.LoongArkSwitchHiddenInput,
              { asChild: true },
              supplied("switch"),
            ),
          ]),
          h(
            L.LoongArkRadioGroupRoot,
            { name: "density", defaultValue: "compact" },
            () => [
              h(L.LoongArkRadioGroupLabel, {}, () => "Custom density"),
              ...["compact", "comfortable"].map((value) =>
                h(L.LoongArkRadioGroupItem, { value }, () => [
                  h(L.LoongArkRadioGroupItemControl),
                  h(L.LoongArkRadioGroupItemText, {}, () => value),
                  h(
                    L.LoongArkRadioGroupItemHiddenInput,
                    { asChild: true },
                    supplied("radio"),
                  ),
                ]),
              ),
            ],
          ),
          h(
            L.LoongArkTagsInputRoot,
            {
              name: "frameworks",
              modelValue: tags.value,
              onValueChange: (d: { value: string[] }) => {
                tags.value = d.value;
              },
            },
            () => [
              h(L.LoongArkTagsInputLabel, {}, () => "Custom frameworks"),
              h(L.LoongArkTagsInputControl, {}, () => [
                ...tags.value.map((value, index) =>
                  h(L.LoongArkTagsInputItem, { value, index }, () =>
                    h(L.LoongArkTagsInputItemText, {}, () => value),
                  ),
                ),
                h(L.LoongArkTagsInputInput),
              ]),
              h(
                L.LoongArkTagsInputHiddenInput,
                { asChild: true },
                supplied("tags"),
              ),
            ],
          ),
        ]),
      ]);
  },
});
export const mountNativeParts = () =>
  render(h(App), document.getElementById("fixture")!);
export const unmountNativeParts = () =>
  render(null, document.getElementById("fixture")!);
