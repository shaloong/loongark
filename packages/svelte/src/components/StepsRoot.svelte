<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
  import type { StepsRootProps } from "@ark-ui/svelte/steps";
  import type { StepsOrientation, StepsSize } from "@loongark/primitives";

  export let size: StepsSize = "md";
  export let orientation: StepsOrientation = "horizontal";
  export let step: StepsRootProps["step"] = undefined;
  export let defaultStep: StepsRootProps["defaultStep"] = undefined;
  export let count: StepsRootProps["count"] = undefined;
  export let linear: StepsRootProps["linear"] = undefined;
  export let onStepChange: StepsRootProps["onStepChange"] = undefined;
</script>

<Steps.Root
  {step}
  {defaultStep}
  {count}
  {linear}
  {orientation}
  {onStepChange}
  data-scope="steps"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Steps.Root>
