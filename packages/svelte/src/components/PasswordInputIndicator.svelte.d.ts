import { SvelteComponent, type ComponentProps } from "svelte";
import { PasswordInput } from "@ark-ui/svelte/password-input";

export default class LoongArkPasswordInputIndicator extends SvelteComponent<
  Omit<ComponentProps<typeof PasswordInput.Indicator>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
