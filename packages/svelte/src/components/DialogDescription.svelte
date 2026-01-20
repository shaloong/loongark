<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Description data-scope="dialog" data-part="description" {...$$restProps}>
  <slot />
</Dialog.Description>
