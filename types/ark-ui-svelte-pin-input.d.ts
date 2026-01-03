declare module "@ark-ui/svelte/pin-input" {
  export interface CreatePinInputProps {
    value?: string[];
    defaultValue?: string[];
    onValueChange?: (details: {
      value: string[];
      valueAsString: string;
    }) => void;
    onValueComplete?: (details: {
      value: string[];
      valueAsString: string;
    }) => void;
    type?: "alphanumeric" | "numeric" | "alphabetic";
    mask?: boolean;
    otp?: boolean;
    placeholder?: string;
    disabled?: boolean;
    autoFocus?: boolean;
    selectOnFocus?: boolean;
    blurOnComplete?: boolean;
  }

  export interface CreatePinInputReturn {
    root: (node: HTMLElement) => (() => void) | undefined;
    control: (node: HTMLElement) => (() => void) | undefined;
    input: (
      node: HTMLInputElement,
      props: { index: number }
    ) => (() => void) | undefined;
    label: (node: HTMLElement) => (() => void) | undefined;
    hiddenInput: (node: HTMLInputElement) => (() => void) | undefined;
  }

  export function createPinInput(
    props: CreatePinInputProps
  ): CreatePinInputReturn;
}
