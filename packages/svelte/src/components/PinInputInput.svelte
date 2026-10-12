<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPinInputStyles } from "@loongark/primitives/automatic-styles/pin-input";
  registerAutomaticStyles(lkAutomaticPinInputStyles);

  import { PinInput } from "@ark-ui/svelte/pin-input";
  import type { PinInputPrimitiveProps } from "@loongark/primitives";

  export let index: number;
  export let size: NonNullable<PinInputPrimitiveProps["size"]> = "md";
  export let state: NonNullable<PinInputPrimitiveProps["state"]> = "default";
  export let autoCapitalize: boolean = false;
</script>

<PinInput.Input
  {index}
  data-scope="pin-input"
  data-part="input"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-capitalize={autoCapitalize || undefined}
  style={autoCapitalize ? "text-transform: uppercase" : undefined}
  {...$$restProps}
/>
