<script lang="ts">
  import { Tabs } from "@ark-ui/svelte/tabs";
</script>

<Tabs.Indicator data-scope="tabs" data-part="indicator" {...$$restProps}>
  <slot />
</Tabs.Indicator>
