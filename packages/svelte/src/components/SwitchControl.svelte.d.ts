import { SvelteComponent, type ComponentProps } from "svelte";
import { Switch } from "@ark-ui/svelte/switch";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export default class LoongArkSwitchControl extends SvelteComponent<
  Omit<ComponentProps<typeof Switch.Control>, "children" | "size"> & {
    size?: NonNullable<SwitchPrimitiveProps["size"]>;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
