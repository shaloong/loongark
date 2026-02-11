<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";
</script>

<PasswordInput.Indicator
  data-scope="password-input"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</PasswordInput.Indicator>
