<script lang="ts">
  import { Progress } from "@ark-ui/svelte/progress";
</script>

<Progress.View data-scope="progress" data-part="view" {...$$restProps}>
  <slot />
</Progress.View>
