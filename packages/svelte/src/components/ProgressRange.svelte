<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.Range data-scope="progress" data-part="range" {...$$restProps}>
  <slot />
</Progress.Range>
