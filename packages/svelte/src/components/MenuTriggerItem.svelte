<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.TriggerItem data-scope="menu" data-part="trigger-item" {...$$restProps}>
  <slot />
</Menu.TriggerItem>
