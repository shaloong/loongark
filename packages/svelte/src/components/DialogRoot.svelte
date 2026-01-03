<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";

  export let open: boolean | undefined = undefined;
  export let onOpenChange: ((details: { open: boolean }) => void) | undefined = undefined;
</script>

<Dialog.Root {open} {onOpenChange} {...$$restProps}>
  <slot />
</Dialog.Root>
