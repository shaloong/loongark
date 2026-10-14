<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@shaloong/loongark-primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import { Select } from "@ark-ui/svelte/select";
</script>

<Select.Trigger data-scope="select" data-part="trigger" {...$$restProps}>
  <slot />
</Select.Trigger>
