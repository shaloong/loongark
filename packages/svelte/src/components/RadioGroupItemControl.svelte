<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticRadioGroupStyles } from "@loongark/primitives/automatic-styles/radio-group";
  registerAutomaticStyles(lkAutomaticRadioGroupStyles);

  import { RadioGroup } from "@ark-ui/svelte/radio-group";
</script>

<RadioGroup.ItemControl {...$$restProps}>
  <slot />
</RadioGroup.ItemControl>
