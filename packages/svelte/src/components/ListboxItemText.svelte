<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemText data-scope="listbox" data-part="item-text" {...$$restProps}>
  <slot />
</Listbox.ItemText>
