import { SvelteComponent, type ComponentProps } from "svelte";
import type { ProgressViewProps } from "@ark-ui/svelte/progress";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressView extends SvelteComponent<
  Omit<ComponentProps<typeof Progress.View>, "children" | "state"> & {
    state: ProgressViewProps["state"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
