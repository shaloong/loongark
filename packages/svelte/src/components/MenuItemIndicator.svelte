<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ItemIndicator data-scope="menu" data-part="item-indicator" {...$$restProps}>
  <slot />
</Menu.ItemIndicator>
