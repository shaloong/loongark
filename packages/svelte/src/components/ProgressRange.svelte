<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticProgressStyles } from "@shaloong/loongark-primitives/automatic-styles/progress";
  registerAutomaticStyles(lkAutomaticProgressStyles);

  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.Range data-scope="progress" data-part="range" {...$$restProps}>
  <slot />
</Progress.Range>
