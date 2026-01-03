<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Backdrop
  data-lk-dialog-overlay=""
  data-blur="true"
  {...$$restProps}
>
  <slot />
</Dialog.Backdrop>
