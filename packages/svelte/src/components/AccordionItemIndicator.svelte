<script lang="ts">
  import { Accordion } from "@ark-ui/svelte/accordion";
</script>

<Accordion.ItemIndicator
  data-scope="accordion"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</Accordion.ItemIndicator>
