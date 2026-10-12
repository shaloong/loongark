<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCheckboxStyles } from "@loongark/primitives/automatic-styles/checkbox";
  registerAutomaticStyles(lkAutomaticCheckboxStyles);

  import { CheckboxLabel } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  $: dataAttrs = getDataAttrs("checkbox", "label");
</script>

<CheckboxLabel {...dataAttrs}>
  <slot />
</CheckboxLabel>
