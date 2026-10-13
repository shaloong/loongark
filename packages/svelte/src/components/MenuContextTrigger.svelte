<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticMenuStyles } from "@loongark/primitives/automatic-styles/menu";
  registerAutomaticStyles(lkAutomaticMenuStyles);

  import {
    useMenuContext,
    type MenuContextTriggerProps,
  } from "@ark-ui/svelte/menu";
  import { Ark } from "@ark-ui/svelte/factory";
  import { mergeProps } from "@zag-js/svelte";
  import { contextMenuPointerHandler } from "@loongark/kit";

  let { ref = $bindable(null), ...props }: MenuContextTriggerProps = $props();
  const menu = useMenuContext();
  const merged = $derived.by(() => {
    const native = menu().getContextTriggerProps();
    return mergeProps(
      {
        ...native,
        onpointerdown: contextMenuPointerHandler(native.onpointerdown),
        onpointerup: contextMenuPointerHandler(native.onpointerup),
        onpointermove: contextMenuPointerHandler(native.onpointermove),
        onpointercancel: contextMenuPointerHandler(native.onpointercancel),
      },
      props,
    );
  });
</script>

<Ark
  as="button"
  bind:ref
  {...merged}
  data-scope="menu"
  data-part="context-trigger"
/>
