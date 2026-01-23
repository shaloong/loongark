<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemIndicator
  data-scope="combobox"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</Combobox.ItemIndicator>
