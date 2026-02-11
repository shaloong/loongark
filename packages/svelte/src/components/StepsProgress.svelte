<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Progress data-scope="steps" data-part="progress" {...$$restProps}>
  <slot />
</Steps.Progress>
