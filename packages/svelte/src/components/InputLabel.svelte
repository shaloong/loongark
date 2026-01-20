<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.Label data-scope="input" data-part="label" {...$$restProps}>
  <slot />
</Field.Label>
