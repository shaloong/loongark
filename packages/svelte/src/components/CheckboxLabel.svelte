<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCheckboxStyles } from "@shaloong/loongark-primitives/automatic-styles/checkbox";
  registerAutomaticStyles(lkAutomaticCheckboxStyles);

  import { CheckboxLabel } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  $: dataAttrs = getDataAttrs("checkbox", "label");
</script>

<CheckboxLabel {...dataAttrs}>
  <slot />
</CheckboxLabel>
