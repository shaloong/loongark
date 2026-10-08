<script lang="ts">
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
