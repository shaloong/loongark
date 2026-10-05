<script lang="ts">
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
