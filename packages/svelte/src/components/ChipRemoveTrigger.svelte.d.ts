import type { SvelteComponent } from "svelte";
import type {
  HTMLAttributes,
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
  HTMLTimeAttributes,
} from "svelte/elements";
import type { LayoutOptions } from "@loongark/kit";
export default class ChipRemoveTrigger extends SvelteComponent<
  HTMLButtonAttributes & LayoutOptions & { as?: string }
> {}
