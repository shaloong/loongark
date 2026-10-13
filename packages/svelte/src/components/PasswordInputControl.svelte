<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPasswordInputStyles } from "@loongark/primitives/automatic-styles/password-input";
  registerAutomaticStyles(lkAutomaticPasswordInputStyles);

  import { nativeSelectionProps } from "@loongark/kit";
  import { PasswordInput } from "@ark-ui/svelte/password-input";
  import type {
    PasswordInputSize,
    PasswordInputState,
  } from "@loongark/primitives";

  export let size: PasswordInputSize = "md";
  export let state: PasswordInputState = "default";
  export let disabled: boolean | undefined = undefined;
</script>

<PasswordInput.Control
  data-scope="password-input"
  data-part="control"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  {...nativeSelectionProps({
    "data-disabled": disabled === undefined ? undefined : String(disabled),
  })}
  {...$$restProps}
>
  <slot />
</PasswordInput.Control>
