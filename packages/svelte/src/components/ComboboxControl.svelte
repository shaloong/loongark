<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Control data-scope="combobox" data-part="control" {...$$restProps}>
  <slot />
</Combobox.Control>
