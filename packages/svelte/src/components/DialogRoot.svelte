<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@loongark/primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";

  export let open: boolean | undefined = undefined;
  export let onOpenChange: ((details: { open: boolean }) => void) | undefined = undefined;
</script>

<Dialog.Root {open} {onOpenChange} {...$$restProps}>
  <slot />
</Dialog.Root>
