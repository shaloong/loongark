import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { LayoutOptions } from "@shaloong/loongark-kit";
export default class ItemGroup extends SvelteComponent<
  HTMLAttributes<HTMLElement> &
    LayoutOptions & { as?: string; href?: string; value?: string; for?: string }
> {}
