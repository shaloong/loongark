<script lang="ts">
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
