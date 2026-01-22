<script lang="ts">
  import { Accordion } from "@ark-ui/svelte/accordion";
  import type { AccordionItemProps } from "@ark-ui/svelte/accordion";

  export let value: AccordionItemProps["value"];
  export let disabled: AccordionItemProps["disabled"] = undefined;
</script>

<Accordion.Item
  {value}
  {disabled}
  data-scope="accordion"
  data-part="item"
  {...$$restProps}
>
  <slot />
</Accordion.Item>
