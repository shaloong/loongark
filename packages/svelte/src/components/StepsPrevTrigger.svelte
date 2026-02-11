<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.PrevTrigger data-scope="steps" data-part="prev-trigger" {...$$restProps}>
  <slot />
</Steps.PrevTrigger>
