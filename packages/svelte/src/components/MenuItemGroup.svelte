<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@loongark/primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ItemGroup data-scope="menu" data-part="item-group" {...$$restProps}>
  <slot />
</Menu.ItemGroup>
