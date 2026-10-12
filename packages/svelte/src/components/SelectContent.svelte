<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { Select } from "@ark-ui/svelte/select";
  import { getSelectSize } from "./selectContext";

  const size = getSelectSize();
</script>

<Select.Content
  data-scope="select"
  data-part="content"
  data-size={$size}
  {...$$restProps}
>
  <slot />
</Select.Content>
