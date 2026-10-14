<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import type { MenuCheckboxItemProps } from "@ark-ui/svelte/menu";
  import { Menu } from "@ark-ui/svelte/menu";
  export let value: MenuCheckboxItemProps["value"];
  export let checked: MenuCheckboxItemProps["checked"];
</script>

<Menu.CheckboxItem
  {value}
  {checked}
  data-scope="menu"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Menu.CheckboxItem>
