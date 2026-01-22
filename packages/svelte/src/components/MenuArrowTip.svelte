<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.ArrowTip data-scope="menu" data-part="arrow-tip" {...$$restProps}>
  <slot />
</Menu.ArrowTip>
