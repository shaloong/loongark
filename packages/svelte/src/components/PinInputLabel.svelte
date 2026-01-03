<script lang="ts">
  import { PinInput } from "@ark-ui/svelte/pin-input";
</script>

<PinInput.Label {...$$restProps}>
  <slot />
</PinInput.Label>
