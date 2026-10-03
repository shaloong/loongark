<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.CloseTrigger
  {...$$restProps}
  aria-label={$$restProps["aria-label"] ?? "Close dialog"}
  data-scope="dialog"
  data-part="close-trigger"
>
  <slot />
</Dialog.CloseTrigger>
