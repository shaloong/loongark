import { SvelteComponent, type ComponentProps } from "svelte";
import { Dialog } from "@ark-ui/svelte/dialog";
import type { DialogPrimitiveProps } from "@loongark/primitives";

export default class LoongArkDialogContent extends SvelteComponent<
  Omit<
    ComponentProps<typeof Dialog.Content>,
    "children" | "size" | "motion" | "placement"
  > & {
    size?: NonNullable<DialogPrimitiveProps["size"]>;
    motion?: NonNullable<DialogPrimitiveProps["motion"]>;
    placement?: NonNullable<DialogPrimitiveProps["placement"]>;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
