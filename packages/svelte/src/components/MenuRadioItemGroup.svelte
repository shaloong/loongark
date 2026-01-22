<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.RadioItemGroup data-scope="menu" data-part="item-group" {...$$restProps}>
  <slot />
</Menu.RadioItemGroup>
