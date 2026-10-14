<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDrawerStyles } from "@shaloong/loongark-primitives/automatic-styles/drawer";
  registerAutomaticStyles(lkAutomaticDrawerStyles);

  import { Drawer, type DrawerGrabberProps } from "@ark-ui/svelte/drawer";
  import { mergeProps } from "@zag-js/svelte";
  import { preventDrawerGrabberSelection } from "@shaloong/loongark-kit";

  let { ref = $bindable(null), ...props }: DrawerGrabberProps = $props();
  const merged = $derived(
    mergeProps(props, { onpointerdown: preventDrawerGrabberSelection }),
  );
</script>

<Drawer.Grabber bind:ref {...merged} />
