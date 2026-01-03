<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
  import {
    createThemeStore,
    loongArkButton,
    loongArkInputWrapper,
    loongArkInputControl,
    loongArkInputPrefix,
    loongArkInputSuffix,
    loongArkInputHelper,
    loongArkDialogOverlay,
    loongArkDialogContent,
    loongArkDialogTitle,
    loongArkDialogDescription,
    loongArkDialogFooter,
    loongArkDialogCloseTrigger,
  } from "@loongark/svelte";
  import { defaultScenario, scenarioTestIds } from "../shared/demoScenario";

  createThemeStore("light");

  let email = "";
  const clearEmail = () => {
    email = "";
  };
</script>

<form data-testid={scenarioTestIds.form} class="demo-form">
  <label>
    <span class="demo-label">{defaultScenario.emailLabel}</span>
    <div
      data-testid={scenarioTestIds.inputWrapper}
      use:loongArkInputWrapper={{ size: "md", state: email ? "default" : "default" }}
    >
      <span
        data-testid={scenarioTestIds.inputPrefix}
        use:loongArkInputPrefix
      >
        {defaultScenario.prefixLabel}
      </span>
      <input
        type="email"
        placeholder={defaultScenario.emailPlaceholder}
        bind:value={email}
        use:loongArkInputControl={{ size: "md" }}
      />
      <span
        data-testid={scenarioTestIds.inputSuffix}
        use:loongArkInputSuffix={{ action: "button" }}
      >
        <button
          type="button"
          on:click|preventDefault={clearEmail}
          use:loongArkButton={{ variant: "ghost", size: "sm" }}
          data-testid={`${scenarioTestIds.inputSuffix}-button`}
        >
          {defaultScenario.suffixAction}
        </button>
      </span>
    </div>
  </label>
  <p
    data-testid={scenarioTestIds.helperText}
    use:loongArkInputHelper={{ variant: email ? "default" : "error" }}
  >
    {defaultScenario.helperText}
  </p>

  <Dialog.Root>
    <Dialog.Trigger>
      <button
        type="button"
        use:loongArkButton={{ variant: "solid" }}
        data-testid={scenarioTestIds.primaryButton}
        disabled={!email}
      >
        {defaultScenario.primaryLabel}
      </button>
    </Dialog.Trigger>
    <Dialog.Backdrop use:loongArkDialogOverlay={{ blur: true }} />
    <Dialog.Positioner>
      <Dialog.Content use:loongArkDialogContent={{ size: "md" }}>
        <Dialog.CloseTrigger
          use:loongArkDialogCloseTrigger
          aria-label="Close"
        />
        <Dialog.Title
          data-testid={scenarioTestIds.dialogTitle}
          use:loongArkDialogTitle
        >
          {defaultScenario.dialogTitle}
        </Dialog.Title>
        <Dialog.Description
          data-testid={scenarioTestIds.dialogDescription}
          use:loongArkDialogDescription
        >
          {defaultScenario.dialogDescription}
        </Dialog.Description>
        <footer use:loongArkDialogFooter>
          <button
            type="button"
            use:loongArkButton={{ variant: "ghost" }}
            data-testid={scenarioTestIds.secondaryButton}
          >
            {defaultScenario.secondaryLabel}
          </button>
          <button
            type="button"
            use:loongArkButton={{ variant: "solid" }}
            data-testid={`${scenarioTestIds.primaryButton}-dialog`}
          >
            {defaultScenario.primaryLabel}
          </button>
        </footer>
      </Dialog.Content>
    </Dialog.Positioner>
  </Dialog.Root>
</form>
