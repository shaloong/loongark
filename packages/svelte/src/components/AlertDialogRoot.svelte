<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticAlertDialogStyles } from "@loongark/primitives/automatic-styles/alert-dialog";
  registerAutomaticStyles(lkAutomaticAlertDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Root role="alertdialog" closeOnInteractOutside={false} {...$$restProps}
  ><slot /></Dialog.Root
>
