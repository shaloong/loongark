<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticStepsStyles } from "@loongark/primitives/automatic-styles/steps";
  registerAutomaticStyles(lkAutomaticStepsStyles);

  import type { StepsContentProps } from "@ark-ui/svelte/steps";
  import { Steps } from "@ark-ui/svelte/steps";
  export let index: StepsContentProps["index"];
</script>

<Steps.Content {index} data-scope="steps" data-part="content" {...$$restProps}>
  <slot />
</Steps.Content>
