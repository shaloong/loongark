<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@shaloong/loongark-primitives/automatic-styles/editable";
  registerAutomaticStyles(lkAutomaticEditableStyles);

  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableCancelTriggerProps } from "@ark-ui/svelte/editable";
</script>

<Editable.CancelTrigger
  data-scope="editable"
  data-part="cancel-trigger"
  {...$$restProps}
>
  <slot />
</Editable.CancelTrigger>
