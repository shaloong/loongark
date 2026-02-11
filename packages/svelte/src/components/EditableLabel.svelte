<script lang="ts">
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
