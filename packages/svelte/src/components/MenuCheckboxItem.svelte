<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.CheckboxItem data-scope="menu" data-part="item" {...$$restProps}>
  <slot />
</Menu.CheckboxItem>
