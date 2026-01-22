<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
  import { getMenuSize } from "./menuContext";

  const size = getMenuSize();
</script>

<Menu.Content data-scope="menu" data-part="content" data-size={$size} {...$$restProps}>
  <slot />
</Menu.Content>
