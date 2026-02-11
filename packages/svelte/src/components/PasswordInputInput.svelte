<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";
  import type { PasswordInputSize, PasswordInputState } from "@loongark/primitives";

  export let size: PasswordInputSize = "md";
  export let state: PasswordInputState = "default";
  export let disabled: boolean = false;
  export let readOnly: boolean = false;
</script>

<PasswordInput.Input
  {disabled}
  {readOnly}
  data-scope="password-input"
  data-part="input"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  data-readonly={readOnly ? "true" : undefined}
  {...$$restProps}
/>
