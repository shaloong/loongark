<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Indicator data-scope="steps" data-part="indicator" {...$$restProps}>
  <slot />
</Steps.Indicator>
