<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.Label data-scope="progress" data-part="label" {...$$restProps}>
  <slot />
</Progress.Label>
