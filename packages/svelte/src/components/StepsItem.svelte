<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
  import type { StepsItemProps } from "@ark-ui/svelte/steps";

  export let index: StepsItemProps["index"];
  // Ark preserves undefined overrides; null clears the presentational container state.
  const containerCurrent = null as unknown as StepsItemProps["aria-current"];
</script>

<Steps.Item
  role="presentation"
  aria-current={containerCurrent}
  {index}
  data-scope="steps"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Steps.Item>
