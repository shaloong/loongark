import { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { SpeedDialOptions } from "@loongark/kit";
export default class SpeedDial extends SvelteComponent<
  Omit<HTMLAttributes<HTMLDivElement>, "onselect"> & SpeedDialOptions
> {}
