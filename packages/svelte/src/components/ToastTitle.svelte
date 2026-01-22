<script lang="ts">
  import { Toast } from "@ark-ui/svelte/toast";
</script>

<Toast.Title data-scope="toast" data-part="title" {...$$restProps}>
  <slot />
</Toast.Title>
