import type { SvelteComponent, Snippet } from "svelte";
import type { VirtualMasonryOptions, VirtualMasonryEntry } from "@shaloong/loongark-kit";
export interface VirtualMasonryProps extends VirtualMasonryOptions {
  renderItem: Snippet<[VirtualMasonryEntry]>;
}
export default class VirtualMasonry extends SvelteComponent<VirtualMasonryProps> {}
