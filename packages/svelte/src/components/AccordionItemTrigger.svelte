<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticAccordionStyles } from "@loongark/primitives/automatic-styles/accordion";
  registerAutomaticStyles(lkAutomaticAccordionStyles);

  import { Accordion } from "@ark-ui/svelte/accordion";
</script>

<Accordion.ItemTrigger
  data-scope="accordion"
  data-part="item-trigger"
  {...$$restProps}
>
  <slot />
</Accordion.ItemTrigger>
