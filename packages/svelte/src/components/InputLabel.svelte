<script lang="ts">
  import { Field } from "@ark-ui/svelte/field";
</script>

<Field.Label {...$$restProps}>
  <slot />
</Field.Label>
