import { SvelteComponent, type ComponentProps } from "svelte";
import { PasswordInput } from "@ark-ui/svelte/password-input";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

export default class LoongArkPasswordInputControl extends SvelteComponent<
  Omit<
    ComponentProps<typeof PasswordInput.Control>,
    "children" | "size" | "state" | "disabled"
  > & {
    size?: PasswordInputSize;
    state?: PasswordInputState;
    disabled?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
