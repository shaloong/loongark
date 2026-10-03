import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressLabel extends SvelteComponent<
  Omit<ComponentProps<typeof Progress.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
