<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticPinInputStyles } from "@shaloong/loongark-primitives/automatic-styles/pin-input";
  registerAutomaticStyles(lkAutomaticPinInputStyles);

  import { PinInput } from "@ark-ui/svelte/pin-input";
</script>

<PinInput.Label data-scope="pin-input" data-part="label" {...$$restProps}>
  <slot />
</PinInput.Label>
