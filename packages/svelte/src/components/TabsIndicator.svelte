<script lang="ts">
  import { registerAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
  import { styles as lkAutomaticTabsStyles } from "@shaloong/loongark-primitives/automatic-styles/tabs";
  registerAutomaticStyles(lkAutomaticTabsStyles);

  import { Tabs } from "@ark-ui/svelte/tabs";
</script>

<Tabs.Indicator data-scope="tabs" data-part="indicator" {...$$restProps}>
  <slot />
</Tabs.Indicator>
