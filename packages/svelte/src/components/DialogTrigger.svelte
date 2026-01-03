<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Trigger {...$$restProps}>
  <slot />
</Dialog.Trigger>
