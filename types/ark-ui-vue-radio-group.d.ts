declare module "@ark-ui/vue/radio-group" {
  import type { DefineComponent } from "vue";

  export namespace RadioGroup {
    export const Root: DefineComponent<{
      defaultValue?: string;
      value?: string;
      disabled?: boolean;
      readOnly?: boolean;
      name?: string;
      form?: string;
      orientation?: "horizontal" | "vertical";
      onValueChange?: (details: { value: string }) => void;
      "data-size"?: string;
      "data-orientation"?: string;
    }>;

    export const Label: DefineComponent<{}>;

    export const Item: DefineComponent<{
      value: string;
      disabled?: boolean;
      invalid?: boolean;
    }>;

    export const ItemControl: DefineComponent<{}>;

    export const ItemText: DefineComponent<{}>;

    export const Indicator: DefineComponent<{}>;

    export const ItemHiddenInput: DefineComponent<{}>;
  }
}
