<script lang="ts">
  import { Tabs } from "@ark-ui/svelte/tabs";
</script>

<Tabs.List data-scope="tabs" data-part="list" {...$$restProps}>
  <slot />
</Tabs.List>
