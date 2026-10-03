import { SvelteComponent, type ComponentProps } from "svelte";
import { Toast } from "@ark-ui/svelte/toast";

export default class LoongArkToastTitle extends SvelteComponent<
  Omit<ComponentProps<typeof Toast.Title>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
