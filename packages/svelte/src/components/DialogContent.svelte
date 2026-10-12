<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@loongark/primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
  import type { DialogPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<DialogPrimitiveProps["size"]> = "md";
  export let motion: NonNullable<DialogPrimitiveProps["motion"]> = "scale";
  export let placement: NonNullable<DialogPrimitiveProps["placement"]> =
    "center";
</script>

<Dialog.Content
  {...$$restProps}
  data-scope="dialog"
  data-part="content"
  data-size={size}
  data-motion={motion}
  data-placement={placement}
>
  <slot />
</Dialog.Content>
