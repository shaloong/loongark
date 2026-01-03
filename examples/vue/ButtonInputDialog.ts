import { defineComponent, h, ref } from "vue";
import {
  LoongArkButton,
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputLabel,
  LoongArkInputHelperText,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
  LoongArkDialog,
} from "@loongark/vue";
import { defaultScenario, scenarioTestIds } from "../shared/demoScenario";

const {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Positioner: DialogPositioner,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  CloseTrigger: DialogCloseTrigger,
} = LoongArkDialog;

export const ButtonInputDialogExample = defineComponent({
  name: "ButtonInputDialogExample",
  setup() {
    const email = ref("");

    return () =>
      h("form", { "data-testid": scenarioTestIds.form }, [
        h(LoongArkInputLabel, null, {
          default: () => defaultScenario.emailLabel,
        }),
        h(
          LoongArkInputRoot,
          { "data-testid": scenarioTestIds.inputWrapper },
          {
            default: () => [
              h(
                LoongArkInputPrefix,
                { "data-testid": scenarioTestIds.inputPrefix },
                { default: () => defaultScenario.prefixLabel }
              ),
              h(LoongArkInputControl, {
                placeholder: defaultScenario.emailPlaceholder,
                modelValue: email.value,
                "onUpdate:modelValue": (value: string) => {
                  email.value = value;
                },
              }),
              h(
                LoongArkInputSuffix,
                {
                  action: "button",
                  "data-testid": scenarioTestIds.inputSuffix,
                },
                {
                  default: () =>
                    h(
                      LoongArkButton,
                      {
                        type: "button",
                        variant: "ghost",
                        size: "sm",
                        "data-testid": `${scenarioTestIds.inputSuffix}-button`,
                        onClick: () => {
                          email.value = "";
                        },
                      },
                      { default: () => defaultScenario.suffixAction }
                    ),
                }
              ),
            ],
          }
        ),
        h(
          LoongArkInputHelperText,
          { "data-testid": scenarioTestIds.helperText },
          { default: () => defaultScenario.helperText }
        ),
        h(DialogRoot, null, {
          default: () => [
            h(DialogTrigger, null, {
              default: () =>
                h(
                  LoongArkButton,
                  {
                    disabled: !email.value,
                    "data-testid": scenarioTestIds.primaryButton,
                  },
                  { default: () => defaultScenario.primaryLabel }
                ),
            }),
            h(DialogOverlay, { blur: true }),
            h(DialogPositioner, null, {
              default: () =>
                h(
                  DialogContent,
                  { "data-size": "md" },
                  {
                    default: () => [
                      h(DialogCloseTrigger),
                      h(
                        DialogTitle,
                        { "data-testid": scenarioTestIds.dialogTitle },
                        { default: () => defaultScenario.dialogTitle }
                      ),
                      h(
                        DialogDescription,
                        { "data-testid": scenarioTestIds.dialogDescription },
                        { default: () => defaultScenario.dialogDescription }
                      ),
                      h(DialogFooter, null, {
                        default: () => [
                          h(
                            LoongArkButton,
                            {
                              variant: "ghost",
                              "data-testid": scenarioTestIds.secondaryButton,
                            },
                            { default: () => defaultScenario.secondaryLabel }
                          ),
                          h(
                            LoongArkButton,
                            {
                              "data-testid": `${scenarioTestIds.primaryButton}-dialog`,
                            },
                            { default: () => defaultScenario.primaryLabel }
                          ),
                        ],
                      }),
                    ],
                  }
                ),
            }),
          ],
        }),
      ]);
  },
});
