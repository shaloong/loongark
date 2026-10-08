<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.Content data-scope="listbox" data-part="list" {...$$restProps}>
  <slot />
</Listbox.Content>
