import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkDialogDescription extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.Description>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
