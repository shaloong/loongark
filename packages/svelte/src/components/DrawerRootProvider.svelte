<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDrawerStyles } from "@shaloong/loongark-primitives/automatic-styles/drawer";
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
