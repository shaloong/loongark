<script lang="ts">
  import { Tabs } from "@ark-ui/svelte/tabs";
  import type { TabContentProps } from "@ark-ui/svelte/tabs";

  export let value: TabContentProps["value"];
</script>

<Tabs.Content {value} data-scope="tabs" data-part="content" {...$$restProps}>
  <slot />
</Tabs.Content>
