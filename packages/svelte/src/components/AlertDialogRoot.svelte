<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticAlertDialogStyles } from "@shaloong/loongark-primitives/automatic-styles/alert-dialog";
  registerAutomaticStyles(lkAutomaticAlertDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Root role="alertdialog" closeOnInteractOutside={false} {...$$restProps}
  ><slot /></Dialog.Root
>
