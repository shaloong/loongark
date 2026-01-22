<script lang="ts">
  import { Accordion } from "@ark-ui/svelte/accordion";
</script>

<Accordion.ItemTrigger
  data-scope="accordion"
  data-part="item-trigger"
  {...$$restProps}
>
  <slot />
</Accordion.ItemTrigger>
