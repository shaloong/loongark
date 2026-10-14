<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticDialogStyles } from "@shaloong/loongark-primitives/automatic-styles/dialog";
  registerAutomaticStyles(lkAutomaticDialogStyles);

  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Backdrop
  data-scope="dialog"
  data-part="backdrop"
  data-blur="true"
  {...$$restProps}
>
  <slot />
</Dialog.Backdrop>
