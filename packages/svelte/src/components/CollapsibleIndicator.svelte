<script lang="ts">
  import { Collapsible } from "@ark-ui/svelte/collapsible";
</script>

<Collapsible.Indicator
  data-scope="collapsible"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Collapsible.Indicator>
