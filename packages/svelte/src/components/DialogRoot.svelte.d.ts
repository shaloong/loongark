import type { SvelteComponent } from "svelte";

export default class DialogRoot extends SvelteComponent<{
  open?: boolean;
  onOpenChange?: (details: { open: boolean }) => void;
}> {}
