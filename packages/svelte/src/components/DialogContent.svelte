<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
  import type { DialogPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<DialogPrimitiveProps["size"]> = "md";
  export let motion: NonNullable<DialogPrimitiveProps["motion"]> = "scale";
  export let placement: NonNullable<DialogPrimitiveProps["placement"]> = "center";
</script>

<Dialog.Positioner
  data-lk-dialog-positioner=""
  data-placement={placement}
  {...$$restProps}
>
  <Dialog.Content
    data-lk-dialog-content=""
    data-size={size}
    data-motion={motion}
  >
    <slot />
  </Dialog.Content>
</Dialog.Positioner>
