<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.ItemGroup data-scope="listbox" data-part="item-group" {...$$restProps}>
  <slot />
</Listbox.ItemGroup>
