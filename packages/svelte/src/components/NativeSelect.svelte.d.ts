import type { SvelteComponent } from "svelte";
import type { HTMLSelectAttributes } from "svelte/elements";
import type { LayoutOptions } from "@shaloong/loongark-kit";
export default class NativeSelect extends SvelteComponent<
  Omit<HTMLSelectAttributes, "size"> &
    LayoutOptions & { as?: string }
> {}
