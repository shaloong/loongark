import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";

export default class LoongArkDialogTrigger extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.Trigger>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
