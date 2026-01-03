<script lang="ts">
  import { PinInput } from "@ark-ui/svelte/pin-input";
</script>

<PinInput.Control {...$$restProps}>
  <slot />
</PinInput.Control>
