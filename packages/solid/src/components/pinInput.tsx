
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticPinInputStyles } from "@shaloong/loongark-primitives/automatic-styles/pin-input";
import { PinInput } from "@ark-ui/solid/pin-input";
import type { PinInputPrimitiveProps } from "@shaloong/loongark-primitives";
import { mergeProps, splitProps, type Component, type JSX } from "solid-js";

export type PinInputSize = NonNullable<PinInputPrimitiveProps["size"]>;
export type PinInputState = NonNullable<PinInputPrimitiveProps["state"]>;

export interface LoongArkPinInputRootProps {
  children?: JSX.Element;
  size?: PinInputSize;
  state?: PinInputState;
  disabled?: boolean;
  value?: string[];
  defaultValue?: string[];
  onValueChange?: (details: { value: string[]; valueAsString: string }) => void;
  onValueComplete?: (details: {
    value: string[];
    valueAsString: string;
  }) => void;
  type?: "alphanumeric" | "numeric" | "alphabetic";
  mask?: boolean;
  otp?: boolean;
  placeholder?: string;
  autoFocus?: boolean;
  selectOnFocus?: boolean;
  blurOnComplete?: boolean;
  autoCapitalize?: JSX.HTMLAutocapitalize;
}

export const LoongArkPinInputRoot: Component<LoongArkPinInputRootProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as PinInputSize,
      state: "default" as PinInputState,
      disabled: false,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "children",
    "size",
    "state",
    "disabled",
  ]);

  return (
    <PinInput.Root
      {...others}
      disabled={local.disabled}
      data-scope="pin-input"
      data-part="root"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-disabled={local.disabled ? "true" : undefined}
    >
      {local.children}
    </PinInput.Root>
  );
}, lkAutomaticPinInputStyles);

export interface LoongArkPinInputControlProps {
  children?: JSX.Element;
  size?: PinInputSize;
}

export const LoongArkPinInputControl: Component<
  LoongArkPinInputControlProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const merged = mergeProps({ size: "md" as PinInputSize }, props);
  const [local, others] = splitProps(merged, ["children", "size"]);

  return (
    <PinInput.Control
      {...others}
      data-scope="pin-input"
      data-part="control"
      data-size={local.size}
    >
      {local.children}
    </PinInput.Control>
  );
}, lkAutomaticPinInputStyles);

export interface LoongArkPinInputInputProps {
  size?: PinInputSize;
  state?: PinInputState;
  index: number;
  autoCapitalize?: boolean;
}

export const LoongArkPinInputInput: Component<LoongArkPinInputInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const merged = mergeProps(
    {
      size: "md" as PinInputSize,
      state: "default" as PinInputState,
      autoCapitalize: false,
    },
    props,
  );
  const [local, others] = splitProps(merged, [
    "size",
    "state",
    "index",
    "autoCapitalize",
  ]);

  return (
    <PinInput.Input
      {...others}
      index={local.index}
      data-scope="pin-input"
      data-part="input"
      data-size={local.size}
      data-state={local.state !== "default" ? local.state : undefined}
      data-capitalize={local.autoCapitalize ? "true" : undefined}
    />
  );
}, lkAutomaticPinInputStyles);

export interface LoongArkPinInputLabelProps {
  children?: JSX.Element;
}

export const LoongArkPinInputLabel: Component<LoongArkPinInputLabelProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);

  return (
    <PinInput.Label {...others} data-scope="pin-input" data-part="label">
      {local.children}
    </PinInput.Label>
  );
}, lkAutomaticPinInputStyles);

export const LoongArkPinInputHiddenInput = /*#__PURE__*/ withAutomaticStyles(PinInput.HiddenInput, lkAutomaticPinInputStyles);

export const LoongArkPinInput = /*#__PURE__*/ withAutomaticStyles({
  Root: LoongArkPinInputRoot,
  Control: LoongArkPinInputControl,
  Input: LoongArkPinInputInput,
  Label: LoongArkPinInputLabel,
  HiddenInput: LoongArkPinInputHiddenInput,
}, lkAutomaticPinInputStyles);
