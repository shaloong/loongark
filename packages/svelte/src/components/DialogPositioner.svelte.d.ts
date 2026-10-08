import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkDialogPositioner extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.Positioner>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
