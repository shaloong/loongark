<script lang="ts">
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
