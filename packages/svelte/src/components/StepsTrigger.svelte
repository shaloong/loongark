<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticStepsStyles } from "@loongark/primitives/automatic-styles/steps";
  registerAutomaticStyles(lkAutomaticStepsStyles);

  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Trigger data-scope="steps" data-part="trigger" {...$$restProps}>
  <slot />
</Steps.Trigger>
