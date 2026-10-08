<script lang="ts">
  import { RadioGroup } from "@ark-ui/svelte/radio-group";
</script>

<RadioGroup.Label {...$$restProps}>
  <slot />
</RadioGroup.Label>
