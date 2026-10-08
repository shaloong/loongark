<script lang="ts">
  import { Tabs } from "@ark-ui/svelte/tabs";
  import type { TabsRootProps } from "@ark-ui/svelte/tabs";
  import type { TabsOrientation, TabsSize } from "@loongark/primitives";

  export let size: TabsSize = "md";
  export let orientation: TabsOrientation = "horizontal";
  export let value: TabsRootProps["value"] = undefined;
  export let defaultValue: TabsRootProps["defaultValue"] = undefined;
  export let activationMode: TabsRootProps["activationMode"] = undefined;
  export let loopFocus: TabsRootProps["loopFocus"] = undefined;
  export let composite: TabsRootProps["composite"] = undefined;
  export let id: TabsRootProps["id"] = undefined;
  export let onValueChange: TabsRootProps["onValueChange"] = undefined;
  export let onFocusChange: TabsRootProps["onFocusChange"] = undefined;
  export let lazyMount: TabsRootProps["lazyMount"] = undefined;
  export let unmountOnExit: TabsRootProps["unmountOnExit"] = undefined;
</script>

<Tabs.Root
  {value}
  {defaultValue}
  {activationMode}
  {loopFocus}
  {composite}
  {orientation}
  {id}
  {onValueChange}
  {onFocusChange}
  {lazyMount}
  {unmountOnExit}
  data-scope="tabs"
  data-part="root"
  data-size={size}
  data-orientation={orientation}
  {...$$restProps}
>
  <slot />
</Tabs.Root>
