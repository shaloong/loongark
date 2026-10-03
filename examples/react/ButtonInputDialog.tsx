import { useState } from "react";
import {
  LoongArkButton,
  LoongArkInputRoot,
  LoongArkInputGroup,
  LoongArkInputControl,
  LoongArkInputLabel,
  LoongArkInputHelperText,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
  LoongArkDialog,
  LoongArkDialogOverlay,
  LoongArkDialogContent,
  LoongArkDialogTitle,
  LoongArkDialogDescription,
  LoongArkDialogFooter,
  LoongArkDialogCloseTrigger,
} from "@loongark/react";
import { defaultScenario, scenarioTestIds } from "../shared/demoScenario";

export const ButtonInputDialogExample = () => {
  const [email, setEmail] = useState("");

  return (
    <>
      <form data-testid={scenarioTestIds.form}>
        <LoongArkInputRoot data-testid={scenarioTestIds.inputWrapper}>
          <LoongArkInputLabel>{defaultScenario.emailLabel}</LoongArkInputLabel>
          <LoongArkInputGroup>
            <LoongArkInputPrefix data-testid={scenarioTestIds.inputPrefix}>
              {defaultScenario.prefixLabel}
            </LoongArkInputPrefix>
            <LoongArkInputControl
              placeholder={defaultScenario.emailPlaceholder}
              value={email}
              onChange={(event: { currentTarget: HTMLInputElement }) =>
                setEmail(event.currentTarget.value)
              }
            />
            <LoongArkInputSuffix
              action="clear"
              data-testid={scenarioTestIds.inputSuffix}
            >
              <LoongArkButton
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setEmail("")}
                data-testid={`${scenarioTestIds.inputSuffix}-button`}
              >
                {defaultScenario.suffixAction}
              </LoongArkButton>
            </LoongArkInputSuffix>
          </LoongArkInputGroup>
          <LoongArkInputHelperText data-testid={scenarioTestIds.helperText}>
            {defaultScenario.helperText}
          </LoongArkInputHelperText>
        </LoongArkInputRoot>

        <LoongArkDialog.Root>
          <LoongArkDialog.Trigger asChild>
            <LoongArkButton
              data-testid={scenarioTestIds.primaryButton}
              disabled={!email}
            >
              {defaultScenario.primaryLabel}
            </LoongArkButton>
          </LoongArkDialog.Trigger>
          <LoongArkDialog.Portal>
            <LoongArkDialogOverlay blur />
            <LoongArkDialog.Positioner>
              <LoongArkDialogContent data-size="md">
                <LoongArkDialogCloseTrigger />
                <LoongArkDialogTitle data-testid={scenarioTestIds.dialogTitle}>
                  {defaultScenario.dialogTitle}
                </LoongArkDialogTitle>
                <LoongArkDialogDescription
                  data-testid={scenarioTestIds.dialogDescription}
                >
                  {defaultScenario.dialogDescription}
                </LoongArkDialogDescription>
                <LoongArkDialogFooter>
                  <LoongArkButton
                    variant="ghost"
                    data-testid={scenarioTestIds.secondaryButton}
                  >
                    {defaultScenario.secondaryLabel}
                  </LoongArkButton>
                  <LoongArkButton
                    data-testid={`${scenarioTestIds.primaryButton}-dialog`}
                  >
                    {defaultScenario.primaryLabel}
                  </LoongArkButton>
                </LoongArkDialogFooter>
              </LoongArkDialogContent>
            </LoongArkDialog.Positioner>
          </LoongArkDialog.Portal>
        </LoongArkDialog.Root>
      </form>
    </>
  );
};
