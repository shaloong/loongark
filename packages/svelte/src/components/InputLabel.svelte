<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@shaloong/loongark-primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.Label data-scope="input" data-part="label" {...$$restProps}>
  <slot />
</Field.Label>
