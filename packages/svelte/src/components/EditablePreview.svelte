<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticEditableStyles } from "@shaloong/loongark-primitives/automatic-styles/editable";
  registerAutomaticStyles(lkAutomaticEditableStyles);

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
