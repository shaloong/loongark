<script lang="ts">
  import { RadioGroup } from "@ark-ui/svelte/radio-group";
</script>

<RadioGroup.ItemText {...$$restProps}>
  <slot />
</RadioGroup.ItemText>
