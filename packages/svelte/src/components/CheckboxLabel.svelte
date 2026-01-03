<script lang="ts">
  import { CheckboxLabel } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  $: dataAttrs = getDataAttrs("checkbox", "label");
</script>

<CheckboxLabel {...dataAttrs}>
  <slot />
</CheckboxLabel>
