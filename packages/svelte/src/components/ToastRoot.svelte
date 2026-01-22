<script lang="ts">
  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.Root data-scope="toast" data-part="root" {...$$restProps}>
  <slot />
</Toast.Root>
