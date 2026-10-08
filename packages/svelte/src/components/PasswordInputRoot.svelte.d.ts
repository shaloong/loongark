import { SvelteComponent, type ComponentProps } from "svelte";
import { PasswordInput } from "@ark-ui/svelte/password-input";
import type { PasswordInputRootProps } from "@ark-ui/svelte/password-input";
import type {
  PasswordInputSize,
  PasswordInputState,
} from "@loongark/primitives";

export default class LoongArkPasswordInputRoot extends SvelteComponent<
  Omit<
    ComponentProps<typeof PasswordInput.Root>,
    | "children"
    | "size"
    | "state"
    | "visible"
    | "defaultVisible"
    | "disabled"
    | "readOnly"
    | "required"
    | "invalid"
    | "name"
    | "id"
    | "ids"
    | "onVisibilityChange"
  > & {
    size?: PasswordInputSize;
    state?: PasswordInputState;
    visible?: PasswordInputRootProps["visible"];
    defaultVisible?: PasswordInputRootProps["defaultVisible"];
    disabled?: PasswordInputRootProps["disabled"];
    readOnly?: PasswordInputRootProps["readOnly"];
    required?: PasswordInputRootProps["required"];
    invalid?: PasswordInputRootProps["invalid"];
    name?: PasswordInputRootProps["name"];
    id?: PasswordInputRootProps["id"];
    ids?: PasswordInputRootProps["ids"];
    onVisibilityChange?: PasswordInputRootProps["onVisibilityChange"];
  },
  Record<string, never>,
  { default: Record<string, never> }
> {}
