import { defineComponent, h, ref } from "vue";
import * as L from "@loongark/vue";
import { controlIcons } from "@loongark/kit";
import {
  createInputAdornmentDemo,
  adornmentControls,
  adornmentSizes,
  adornmentLabel,
  adornmentCSS,
} from "../shared/inputAdornmentDemo";
export const InputAdornmentsExample = defineComponent({
  name: "InputAdornmentsExample",
  setup() {
    const revision = ref(0),
      demo = createInputAdornmentDemo(() => revision.value++);
    return () => {
      revision.value;
      const s = demo.snapshot;
      return h(
        "section",
        { "data-input-adornments": "", dir: s.rtl ? "rtl" : "ltr" },
        [
          h("style", adornmentCSS),
          h(
            "div",
            { "data-demo-controls": "" },
            adornmentControls.map(([key, label]) =>
              h(
                L.LoongArkButton,
                {
                  size: "sm",
                  variant: "outline",
                  "aria-pressed": s[key],
                  onClick: () => demo.toggle(key),
                },
                () => label,
              ),
            ),
          ),
          h(
            "div",
            { "data-demo-fields": "" },
            adornmentSizes.map((size) =>
              h(
                L.LoongArkInputRoot,
                {
                  size,
                  disabled: s.disabled,
                  readOnly: s.readOnly,
                  state: s.invalid ? "invalid" : "default",
                },
                () => [
                  h(L.LoongArkInputLabel, () => adornmentLabel(size, s.long)),
                  h(L.LoongArkInputGroup, () => [
                    h(L.LoongArkInputPrefix, () =>
                      h(L.LoongArkIcon, {
                        icon: controlIcons.search,
                        size: "sm",
                      }),
                    ),
                    h(L.LoongArkInputControl, {
                      name: `search-${size}`,
                      modelValue: s.values[size],
                      "onUpdate:modelValue": (value: string) =>
                        demo.update(size, value),
                    }),
                    h(
                      L.LoongArkInputSuffix,
                      {
                        action: s.inspect ? "button" : "clear",
                        disabled: s.override ? false : undefined,
                        "aria-label": `${s.inspect ? "View" : "Clear"} search ${size}`,
                        onClick: () => demo.activate(size),
                      },
                      () =>
                        s.inspect
                          ? "View"
                          : h(L.LoongArkIcon, {
                              icon: controlIcons.close,
                              size: "sm",
                            }),
                    ),
                  ]),
                  h(L.LoongArkInputHelperText, () => "Search by project name."),
                  h(L.LoongArkInputErrorText, () => "Review the search term."),
                ],
              ),
            ),
          ),
          h("output", { "aria-label": "Viewed search value" }, s.inspected),
        ],
      );
    };
  },
});
