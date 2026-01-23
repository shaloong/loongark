<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Positioner data-scope="combobox" data-part="positioner" {...$$restProps}>
  <slot />
</Combobox.Positioner>
