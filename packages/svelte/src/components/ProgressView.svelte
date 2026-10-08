<script lang="ts">
  import type { ProgressViewProps } from "@ark-ui/svelte/progress";
  import { Progress } from "@ark-ui/svelte/progress";
  export let state: ProgressViewProps["state"];
</script>

<Progress.View {state} data-scope="progress" data-part="view" {...$$restProps}>
  <slot />
</Progress.View>
