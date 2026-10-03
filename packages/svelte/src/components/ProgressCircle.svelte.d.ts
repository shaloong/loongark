import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressCircle extends SvelteComponent<
  Omit<ComponentProps<typeof Progress.Circle>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
