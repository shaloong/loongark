<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.Circle data-scope="progress" data-part="circle" {...$$restProps}>
  <slot />
</Progress.Circle>
