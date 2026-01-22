<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Item data-scope="menu" data-part="item" {...$$restProps}>
  <slot />
</Menu.Item>
