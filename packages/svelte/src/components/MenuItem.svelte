<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@loongark/primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import type { MenuItemProps } from "@ark-ui/svelte/menu";
  import { Menu } from "@ark-ui/svelte/menu";
  export let value: MenuItemProps["value"];
</script>

<Menu.Item {value} data-scope="menu" data-part="item" {...$$restProps}>
  <slot />
</Menu.Item>
