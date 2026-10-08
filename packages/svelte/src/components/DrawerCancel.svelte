<script lang="ts">
  import { Drawer } from "@ark-ui/svelte/drawer";
  import type { ComponentProps } from "svelte";
  const componentId = $props.id();
  let {
    id = componentId,
    children,
    ...props
  }: ComponentProps<typeof Drawer.CloseTrigger> = $props();
</script>

<Drawer.CloseTrigger
  {...props}
  {id}
  data-scope="button"
  data-part="root"
  data-variant="outline"
  data-size="md"
  >{#if children}{@render children()}{/if}</Drawer.CloseTrigger
>
