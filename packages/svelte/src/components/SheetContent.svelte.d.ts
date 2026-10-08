import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkSheetContent extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.Content>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
