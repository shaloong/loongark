<script lang="ts">
  import type { StepsContentProps } from "@ark-ui/svelte/steps";
  import { Steps } from "@ark-ui/svelte/steps";
  export let index: StepsContentProps["index"];
</script>

<Steps.Content {index} data-scope="steps" data-part="content" {...$$restProps}>
  <slot />
</Steps.Content>
