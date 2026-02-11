<script lang="ts">
  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditableInputProps } from "@ark-ui/svelte/editable";
</script>

<Editable.Input
  data-scope="editable"
  data-part="input"
  {...$$restProps}
/>
