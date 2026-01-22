<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.RadioItem data-scope="menu" data-part="item" {...$$restProps}>
  <slot />
</Menu.RadioItem>
