<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.Track data-scope="progress" data-part="track" {...$$restProps}>
  <slot />
</Progress.Track>
