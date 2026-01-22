<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ItemText data-scope="menu" data-part="item-text" {...$$restProps}>
  <slot />
</Menu.ItemText>
