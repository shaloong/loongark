<script lang="ts">
  import { Editable } from "@ark-ui/svelte/editable";
  import type { EditablePreviewProps } from "@ark-ui/svelte/editable";
</script>

<Editable.Preview
  data-scope="editable"
  data-part="preview"
  {...$$restProps}
>
  <slot />
</Editable.Preview>
