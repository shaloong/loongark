<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Content {...$$restProps} data-scope="drawer" data-part="content"
  ><slot /></Dialog.Content
>
