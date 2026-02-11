<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
  import type { ProgressRootProps } from "@ark-ui/svelte/progress";
  import type { ProgressOrientation, ProgressSize } from "@loongark/primitives";

  export let size: ProgressSize = "md";
  export let orientation: ProgressOrientation = "horizontal";
  export let value: ProgressRootProps["value"] = undefined;
  export let defaultValue: ProgressRootProps["defaultValue"] = undefined;
  export let min: ProgressRootProps["min"] = undefined;
  export let max: ProgressRootProps["max"] = undefined;
  export let translations: ProgressRootProps["translations"] = undefined;
  export let onValueChange: ProgressRootProps["onValueChange"] = undefined;
</script>

<Progress.Root
  {value}
  {defaultValue}
  {min}
  {max}
  {translations}
  {orientation}
  {onValueChange}
  data-scope="progress"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Progress.Root>
