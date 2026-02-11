<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.List data-scope="steps" data-part="list" {...$$restProps}>
  <slot />
</Steps.List>
