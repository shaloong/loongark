<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ItemIndicator
  data-scope="select"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot><Icon icon={controlIcons.check} size="sm" /></slot>
</Select.ItemIndicator>
