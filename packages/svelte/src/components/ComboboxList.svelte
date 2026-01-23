<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.List data-scope="combobox" data-part="list" {...$$restProps}>
  <slot />
</Combobox.List>
