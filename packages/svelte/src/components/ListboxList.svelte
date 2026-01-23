<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.List data-scope="listbox" data-part="list" {...$$restProps}>
  <slot />
</Listbox.List>
