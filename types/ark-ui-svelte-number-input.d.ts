declare module "@ark-ui/svelte/number-input" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface NumberInputRootProps {
    value?: string;
    defaultValue?: string;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    ids?: any;
    inputMode?: "text" | "tel" | "numeric" | "decimal";
    locale?: string;
    formatOptions?: any;
    allowMouseWheel?: boolean;
    allowOverflow?: boolean;
    clampValueOnBlur?: boolean;
    focusInputOnChange?: boolean;
    spinOnPress?: boolean;
    onValueChange?: (details: { value: string; valueAsNumber?: number }) => void;
    onValueInvalid?: (details: any) => void;
    onFocusChange?: (details: any) => void;
    asChild?: boolean;
  }

  export interface NumberInputLabelProps {
    asChild?: boolean;
  }

  export interface NumberInputControlProps {
    asChild?: boolean;
  }

  export interface NumberInputInputProps {
    asChild?: boolean;
  }

  export interface NumberInputIncrementTriggerProps {
    asChild?: boolean;
  }

  export interface NumberInputDecrementTriggerProps {
    asChild?: boolean;
  }

  export interface NumberInputValueTextProps {
    asChild?: boolean;
  }

  export interface NumberInputScrubberProps {
    asChild?: boolean;
  }

  export const NumberInput: {
    Root: SvelteComponent<NumberInputRootProps>;
    Label: SvelteComponent<NumberInputLabelProps>;
    Control: SvelteComponent<NumberInputControlProps>;
    Input: SvelteComponent<NumberInputInputProps>;
    IncrementTrigger: SvelteComponent<NumberInputIncrementTriggerProps>;
    DecrementTrigger: SvelteComponent<NumberInputDecrementTriggerProps>;
    ValueText: SvelteComponent<NumberInputValueTextProps>;
    Scrubber: SvelteComponent<NumberInputScrubberProps>;
  };
}
