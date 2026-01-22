<script lang="ts">
  import { Tabs } from "@ark-ui/svelte/tabs";
  import type { TabsTriggerProps } from "@ark-ui/svelte/tabs";

  export let value: TabsTriggerProps["value"];
  export let disabled: TabsTriggerProps["disabled"] = undefined;
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
