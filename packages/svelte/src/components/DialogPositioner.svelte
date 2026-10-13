<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@loongark/primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Positioner {...$$restProps} data-scope="dialog" data-part="positioner"
  ><slot /></Dialog.Positioner
>
