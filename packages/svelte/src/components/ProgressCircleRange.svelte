<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.CircleRange
  data-scope="progress"
  data-part="circle-range"
  {...$$restProps}
>
  <slot />
</Progress.CircleRange>
