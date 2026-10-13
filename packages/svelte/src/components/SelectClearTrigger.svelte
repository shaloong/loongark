<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.ClearTrigger
  data-scope="select"
  data-part="clear-trigger"
  {...$$restProps}
>
  <slot />
</Select.ClearTrigger>
