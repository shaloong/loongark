<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@shaloong/loongark-primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { controlIcons } from "@shaloong/loongark-kit";
  import Icon from "./Icon.svelte";
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.ItemIndicator
  data-scope="combobox"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot><Icon icon={controlIcons.check} size="sm" /></slot>
</Combobox.ItemIndicator>
