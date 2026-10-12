<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTabsStyles } from "@loongark/primitives/automatic-styles/tabs";
  registerAutomaticStyles(lkAutomaticTabsStyles);

  import { Tabs } from "@ark-ui/svelte/tabs";
</script>

<Tabs.List data-scope="tabs" data-part="list" {...$$restProps}>
  <slot />
</Tabs.List>
