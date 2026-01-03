import type { SvelteComponent } from "svelte";
import type { DialogPrimitiveProps } from "@loongark/primitives";

export default class DialogContent extends SvelteComponent<{
  size?: NonNullable<DialogPrimitiveProps["size"]>;
  motion?: NonNullable<DialogPrimitiveProps["motion"]>;
  placement?: NonNullable<DialogPrimitiveProps["placement"]>;
}> {}
