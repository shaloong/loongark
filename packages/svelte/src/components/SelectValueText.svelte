<script lang="ts">
  import { Select } from "@ark-ui/svelte/select";

  export let placeholder: string | undefined = undefined;
</script>

<Select.ValueText {placeholder} data-scope="select" data-part="value-text">
  <slot />
</Select.ValueText>
