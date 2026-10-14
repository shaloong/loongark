<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@shaloong/loongark-primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemGroupLabel
  data-scope="combobox"
  data-part="item-group-label"
  {...$$restProps}
>
  <slot />
</Combobox.ItemGroupLabel>
