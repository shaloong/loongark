<script lang="ts">
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
