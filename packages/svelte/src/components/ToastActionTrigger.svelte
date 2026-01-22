<script lang="ts">
  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.ActionTrigger
  data-scope="toast"
  data-part="action-trigger"
  {...$$restProps}
>
  <slot />
</Toast.ActionTrigger>
