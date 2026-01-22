<script lang="ts">
  import { Toaster } from "@ark-ui/svelte/toast";
</script>

<Toaster data-scope="toast" data-part="group" {...$$restProps}>
  <slot />
</Toaster>
