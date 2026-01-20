<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.ErrorText
  data-scope="input"
  data-part="helper-text"
  data-variant="error"
  {...$$restProps}
>
  <slot />
</Field.ErrorText>
