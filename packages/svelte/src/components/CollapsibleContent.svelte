<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticCollapsibleStyles } from "@shaloong/loongark-primitives/automatic-styles/collapsible";
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
