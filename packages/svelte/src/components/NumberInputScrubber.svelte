<script lang="ts">
  import { NumberInput } from "@ark-ui/svelte/number-input";
</script>

<NumberInput.Scrubber
  data-scope="number-input"
  data-part="scrubber"
  {...$$restProps}
>
  <slot />
</NumberInput.Scrubber>
