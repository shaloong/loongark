<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@shaloong/loongark-primitives/automatic-styles/editable";
  registerAutomaticStyles(lkAutomaticEditableStyles);

  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableSubmitTriggerProps } from "@ark-ui/svelte/editable";
</script>

<Editable.SubmitTrigger
  data-scope="editable"
  data-part="submit-trigger"
  {...$$restProps}
>
  <slot />
</Editable.SubmitTrigger>
