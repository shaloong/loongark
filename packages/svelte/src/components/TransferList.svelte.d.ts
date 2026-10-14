import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TransferListOptions } from "@shaloong/loongark-kit";
export default class TransferList extends SvelteComponent<
  HTMLAttributes<HTMLDivElement> & TransferListOptions
> {}
