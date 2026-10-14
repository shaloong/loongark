<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticAccordionStyles } from "@shaloong/loongark-primitives/automatic-styles/accordion";
  registerAutomaticStyles(lkAutomaticAccordionStyles);

  import { Accordion } from "@ark-ui/svelte/accordion";
</script>

<Accordion.ItemIndicator
  data-scope="accordion"
  data-part="item-indicator"
  {...$$restProps}
>
  <slot />
</Accordion.ItemIndicator>
