<script lang="ts">
  import { Switch } from "@ark-ui/svelte/switch";

  export let disabled: boolean = false;
</script>

<Switch.Label
  data-scope="switch"
  data-part="label"
  data-disabled={disabled || undefined}
  {...$$restProps}
>
  <slot />
</Switch.Label>
