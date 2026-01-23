<script lang="ts">
  import { Listbox } from "@ark-ui/svelte/listbox";
</script>

<Listbox.Label data-scope="listbox" data-part="label" {...$$restProps}>
  <slot />
</Listbox.Label>
