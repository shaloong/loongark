<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.CloseTrigger {...$$restProps}>
  <slot />
</Dialog.CloseTrigger>
