import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";
export default class DialogCancel extends SvelteComponent<
  Omit<ComponentProps<typeof Dialog.CloseTrigger>, "children">,
  Record<string, never>,
  { default: Record<string, never> }
> {}
