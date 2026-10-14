<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@shaloong/loongark-primitives/automatic-styles/editable";
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
