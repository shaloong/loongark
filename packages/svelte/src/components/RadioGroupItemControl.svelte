<script lang="ts">
  import { RadioGroup } from "@ark-ui/svelte/radio-group";
</script>

<RadioGroup.ItemControl {...$$restProps}>
  <slot />
</RadioGroup.ItemControl>
