<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDrawerStyles } from "@loongark/primitives/automatic-styles/drawer";
  registerAutomaticStyles(lkAutomaticDrawerStyles);

  import { Drawer, type DrawerRootProviderProps } from "@ark-ui/svelte/drawer";
  let {
    lazyMount = true,
    unmountOnExit = true,
    children,
    ...props
  }: DrawerRootProviderProps = $props();
</script>

<Drawer.RootProvider {lazyMount} {unmountOnExit} {...props}
  >{@render children?.()}</Drawer.RootProvider
>
