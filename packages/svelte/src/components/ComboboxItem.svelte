<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";
  registerAutomaticStyles(lkAutomaticComboboxStyles);

  import { Combobox } from "@ark-ui/svelte/combobox";

  export let item: object;
  export let persistFocus: boolean | undefined = undefined;
</script>

<Combobox.Item
  {item}
  {persistFocus}
  data-scope="combobox"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Combobox.Item>
