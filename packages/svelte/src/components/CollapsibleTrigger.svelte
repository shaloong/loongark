<script lang="ts">
  import { Collapsible } from "@ark-ui/svelte/collapsible";
</script>

<Collapsible.Trigger
  data-scope="collapsible"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</Collapsible.Trigger>
