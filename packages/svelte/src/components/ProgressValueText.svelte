<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.ValueText data-scope="progress" data-part="value-text" {...$$restProps}>
  <slot />
</Progress.ValueText>
