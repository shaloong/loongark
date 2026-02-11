<script lang="ts">
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
