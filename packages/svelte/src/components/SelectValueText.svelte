<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
  registerAutomaticStyles(lkAutomaticSelectStyles);

  import type { ComponentProps } from "svelte";
  import { Select } from "@ark-ui/svelte/select";
  let { children, ...props }: ComponentProps<typeof Select.ValueText> =
    $props();
</script>

<Select.ValueText
  {...props}
  {children}
  data-scope="select"
  data-part="value-text"
/>
