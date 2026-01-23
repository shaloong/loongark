<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemIndicator
  data-scope="listbox"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</Listbox.ItemIndicator>
