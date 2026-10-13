<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@loongark/primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Positioner data-scope="menu" data-part="positioner" {...$$restProps}>
  <slot />
</Menu.Positioner>
