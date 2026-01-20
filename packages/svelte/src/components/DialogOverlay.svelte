<script lang="ts">
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
