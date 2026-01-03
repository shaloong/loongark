<script lang="ts">
  import { CheckboxIndicator } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  export let indeterminate: boolean = false;

  $: dataAttrs = getDataAttrs("checkbox", "indicator");
</script>

<CheckboxIndicator {indeterminate} {...dataAttrs}>
  <slot />
</CheckboxIndicator>
