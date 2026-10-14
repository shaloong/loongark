<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCheckboxStyles } from "@shaloong/loongark-primitives/automatic-styles/checkbox";
  registerAutomaticStyles(lkAutomaticCheckboxStyles);

  import { CheckboxControl } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";
  import type { CheckboxSize } from "@shaloong/loongark-primitives";

  export let size: CheckboxSize = "md";

  $: dataAttrs = getDataAttrs("checkbox", "control", { size });
</script>

<CheckboxControl {...dataAttrs}>
  <slot />
</CheckboxControl>
