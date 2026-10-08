import { SvelteComponent, type ComponentProps } from "svelte";
import { Switch } from "@ark-ui/svelte/switch";
import type { SwitchPrimitiveProps } from "@loongark/primitives";

export default class LoongArkSwitchRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof Switch.Root>,
    "children" | "size" | "disabled" | "checked" | "onCheckedChange"
  > & {
    size?: NonNullable<SwitchPrimitiveProps["size"]>;
    disabled?: boolean;
    checked?: boolean | undefined;
    onCheckedChange?: ((details: { checked: boolean }) => void) | undefined;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
