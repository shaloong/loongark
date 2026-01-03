<script lang="ts">
  import { CheckboxControl } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";
  import type { CheckboxSize } from "@loongark/primitives";

  export let size: CheckboxSize = "md";

  $: dataAttrs = getDataAttrs("checkbox", "control", { size });
</script>

<CheckboxControl {...dataAttrs}>
  <slot />
</CheckboxControl>
