<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { controlIcons } from "@loongark/kit";
  import Icon from "./Icon.svelte";
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Indicator data-scope="select" data-part="indicator" {...$$restProps}>
  <slot><Icon icon={controlIcons.chevronDown} size="sm" /></slot>
</Select.Indicator>
