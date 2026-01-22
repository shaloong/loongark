<script lang="ts">
  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.Description data-scope="toast" data-part="description" {...$$restProps}>
  <slot />
</Toast.Description>
