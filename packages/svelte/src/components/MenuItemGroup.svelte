<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ItemGroup data-scope="menu" data-part="item-group" {...$$restProps}>
  <slot />
</Menu.ItemGroup>
