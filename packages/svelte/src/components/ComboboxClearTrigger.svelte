<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ClearTrigger
  data-scope="combobox"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</Combobox.ClearTrigger>
