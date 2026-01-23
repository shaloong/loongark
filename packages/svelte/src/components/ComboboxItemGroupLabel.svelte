<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemGroupLabel
  data-scope="combobox"
  data-part="item-group-label"
  {...$$restProps}
>
  <slot />
</Combobox.ItemGroupLabel>
