<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
  import type { StepsItemProps } from "@ark-ui/svelte/steps";

  export let value: StepsItemProps["value"] = undefined;
</script>

<Steps.Item
  {value}
  data-scope="steps"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Steps.Item>
