<script lang="ts">
  import {
    LoongArkCheckboxRoot,
    LoongArkCheckboxControl,
    LoongArkCheckboxIndicator,
    LoongArkCheckboxLabel,
    LoongArkCheckboxHiddenInput,
  } from "@loongark/svelte";
</script>

<LoongArkCheckboxRoot name="terms">
  <LoongArkCheckboxControl>
    <LoongArkCheckboxIndicator />
  </LoongArkCheckboxControl>
  <LoongArkCheckboxLabel>同意条款</LoongArkCheckboxLabel>
  <LoongArkCheckboxHiddenInput />
</LoongArkCheckboxRoot>
