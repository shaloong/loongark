/** @jsxImportSource solid-js */
import { createSignal, Component } from "solid-js";
import {
  LoongArkProvider,
  LoongArkButton,
  LoongArkInputLabel,
  LoongArkInputRoot,
  LoongArkInputPrefix,
  LoongArkInputControl,
  LoongArkInputSuffix,
  LoongArkInputHelperText,
  LoongArkDialog,
} from "@loongark/solid";
import { defaultScenario, scenarioTestIds } from "../shared/demoScenario";

export const ButtonInputDialogExample: Component = () => {
  const [email, setEmail] = createSignal("");

  return (
    <LoongArkProvider mode="light">
      <form data-testid={scenarioTestIds.form}>
        <LoongArkInputLabel>{defaultScenario.emailLabel}</LoongArkInputLabel>
        <LoongArkInputRoot data-testid={scenarioTestIds.inputWrapper}>
          <LoongArkInputPrefix data-testid={scenarioTestIds.inputPrefix}>
            {defaultScenario.prefixLabel}
          </LoongArkInputPrefix>
          <LoongArkInputControl
            placeholder={defaultScenario.emailPlaceholder}
            value={email()}
            onInput={(
              event: InputEvent & { currentTarget: HTMLInputElement },
            ) => setEmail(event.currentTarget.value)}
          />
          <LoongArkInputSuffix
            action="button"
            data-testid={scenarioTestIds.inputSuffix}
          >
            <LoongArkButton
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setEmail("")}
              data-testid={`${scenarioTestIds.inputSuffix}-button`}
            >
              {defaultScenario.suffixAction}
            </LoongArkButton>
          </LoongArkInputSuffix>
        </LoongArkInputRoot>
        <LoongArkInputHelperText data-testid={scenarioTestIds.helperText}>
          {defaultScenario.helperText}
        </LoongArkInputHelperText>

        <LoongArkDialog.Root>
          <LoongArkDialog.Trigger>
            <LoongArkButton
              disabled={!email()}
              data-testid={scenarioTestIds.primaryButton}
            >
              {defaultScenario.primaryLabel}
            </LoongArkButton>
          </LoongArkDialog.Trigger>
          <LoongArkDialog.Overlay blur />
          <LoongArkDialog.Positioner>
            <LoongArkDialog.Content size="md">
              <LoongArkDialog.CloseTrigger aria-label="close" />
              <LoongArkDialog.Title data-testid={scenarioTestIds.dialogTitle}>
                {defaultScenario.dialogTitle}
              </LoongArkDialog.Title>
              <LoongArkDialog.Description
                data-testid={scenarioTestIds.dialogDescription}
              >
                {defaultScenario.dialogDescription}
              </LoongArkDialog.Description>
              <LoongArkDialog.Footer>
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
              </LoongArkDialog.Footer>
            </LoongArkDialog.Content>
          </LoongArkDialog.Positioner>
        </LoongArkDialog.Root>
      </form>
    </LoongArkProvider>
  );
};
