import { defineComponent, h, ref, useId } from "vue";
import * as L from "@loongark/vue";
import {
  createCompoundFieldDemo,
  compoundFieldControls,
  compoundOwnFlags,
  compoundFieldLabel,
  compoundFieldCSS,
} from "../shared/compoundFieldDemo";
export const CompoundFieldExample = defineComponent({
  name: "CompoundFieldExample",
  setup() {
    const revision = ref(0),
      demo = createCompoundFieldDemo(() => revision.value++),
      note = useId();
    return () => {
      revision.value;
      const s = demo.snapshot;
      const field = (own: boolean, kind: "quantity" | "password") =>
        h(
          L.LoongArkFieldRoot,
          {
            disabled: s.disabled,
            readOnly: s.readOnly,
            invalid: s.invalid,
            required: s.required,
          },
          () => [
            h(L.LoongArkFieldLabel, () =>
              compoundFieldLabel(kind, own, s.long),
            ),
            kind === "quantity"
              ? h(
                  L.LoongArkNumberInputRoot,
                  {
                    ...(own ? compoundOwnFlags : {}),
                    name: own ? "own-quantity" : "quantity",
                    value: own ? s.ownQuantity : s.quantity,
                    defaultValue: "3",
                    min: 0,
                    max: 99,
                    onValueChange: (d: { value: string }) =>
                      demo.quantity(own, d.value),
                  },
                  () => [
                    h(L.LoongArkNumberInputControl, () => [
                      h(L.LoongArkNumberInputInput, {
                        "aria-describedby": note,
                      }),
                      h(L.LoongArkNumberInputIncrementTrigger),
                      h(L.LoongArkNumberInputDecrementTrigger),
                    ]),
                  ],
                )
              : h(
                  L.LoongArkPasswordInputRoot,
                  {
                    ...(own ? compoundOwnFlags : {}),
                    name: own ? "own-password" : "password",
                  },
                  () => [
                    h(L.LoongArkPasswordInputControl, () => [
                      h(L.LoongArkPasswordInputInput, {
                        placeholder: "Enter a password",
                        "aria-describedby": note,
                      }),
                      h(
                        L.LoongArkPasswordInputVisibilityTrigger,
                        {
                          "aria-label": own
                            ? "Show independent password"
                            : "Show password",
                        },
                        () => "Show",
                      ),
                    ]),
                  ],
                ),
            h(L.LoongArkFieldHelperText, () =>
              own
                ? "The input overrides all four Field flags."
                : kind === "quantity"
                  ? "A quantity between 0 and 99."
                  : "This demo accepts a sample password.",
            ),
            !own
              ? h(L.LoongArkFieldErrorText, () =>
                  kind === "quantity"
                    ? "Review the quantity before submitting."
                    : "Review the password before submitting.",
                )
              : null,
          ],
        );
      return h(
        L.LoongArkLocaleProvider,
        { locale: s.rtl ? "ar-EG" : "en-US" },
        () => [
          h("style", compoundFieldCSS),
          h(
            "form",
            {
              "data-compound-field-demo": "",
              dir: s.rtl ? "rtl" : "ltr",
              "aria-label": "Compound field preferences",
              onSubmit: (event: SubmitEvent) => {
                event.preventDefault();
                demo.submit(event.currentTarget as HTMLFormElement);
              },
            },
            [
              h("header", [
                h("h2", "Field state inheritance"),
                h(
                  "p",
                  { id: note },
                  "Disabled inputs are excluded from submission; read-only inputs keep their values.",
                ),
              ]),
              h(
                "div",
                { "data-demo-controls": "" },
                compoundFieldControls.map(([key, label]) =>
                  h(
                    L.LoongArkButton,
                    {
                      type: "button",
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
                { "data-demo-grid": "" },
                [false, true].map((own) =>
                  h("section", { key: String(own) }, [
                    h(
                      "h3",
                      own
                        ? "Explicit false overrides"
                        : "Inherited field state",
                    ),
                    field(own, "quantity"),
                    field(own, "password"),
                  ]),
                ),
              ),
              h("div", { "data-demo-controls": "" }, [
                h(
                  L.LoongArkButton,
                  { type: "submit", size: "sm" },
                  () => "Submit",
                ),
                h(
                  L.LoongArkButton,
                  { type: "reset", size: "sm", variant: "outline" },
                  () => "Reset",
                ),
              ]),
              h(
                "output",
                { role: "status", "aria-label": "Submitted field names" },
                s.submitted || "No submission yet",
              ),
            ],
          ),
        ],
      );
    };
  },
});
