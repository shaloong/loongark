<script lang="ts">
  import { PinInput } from "@ark-ui/svelte/pin-input";
</script>

<PinInput.Label data-scope="pin-input" data-part="label" {...$$restProps}>
  <slot />
</PinInput.Label>
