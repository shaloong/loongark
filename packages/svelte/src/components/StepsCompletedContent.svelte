<script lang="ts">
  import { Steps } from "@ark-ui/svelte/steps";
</script>

<Steps.CompletedContent
  data-scope="steps"
  data-part="completed-content"
  {...$$restProps}
>
  <slot />
</Steps.CompletedContent>
