<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.CircleTrack
  data-scope="progress"
  data-part="circle-track"
  {...$$restProps}
>
  <slot />
</Progress.CircleTrack>
