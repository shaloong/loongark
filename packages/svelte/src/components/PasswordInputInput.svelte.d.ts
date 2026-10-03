import { SvelteComponent, type ComponentProps } from "svelte";
import { PasswordInput } from "@ark-ui/svelte/password-input";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

export default class LoongArkPasswordInputInput extends SvelteComponent<
  Omit<
    ComponentProps<typeof PasswordInput.Input>,
    "children" | "size" | "state" | "disabled" | "readOnly"
  > & {
    size?: PasswordInputSize;
    state?: PasswordInputState;
    disabled?: boolean;
    readOnly?: boolean;
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
