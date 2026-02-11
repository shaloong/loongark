<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.Content data-scope="steps" data-part="content" {...$$restProps}>
  <slot />
</Steps.Content>
