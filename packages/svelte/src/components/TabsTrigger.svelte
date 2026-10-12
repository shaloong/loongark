<script lang="ts">
  import { registerAutomaticStyles } from "@loongark/primitives/automatic";
  import { styles as lkAutomaticTabsStyles } from "@loongark/primitives/automatic-styles/tabs";
  registerAutomaticStyles(lkAutomaticTabsStyles);

  import { Tabs } from "@ark-ui/svelte/tabs";
  import type { TabTriggerProps } from "@ark-ui/svelte/tabs";

  export let value: TabTriggerProps["value"];
  export let disabled: TabTriggerProps["disabled"] = undefined;
</script>

<Tabs.Trigger
  {value}
  {disabled}
  data-scope="tabs"
  data-part="trigger"
  {...$$restProps}
>
  <slot />
</Tabs.Trigger>
