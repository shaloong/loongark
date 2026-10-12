<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@loongark/primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.CloseTrigger
  {...$$restProps}
  aria-label={$$restProps["aria-label"] ?? "Close dialog"}
  data-scope="dialog"
  data-part="close-trigger"
>
  <slot><Icon icon={controlIcons.close} size="md" /></slot>
</Dialog.CloseTrigger>
