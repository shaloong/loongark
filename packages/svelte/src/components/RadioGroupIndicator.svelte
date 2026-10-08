<script lang="ts">
  import { RadioGroup } from "@ark-ui/svelte/radio-group";
</script>

<RadioGroup.Indicator {...$$restProps}>
  <slot />
</RadioGroup.Indicator>
