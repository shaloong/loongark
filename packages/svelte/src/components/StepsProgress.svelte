<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticStepsStyles } from "@shaloong/loongark-primitives/automatic-styles/steps";
  registerAutomaticStyles(lkAutomaticStepsStyles);

  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Progress data-scope="steps" data-part="progress" {...$$restProps}>
  <slot />
</Steps.Progress>
