import type { SvelteComponent } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import type { TimePickerOptions } from "@loongark/kit";
export default class TimePicker extends SvelteComponent<
  HTMLAttributes<HTMLDivElement> & TimePickerOptions
> {}
