<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPinInputStyles } from "@loongark/primitives/automatic-styles/pin-input";
  registerAutomaticStyles(lkAutomaticPinInputStyles);

  import { PinInput } from "@ark-ui/svelte/pin-input";
  import type { PinInputPrimitiveProps } from "@loongark/primitives";

  export let size: NonNullable<PinInputPrimitiveProps["size"]> = "md";
</script>

<PinInput.Control
  data-scope="pin-input"
  data-part="control"
  data-size={size}
  {...$$restProps}
>
  <slot />
</PinInput.Control>
