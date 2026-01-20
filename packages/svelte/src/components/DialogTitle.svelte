<script lang="ts">
  import { Dialog } from "@ark-ui/svelte/dialog";
</script>

<Dialog.Title data-scope="dialog" data-part="title" {...$$restProps}>
  <slot />
</Dialog.Title>
