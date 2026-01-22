<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
</script>

<Menu.Separator data-scope="menu" data-part="separator" {...$$restProps}>
  <slot />
</Menu.Separator>
