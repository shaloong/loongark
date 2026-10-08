<script lang="ts">
  import {
    LoongArkPasswordInputRoot,
    LoongArkPasswordInputLabel,
    LoongArkPasswordInputControl,
    LoongArkPasswordInputInput,
    LoongArkPasswordInputIndicator,
    LoongArkPasswordInputVisibilityTrigger,
  } from "@loongark/svelte";
  import type {
    PasswordInputSize,
    PasswordInputState,
  } from "@loongark/primitives";

  export let size: PasswordInputSize = "md";
  export let state: PasswordInputState = "default";
  export let disabled = false;
  export let readOnly = false;
</script>

<LoongArkPasswordInputRoot {size} {state} {disabled} {readOnly}>
  <LoongArkPasswordInputLabel>Password</LoongArkPasswordInputLabel>
  <LoongArkPasswordInputControl {size} {state} {disabled}>
    <LoongArkPasswordInputInput
      {size}
      {state}
      {disabled}
      {readOnly}
      placeholder="Enter your password"
    />
    <LoongArkPasswordInputIndicator>●●●</LoongArkPasswordInputIndicator>
    <LoongArkPasswordInputVisibilityTrigger {disabled}>
      Show
    </LoongArkPasswordInputVisibilityTrigger>
  </LoongArkPasswordInputControl>
</LoongArkPasswordInputRoot>
