<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticProgressStyles } from "@loongark/primitives/automatic-styles/progress";
  registerAutomaticStyles(lkAutomaticProgressStyles);

  import type { ProgressViewProps } from "@ark-ui/svelte/progress";
  import { Progress } from "@ark-ui/svelte/progress";
  export let state: ProgressViewProps["state"];
</script>

<Progress.View {state} data-scope="progress" data-part="view" {...$$restProps}>
  <slot />
</Progress.View>
