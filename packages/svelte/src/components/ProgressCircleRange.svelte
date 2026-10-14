<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticProgressStyles } from "@shaloong/loongark-primitives/automatic-styles/progress";
  registerAutomaticStyles(lkAutomaticProgressStyles);

  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.CircleRange
  data-scope="progress"
  data-part="circle-range"
  {...$$restProps}
>
  <slot />
</Progress.CircleRange>
