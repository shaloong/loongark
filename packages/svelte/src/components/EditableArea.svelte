<script lang="ts">
  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableAreaProps } from "@ark-ui/svelte/editable";
</script>

<Editable.Area
  data-scope="editable"
  data-part="area"
  {...$$restProps}
>
  <slot />
</Editable.Area>
