import { SvelteComponent, type ComponentProps } from "svelte";
import { Switch } from "@ark-ui/svelte/switch";

export default class LoongArkSwitchLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Switch.Label>, "children" | "disabled"> & {
    disabled?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
