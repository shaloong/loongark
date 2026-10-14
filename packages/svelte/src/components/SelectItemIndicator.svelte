<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { controlIcons } from "@shaloong/loongark-kit";
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
