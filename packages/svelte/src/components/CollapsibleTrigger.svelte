<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCollapsibleStyles } from "@shaloong/loongark-primitives/automatic-styles/collapsible";
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
