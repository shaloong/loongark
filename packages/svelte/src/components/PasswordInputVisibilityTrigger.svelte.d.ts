import { SvelteComponent, type ComponentProps } from "svelte";
import { PasswordInput } from "@ark-ui/svelte/password-input";

export default class LoongArkPasswordInputVisibilityTrigger extends SvelteComponent<
  Omit<
    ComponentProps<typeof PasswordInput.VisibilityTrigger>,
    "children" | "disabled"
  > & { disabled?: boolean },
  Record<string, never>,
  { default: Record<string, never> }
> {}
