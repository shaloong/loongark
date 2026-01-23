declare module "@ark-ui/vue/number-input" {
  import type { DefineComponent } from "vue";

  export const NumberInputRoot: DefineComponent<any>;
  export const NumberInputLabel: DefineComponent<any>;
  export const NumberInputControl: DefineComponent<any>;
  export const NumberInputInput: DefineComponent<any>;
  export const NumberInputIncrementTrigger: DefineComponent<any>;
  export const NumberInputDecrementTrigger: DefineComponent<any>;
  export const NumberInputValueText: DefineComponent<any>;
  export const NumberInputScrubber: DefineComponent<any>;

  export const NumberInput: {
    Root: DefineComponent<any>;
    Label: DefineComponent<any>;
    Control: DefineComponent<any>;
    Input: DefineComponent<any>;
    IncrementTrigger: DefineComponent<any>;
    DecrementTrigger: DefineComponent<any>;
    ValueText: DefineComponent<any>;
    Scrubber: DefineComponent<any>;
  };
}
