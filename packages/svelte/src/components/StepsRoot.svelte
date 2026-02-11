<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
  import type { StepsRootProps } from "@ark-ui/svelte/steps";
  import type { StepsOrientation, StepsSize } from "@loongark/primitives";

  export let size: StepsSize = "md";
  export let orientation: StepsOrientation = "horizontal";
  export let value: StepsRootProps["value"] = undefined;
  export let defaultValue: StepsRootProps["defaultValue"] = undefined;
  export let count: StepsRootProps["count"] = undefined;
  export let linear: StepsRootProps["linear"] = undefined;
  export let onValueChange: StepsRootProps["onValueChange"] = undefined;
</script>

<Steps.Root
  {value}
  {defaultValue}
  {count}
  {linear}
  {orientation}
  {onValueChange}
  data-scope="steps"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Steps.Root>
