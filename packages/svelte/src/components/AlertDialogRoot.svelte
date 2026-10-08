<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Root role="alertdialog" closeOnInteractOutside={false} {...$$restProps}
  ><slot /></Dialog.Root
>
