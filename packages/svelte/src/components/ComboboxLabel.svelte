<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Label data-scope="combobox" data-part="label" {...$$restProps}>
  <slot />
</Combobox.Label>
