<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@shaloong/loongark-primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemGroup
  data-scope="combobox"
  data-part="item-group"
  {...$$restProps}
>
  <slot />
</Combobox.ItemGroup>
