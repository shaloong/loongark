<script lang="ts">
  import { recoverClosedMenuFocus } from "@loongark/kit";
  import { Menu } from "@ark-ui/svelte/menu";
  import { getMenuSize } from "./menuContext";

  const size = getMenuSize();
</script>

<Menu.Content
  data-scope="menu"
  data-part="content"
  data-size={$size}
  {...$$restProps}
  onfocusin={(event: FocusEvent) => {
    if (typeof $$restProps.onfocusin === "function") $$restProps.onfocusin(event);
    recoverClosedMenuFocus(event.currentTarget, event.relatedTarget);
  }}
>
  <slot />
</Menu.Content>
