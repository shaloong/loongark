<script lang="ts">
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Trigger data-scope="combobox" data-part="trigger" {...$$restProps}>
  <slot />
</Combobox.Trigger>
