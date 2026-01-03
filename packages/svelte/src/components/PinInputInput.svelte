<script lang="ts">
  import { PinInput } from "@ark-ui/svelte/pin-input";

  export let index: number;
</script>

<PinInput.Input {index} {...$$restProps} />
