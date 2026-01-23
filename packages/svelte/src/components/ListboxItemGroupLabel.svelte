<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemGroupLabel
  data-scope="listbox"
  data-part="item-group-label"
  {...$$restProps}
>
  <slot />
</Listbox.ItemGroupLabel>
