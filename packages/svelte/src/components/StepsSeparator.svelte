<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Separator data-scope="steps" data-part="separator" {...$$restProps}>
  <slot />
</Steps.Separator>
