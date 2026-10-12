<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@loongark/primitives/automatic-styles/editable";
  registerAutomaticStyles(lkAutomaticEditableStyles);

  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableControlProps } from "@ark-ui/svelte/editable";
</script>

<Editable.Control
  data-scope="editable"
  data-part="control"
  {...$$restProps}
>
  <slot />
</Editable.Control>
