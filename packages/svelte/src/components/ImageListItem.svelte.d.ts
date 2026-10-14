import { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { MediaLayoutOptions } from "@shaloong/loongark-kit";
export default class ImageListItem extends SvelteComponent<
  HTMLAttributes<HTMLElement> & MediaLayoutOptions
> {}
