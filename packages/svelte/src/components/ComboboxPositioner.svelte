<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Positioner data-scope="combobox" data-part="positioner" {...$$restProps}>
  <slot />
</Combobox.Positioner>
