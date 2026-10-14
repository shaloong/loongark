<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { controlIcons } from "@shaloong/loongark-kit";
  import Icon from "./Icon.svelte";
  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Indicator data-scope="select" data-part="indicator" {...$$restProps}>
  <slot><Icon icon={controlIcons.chevronDown} size="sm" /></slot>
</Select.Indicator>
