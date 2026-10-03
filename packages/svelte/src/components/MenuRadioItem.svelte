<script lang="ts">
  import type { MenuRadioItemProps } from "@ark-ui/svelte/menu";
  import { Menu } from "@ark-ui/svelte/menu";
  export let value: MenuRadioItemProps["value"];
</script>

<Menu.RadioItem {value} data-scope="menu" data-part="item" {...$$restProps}>
  <slot />
</Menu.RadioItem>
