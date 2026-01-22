<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Positioner data-scope="menu" data-part="positioner" {...$$restProps}>
  <slot />
</Menu.Positioner>
