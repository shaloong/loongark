import { SvelteComponent, type ComponentProps } from "svelte";
import { PasswordInput } from "@ark-ui/svelte/password-input";

export default class LoongArkPasswordInputLabel extends SvelteComponent<
  Omit<ComponentProps<typeof PasswordInput.Label>, "children"> & {},
  Record<string, never>,
  { default: Record<string, never> }
> {}
