import { SvelteComponent, type ComponentProps } from "svelte";
import { Progress } from "@ark-ui/svelte/progress";

export default class LoongArkProgressValueText extends SvelteComponent<
  ComponentProps<typeof Progress.ValueText>,
  Record<string, never>,
  { default: Record<string, never> }
> {}
