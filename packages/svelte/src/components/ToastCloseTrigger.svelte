<script lang="ts">
  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.CloseTrigger
  data-scope="toast"
  data-part="close-trigger"
  {...$$restProps}
>
  <slot />
</Toast.CloseTrigger>
