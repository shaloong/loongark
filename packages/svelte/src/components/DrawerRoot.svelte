<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDrawerStyles } from "@loongark/primitives/automatic-styles/drawer";
  registerAutomaticStyles(lkAutomaticDrawerStyles);

  import { Drawer, type DrawerRootProps } from "@ark-ui/svelte/drawer";
  let {
    open = $bindable(),
    lazyMount = true,
    unmountOnExit = true,
    children,
    ...props
  }: DrawerRootProps = $props();
</script>

<Drawer.Root {lazyMount} {unmountOnExit} {...props} bind:open
  >{@render children?.()}</Drawer.Root
>
