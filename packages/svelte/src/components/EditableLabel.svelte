<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@loongark/primitives/automatic-styles/editable";
  registerAutomaticStyles(lkAutomaticEditableStyles);

  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableLabelProps } from "@ark-ui/svelte/editable";
</script>

<Editable.Label
  data-scope="editable"
  data-part="label"
  {...$$restProps}
>
  <slot />
</Editable.Label>
