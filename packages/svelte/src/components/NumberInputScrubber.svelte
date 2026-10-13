<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticNumberInputStyles } from "@loongark/primitives/automatic-styles/number-input";
  registerAutomaticStyles(lkAutomaticNumberInputStyles);

  import { NumberInput } from "@ark-ui/svelte/number-input";
</script>

<NumberInput.Scrubber
  data-scope="number-input"
  data-part="scrubber"
  {...$$restProps}
>
  <slot />
</NumberInput.Scrubber>
