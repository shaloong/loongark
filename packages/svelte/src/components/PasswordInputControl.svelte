<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";
  import type { PasswordInputSize, PasswordInputState } from "@loongark/primitives";

  export let size: PasswordInputSize = "md";
  export let state: PasswordInputState = "default";
  export let disabled: boolean = false;
</script>

<PasswordInput.Control
  data-scope="password-input"
  data-part="control"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</PasswordInput.Control>
