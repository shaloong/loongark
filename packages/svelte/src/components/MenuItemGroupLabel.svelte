<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ItemGroupLabel data-scope="menu" data-part="item-group-label" {...$$restProps}>
  <slot />
</Menu.ItemGroupLabel>
