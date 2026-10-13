<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticStepsStyles } from "@loongark/primitives/automatic-styles/steps";
  registerAutomaticStyles(lkAutomaticStepsStyles);

  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.PrevTrigger data-scope="steps" data-part="prev-trigger" {...$$restProps}>
  <slot />
</Steps.PrevTrigger>
