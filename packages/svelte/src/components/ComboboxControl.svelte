<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Control data-scope="combobox" data-part="control" {...$$restProps}>
  <slot />
</Combobox.Control>
