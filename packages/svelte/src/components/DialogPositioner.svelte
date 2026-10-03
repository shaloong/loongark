<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Positioner {...$$restProps} data-scope="dialog" data-part="positioner"
  ><slot /></Dialog.Positioner
>
