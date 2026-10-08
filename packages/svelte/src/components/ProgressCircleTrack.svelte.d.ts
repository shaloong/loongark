import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressCircleTrack extends SvelteComponent<
  Omit<ComponentProps<typeof Progress.CircleTrack>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
