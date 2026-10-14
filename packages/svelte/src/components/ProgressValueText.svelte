<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticProgressStyles } from "@shaloong/loongark-primitives/automatic-styles/progress";
  registerAutomaticStyles(lkAutomaticProgressStyles);

  import type { ComponentProps } from "svelte";
  import { Progress } from "@ark-ui/svelte/progress";
  let { children, ...props }: ComponentProps<typeof Progress.ValueText> =
    $props();
</script>

<Progress.ValueText
  {...props}
  {children}
  data-scope="progress"
  data-part="value-text"
/>
