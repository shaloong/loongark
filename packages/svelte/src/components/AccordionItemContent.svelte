<script lang="ts">
  import { Accordion } from "@ark-ui/svelte/accordion";
</script>

<Accordion.ItemContent
  data-scope="accordion"
  data-part="item-content"
  {...$$restProps}
>
  <slot />
</Accordion.ItemContent>
