<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@loongark/primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);

  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.ErrorText
  data-scope="input"
  data-part="helper-text"
  data-variant="error"
  {...$$restProps}
>
  <slot />
</Field.ErrorText>
