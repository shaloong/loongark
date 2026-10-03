import { SvelteComponent, type ComponentProps } from "svelte";
import { Toast } from "@ark-ui/svelte/toast";

export default class LoongArkToastRoot extends SvelteComponent<
  Omit<ComponentProps<typeof Toast.Root>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
