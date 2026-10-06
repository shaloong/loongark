import type { SvelteComponent, Snippet } from "svelte";
import type { VirtualGridOptions, VirtualGridCellDetails } from "@loongark/kit";
export interface VirtualGridProps extends VirtualGridOptions {
  renderCell: Snippet<[VirtualGridCellDetails]>;
}
export default class VirtualGrid extends SvelteComponent<VirtualGridProps> {}
