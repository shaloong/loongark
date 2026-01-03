<script lang="ts">
  import { Switch } from "@ark-ui/svelte/switch";
</script>

<Switch.Label {...$$restProps}>
  <slot />
</Switch.Label>
