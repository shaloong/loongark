import type { SvelteComponent } from "svelte";
import type {
  HTMLAttributes,
  HTMLAnchorAttributes,
  HTMLButtonAttributes,
  HTMLTimeAttributes,
} from "svelte/elements";
import type { LayoutOptions } from "@shaloong/loongark-kit";
export default class BottomNavigation extends SvelteComponent<
  HTMLAttributes<HTMLElement> & LayoutOptions & { as?: string }
> {}
