<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCollapsibleStyles } from "@loongark/primitives/automatic-styles/collapsible";
  registerAutomaticStyles(lkAutomaticCollapsibleStyles);

  import { Collapsible } from "@ark-ui/svelte/collapsible";
</script>

<Collapsible.Indicator
  data-scope="collapsible"
  data-part="indicator"
  {...$$restProps}
>
  <slot />
</Collapsible.Indicator>
