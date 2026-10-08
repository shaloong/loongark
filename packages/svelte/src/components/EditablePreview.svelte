<script lang="ts">
  import { Editable, type EditablePreviewProps } from "@ark-ui/svelte/editable";

  let { children, ref = $bindable(null), ...dom }: EditablePreviewProps = $props();
</script>

<Editable.Preview
  bind:ref
  {...dom}
  {children}
  data-scope="editable"
  data-part="preview"
/>
