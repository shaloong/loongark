<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Indicator data-scope="menu" data-part="indicator" {...$$restProps}>
  <slot />
</Menu.Indicator>
