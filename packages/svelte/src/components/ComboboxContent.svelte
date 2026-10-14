<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@shaloong/loongark-primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";
  import { getComboboxSize } from "./comboboxContext";

  const size = getComboboxSize();
</script>

<Combobox.Content
  data-scope="combobox"
  data-part="content"
  data-size={$size}
  {...$$restProps}
>
  <slot />
</Combobox.Content>
