<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticAccordionStyles } from "@shaloong/loongark-primitives/automatic-styles/accordion";
  registerAutomaticStyles(lkAutomaticAccordionStyles);

  import { Accordion } from "@ark-ui/svelte/accordion";
  import type { AccordionRootProps } from "@ark-ui/svelte/accordion";
  import type { AccordionOrientation, AccordionSize } from "@shaloong/loongark-primitives";

  export let size: AccordionSize = "md";
  export let orientation: AccordionOrientation = "vertical";
  export let value: AccordionRootProps["value"] = undefined;
  export let defaultValue: AccordionRootProps["defaultValue"] = undefined;
  export let multiple: AccordionRootProps["multiple"] = undefined;
  export let collapsible: AccordionRootProps["collapsible"] = undefined;
  export let disabled: AccordionRootProps["disabled"] = undefined;
  export let id: AccordionRootProps["id"] = undefined;
  export let ids: AccordionRootProps["ids"] = undefined;
  export let onValueChange: AccordionRootProps["onValueChange"] = undefined;
  export let onFocusChange: AccordionRootProps["onFocusChange"] = undefined;
</script>

<Accordion.Root
  {value}
  {defaultValue}
  {multiple}
  {collapsible}
  {disabled}
  {id}
  {ids}
  {onValueChange}
  {onFocusChange}
  {orientation}
  data-scope="accordion"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Accordion.Root>
