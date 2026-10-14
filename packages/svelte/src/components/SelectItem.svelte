<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { Select } from "@ark-ui/svelte/select";

  export let item: object;
</script>

<Select.Item {item} data-scope="select" data-part="item" {...$$restProps}>
  <slot />
</Select.Item>
