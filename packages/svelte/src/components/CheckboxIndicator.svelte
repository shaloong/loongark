<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCheckboxStyles } from "@loongark/primitives/automatic-styles/checkbox";
  registerAutomaticStyles(lkAutomaticCheckboxStyles);

  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { CheckboxIndicator } from "@ark-ui/svelte/checkbox";
  import { getDataAttrs } from "./utils";

  export let indeterminate: boolean = false;

  $: dataAttrs = getDataAttrs("checkbox", "indicator");
</script>

<CheckboxIndicator {indeterminate} {...dataAttrs}>
  <slot
    ><Icon
      icon={indeterminate ? controlIcons.minus : controlIcons.check}
      size="sm"
    /></slot
  >
</CheckboxIndicator>
