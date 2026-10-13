<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { Select } from "@ark-ui/svelte/select";

  export let item: object;
</script>

<Select.Item {item} data-scope="select" data-part="item" {...$$restProps}>
  <slot />
</Select.Item>
