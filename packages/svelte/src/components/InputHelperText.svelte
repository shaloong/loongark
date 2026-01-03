<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.HelperText {...$$restProps}>
  <slot />
</Field.HelperText>
