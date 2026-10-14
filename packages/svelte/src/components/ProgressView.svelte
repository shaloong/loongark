<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticProgressStyles } from "@shaloong/loongark-primitives/automatic-styles/progress";
  registerAutomaticStyles(lkAutomaticProgressStyles);

  import type { ProgressViewProps } from "@ark-ui/svelte/progress";
  import { Progress } from "@ark-ui/svelte/progress";
  export let state: ProgressViewProps["state"];
</script>

<Progress.View {state} data-scope="progress" data-part="view" {...$$restProps}>
  <slot />
</Progress.View>
