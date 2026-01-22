<script lang="ts">
  import { Menu } from "@ark-ui/svelte/menu";
  import type { MenuTriggerProps } from "@ark-ui/svelte/menu";
  export let asChild: MenuTriggerProps["asChild"] | undefined = undefined;
  export let id: MenuTriggerProps["id"] = undefined;
  export let disabled: MenuTriggerProps["disabled"] = undefined;
</script>

<Menu.Trigger
  {...{ asChild: asChild ?? true, id, disabled }}
  data-scope="menu"
  data-part="trigger"
>
  <slot />
</Menu.Trigger>
