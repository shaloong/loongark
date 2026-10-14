<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPasswordInputStyles } from "@shaloong/loongark-primitives/automatic-styles/password-input";
  registerAutomaticStyles(lkAutomaticPasswordInputStyles);

  import { PasswordInput } from "@ark-ui/svelte/password-input";
</script>

<PasswordInput.Label
  data-scope="password-input"
  data-part="label"
  {...$$restProps}
>
  <slot />
</PasswordInput.Label>
