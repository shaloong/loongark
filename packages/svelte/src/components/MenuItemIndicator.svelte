<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ItemIndicator data-scope="menu" data-part="item-indicator" {...$$restProps}>
  <slot />
</Menu.ItemIndicator>
