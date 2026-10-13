<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPasswordInputStyles } from "@loongark/primitives/automatic-styles/password-input";
  registerAutomaticStyles(lkAutomaticPasswordInputStyles);

  import { nativeSelectionProps } from "@loongark/kit";
  import { PasswordInput } from "@ark-ui/svelte/password-input";

  export let disabled: boolean | undefined = undefined;
</script>

<PasswordInput.VisibilityTrigger
  {...nativeSelectionProps({ disabled })}
  data-scope="password-input"
  data-part="visibility-trigger"
  {...nativeSelectionProps({
    "data-disabled": disabled === undefined ? undefined : String(disabled),
  })}
  {...$$restProps}
>
  <slot />
</PasswordInput.VisibilityTrigger>
