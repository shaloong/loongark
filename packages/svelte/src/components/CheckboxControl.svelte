<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCheckboxStyles } from "@loongark/primitives/automatic-styles/checkbox";
  registerAutomaticStyles(lkAutomaticCheckboxStyles);

  import { CheckboxControl } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";
  import type { CheckboxSize } from "@loongark/primitives";

  export let size: CheckboxSize = "md";

  $: dataAttrs = getDataAttrs("checkbox", "control", { size });
</script>

<CheckboxControl {...dataAttrs}>
  <slot />
</CheckboxControl>
