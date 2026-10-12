<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticInputStyles } from "@loongark/primitives/automatic-styles/input";
  registerAutomaticStyles(lkAutomaticInputStyles);
</script>
<div data-scope="input" data-part="group" {...$$restProps}><slot /></div>
