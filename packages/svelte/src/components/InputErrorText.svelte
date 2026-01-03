<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.ErrorText {...$$restProps}>
  <slot />
</Field.ErrorText>
