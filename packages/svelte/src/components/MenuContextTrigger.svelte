<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
  import type { MenuContextTriggerProps } from "@ark-ui/svelte/menu";
  export let asChild: MenuContextTriggerProps["asChild"] | undefined = undefined;
  export let id: MenuContextTriggerProps["id"] = undefined;
</script>

<Menu.ContextTrigger
  {...{ asChild: asChild ?? true, id }}
  data-scope="menu"
  data-part="context-trigger"
>
  <slot />
</Menu.ContextTrigger>
