<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@shaloong/loongark-primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import { recoverClosedMenuFocus } from "@shaloong/loongark-kit";
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
