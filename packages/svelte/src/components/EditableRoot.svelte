<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@loongark/primitives/automatic-styles/editable";
  registerAutomaticStyles(lkAutomaticEditableStyles);

  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableRootProps } from "@ark-ui/svelte/editable";
  import type { EditableSize, EditableState } from "@loongark/primitives";

  export let size: EditableSize = "md";
  export let state: EditableState = "default";
  export let disabled: EditableRootProps["disabled"] = undefined;
</script>

<Editable.Root
  {disabled}
  data-scope="editable"
  data-part="root"
  data-size={size}
  data-state={state !== "default" ? state : undefined}
  data-disabled={disabled ? "true" : undefined}
  {...$$restProps}
>
  <slot />
</Editable.Root>
