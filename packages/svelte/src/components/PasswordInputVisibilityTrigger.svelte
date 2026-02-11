<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";

  export let disabled: boolean = false;
</script>

<PasswordInput.VisibilityTrigger
  {disabled}
  data-scope="password-input"
  data-part="visibility-trigger"
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</PasswordInput.VisibilityTrigger>
