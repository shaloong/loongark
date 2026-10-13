<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCollapsibleStyles } from "@loongark/primitives/automatic-styles/collapsible";
  registerAutomaticStyles(lkAutomaticCollapsibleStyles);

  import { Collapsible } from "@ark-ui/svelte/collapsible";
</script>

<Collapsible.Trigger
  data-scope="collapsible"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</Collapsible.Trigger>
