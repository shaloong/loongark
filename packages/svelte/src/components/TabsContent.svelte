<script lang="ts">
  import { Tabs } from "@ark-ui/svelte/tabs";
  import type { TabsContentProps } from "@ark-ui/svelte/tabs";

  export let value: TabsContentProps["value"];
</script>

<Tabs.Content
  {value}
  data-scope="tabs"
  data-part="content"
  {...$$restProps}
>
  <slot />
</Tabs.Content>
