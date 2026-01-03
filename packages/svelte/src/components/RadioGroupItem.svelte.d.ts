import type { SvelteComponent } from "svelte";

export default class RadioGroupItem extends SvelteComponent<{
  value: string;
  disabled?: boolean;
  invalid?: boolean;
}> {}
