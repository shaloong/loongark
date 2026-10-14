<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@shaloong/loongark-primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { controlIcons } from "@shaloong/loongark-kit";
  import Icon from "./Icon.svelte";
  import { Combobox } from "@ark-ui/svelte/combobox";
</script>

<Combobox.Trigger data-scope="combobox" data-part="trigger" {...$$restProps}>
  <slot><Icon icon={controlIcons.chevronDown} size="sm" /></slot>
</Combobox.Trigger>
