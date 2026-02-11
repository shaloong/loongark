<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.NextTrigger data-scope="steps" data-part="next-trigger" {...$$restProps}>
  <slot />
</Steps.NextTrigger>
