<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.CloseTrigger data-scope="dialog" data-part="close-trigger" {...$$restProps}>
  <slot />
</Dialog.CloseTrigger>
