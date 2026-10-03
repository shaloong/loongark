import type { SvelteComponent } from "svelte";
import type { HTMLTextareaAttributes } from "svelte/elements";
import type { TextareaAutosizeOptions } from "@loongark/kit";
export default class Textarea extends SvelteComponent<
  HTMLTextareaAttributes & TextareaAutosizeOptions & { value?: string }
> {}
