<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Trigger data-scope="steps" data-part="trigger" {...$$restProps}>
  <slot />
</Steps.Trigger>
