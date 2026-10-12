<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticPinInputStyles } from "@loongark/primitives/automatic-styles/pin-input";
  registerAutomaticStyles(lkAutomaticPinInputStyles);

  import { PinInput } from "@ark-ui/svelte/pin-input";
</script>

<PinInput.Label data-scope="pin-input" data-part="label" {...$$restProps}>
  <slot />
</PinInput.Label>
