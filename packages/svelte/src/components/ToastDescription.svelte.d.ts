import { SvelteComponent, type ComponentProps } from "svelte";
import { Toast } from "@ark-ui/svelte/toast";

export default class LoongArkToastDescription extends SvelteComponent<
  Omit<ComponentProps<typeof Toast.Description>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
