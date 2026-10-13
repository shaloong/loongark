<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDrawerStyles } from "@loongark/primitives/automatic-styles/drawer";
  registerAutomaticStyles(lkAutomaticDrawerStyles);

  import { Drawer, type DrawerGrabberProps } from "@ark-ui/svelte/drawer";
  import { mergeProps } from "@zag-js/svelte";
  import { preventDrawerGrabberSelection } from "@loongark/kit";

  let { ref = $bindable(null), ...props }: DrawerGrabberProps = $props();
  const merged = $derived(
    mergeProps(props, { onpointerdown: preventDrawerGrabberSelection }),
  );
</script>

<Drawer.Grabber bind:ref {...merged} />
