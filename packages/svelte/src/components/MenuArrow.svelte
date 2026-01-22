<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Arrow data-scope="menu" data-part="arrow" {...$$restProps}>
  <slot />
</Menu.Arrow>
