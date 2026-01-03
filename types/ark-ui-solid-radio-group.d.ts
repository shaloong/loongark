declare module "@ark-ui/solid/radio-group" {
  import type { JSX, Component } from "solid-js";

  export namespace RadioGroup {
    interface RootProps {
      defaultValue?: string;
      value?: string;
      disabled?: boolean;
      readOnly?: boolean;
      name?: string;
      form?: string;
      orientation?: "horizontal" | "vertical";
      onValueChange?: (details: { value: string }) => void;
      children?: JSX.Element;
      class?: string;
      "data-size"?: string;
      "data-orientation"?: string;
    }

    interface LabelProps {
      children?: JSX.Element;
      class?: string;
    }

    interface ItemProps {
      value: string;
      disabled?: boolean;
      invalid?: boolean;
      children?: JSX.Element;
      class?: string;
    }

    interface ItemControlProps {
      children?: JSX.Element;
      class?: string;
    }

    interface ItemTextProps {
      children?: JSX.Element;
      class?: string;
    }

    interface IndicatorProps {
      children?: JSX.Element;
      class?: string;
    }

    interface ItemHiddenInputProps {
      class?: string;
    }

    export const Root: Component<RootProps>;
    export const Label: Component<LabelProps>;
    export const Item: Component<ItemProps>;
    export const ItemControl: Component<ItemControlProps>;
    export const ItemText: Component<ItemTextProps>;
    export const Indicator: Component<IndicatorProps>;
    export const ItemHiddenInput: Component<ItemHiddenInputProps>;
  }
}
