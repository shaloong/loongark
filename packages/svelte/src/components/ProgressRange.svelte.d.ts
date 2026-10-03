import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressRange extends SvelteComponent<
  Omit<ComponentProps<typeof Progress.Range>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
