<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Arrow data-scope="menu" data-part="arrow" {...$$restProps}>
  <slot />
</Menu.Arrow>
