<script lang="ts">
  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableEditTriggerProps } from "@ark-ui/svelte/editable";
</script>

<Editable.EditTrigger
  data-scope="editable"
  data-part="edit-trigger"
  {...$$restProps}
>
  <slot />
</Editable.EditTrigger>
