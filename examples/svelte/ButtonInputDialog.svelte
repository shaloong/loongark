<script lang="ts">
  import {
    LoongArkProvider,
    LoongArkButton,
    LoongArkInputRoot,
    LoongArkInputGroup,
    LoongArkInputLabel,
    LoongArkInputControl,
    LoongArkInputPrefix,
    LoongArkInputSuffix,
    LoongArkInputHelperText,
    LoongArkDialog,
  } from "@loongark/svelte";
  import { defaultScenario, scenarioTestIds } from "../shared/demoScenario";
  let email = "";
</script>

<LoongArkProvider
  ><form data-testid={scenarioTestIds.form} class="demo-form">
    <LoongArkInputRoot
      ><LoongArkInputLabel>{defaultScenario.emailLabel}</LoongArkInputLabel
      ><LoongArkInputGroup data-testid={scenarioTestIds.inputWrapper}
        ><LoongArkInputPrefix data-testid={scenarioTestIds.inputPrefix}
          >{defaultScenario.prefixLabel}</LoongArkInputPrefix
        ><LoongArkInputControl
          type="email"
          placeholder={defaultScenario.emailPlaceholder}
          bind:value={email}
        /><LoongArkInputSuffix data-testid={scenarioTestIds.inputSuffix}
          ><LoongArkButton
            variant="ghost"
            size="sm"
            onclick={() => (email = "")}
            data-testid={scenarioTestIds.inputSuffix + "-button"}
            >{defaultScenario.suffixAction}</LoongArkButton
          ></LoongArkInputSuffix
        ></LoongArkInputGroup
      ><LoongArkInputHelperText data-testid={scenarioTestIds.helperText}
        >{defaultScenario.helperText}</LoongArkInputHelperText
      ></LoongArkInputRoot
    >
    <LoongArkDialog.Root
      ><LoongArkDialog.Trigger
        disabled={!email}
        data-testid={scenarioTestIds.primaryButton}
        >{defaultScenario.primaryLabel}</LoongArkDialog.Trigger
      ><LoongArkDialog.Portal
        ><LoongArkDialog.Overlay /><LoongArkDialog.Positioner
          ><LoongArkDialog.Content
            ><LoongArkDialog.Title data-testid={scenarioTestIds.dialogTitle}
              >{defaultScenario.dialogTitle}</LoongArkDialog.Title
            ><LoongArkDialog.Description
              data-testid={scenarioTestIds.dialogDescription}
              >{defaultScenario.dialogDescription}</LoongArkDialog.Description
            ><LoongArkDialog.Footer
              ><LoongArkDialog.CloseTrigger
                >{defaultScenario.secondaryLabel}</LoongArkDialog.CloseTrigger
              ><LoongArkButton
                data-testid={scenarioTestIds.primaryButton + "-dialog"}
                >{defaultScenario.primaryLabel}</LoongArkButton
              ></LoongArkDialog.Footer
            ></LoongArkDialog.Content
          ></LoongArkDialog.Positioner
        ></LoongArkDialog.Portal
      ></LoongArkDialog.Root
    >
  </form></LoongArkProvider
>
