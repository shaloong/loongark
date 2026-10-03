<script lang="ts">
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
