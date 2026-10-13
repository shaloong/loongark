<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ClearTrigger
  data-scope="combobox"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</Combobox.ClearTrigger>
