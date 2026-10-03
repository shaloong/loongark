import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressTrack extends SvelteComponent<
  Omit<ComponentProps<typeof Progress.Track>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
