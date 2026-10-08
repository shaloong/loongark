import { SvelteComponent, type ComponentProps } from "svelte";
import { Portal } from "@ark-ui/svelte/portal";

export default class LoongArkPortal extends SvelteComponent<
  Omit<ComponentProps<typeof Portal>, "children" | "disabled"> & {
    disabled?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
