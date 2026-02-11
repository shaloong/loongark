<script lang="ts">
  import { PasswordInput } from "@ark-ui/svelte/password-input";
</script>

<PasswordInput.Label
  data-scope="password-input"
  data-part="label"
  {...$$restProps}
>
  <slot />
</PasswordInput.Label>
