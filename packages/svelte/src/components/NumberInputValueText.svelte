<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticNumberInputStyles } from "@shaloong/loongark-primitives/automatic-styles/number-input";
  registerAutomaticStyles(lkAutomaticNumberInputStyles);

  import { NumberInput } from "@ark-ui/svelte/number-input";
  import type { NumberInputSize } from "@shaloong/loongark-primitives";

  export let size: NumberInputSize = "md";
</script>

<NumberInput.ValueText
  data-scope="number-input"
  data-part="value-text"
  data-size={size}
  {...$$restProps}
>
  <slot />
</NumberInput.ValueText>
