<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticCollapsibleStyles } from "@loongark/primitives/automatic-styles/collapsible";
  registerAutomaticStyles(lkAutomaticCollapsibleStyles);

  import { Collapsible } from "@ark-ui/svelte/collapsible";
</script>

<Collapsible.Content
  data-scope="collapsible"
  data-part="content"
  {...$$restProps}
>
  <slot />
</Collapsible.Content>
