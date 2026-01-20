declare module "@ark-ui/react/radio-group" {
  import type { ReactNode } from "react";

  export namespace RadioGroup {
    type StyleObject = Record<string, string | number>;

    interface RootProps {
      children?: ReactNode;
      defaultValue?: string;
      value?: string;
      disabled?: boolean;
      readOnly?: boolean;
      name?: string;
      form?: string;
      orientation?: "horizontal" | "vertical";
      onValueChange?: (details: { value: string }) => void;
      className?: string;
      style?: StyleObject;
      id?: string;
      "data-size"?: string;
      "data-orientation"?: string;
    }

    interface LabelProps {
      children?: ReactNode;
      className?: string;
      style?: StyleObject;
    }

    interface ItemProps {
      children?: ReactNode;
      value: string;
      disabled?: boolean;
      invalid?: boolean;
      className?: string;
      style?: StyleObject;
    }

    interface ItemControlProps {
      children?: ReactNode;
      className?: string;
      style?: StyleObject;
    }

    interface ItemTextProps {
      children?: ReactNode;
      className?: string;
      style?: StyleObject;
    }

    interface IndicatorProps {
      children?: ReactNode;
      className?: string;
      style?: StyleObject;
    }

    interface ItemHiddenInputProps {
      className?: string;
      style?: StyleObject;
    }

    export const Root: React.ForwardRefExoticComponent<
      RootProps & React.RefAttributes<HTMLDivElement>
    >;
    export const Label: React.ForwardRefExoticComponent<
      LabelProps & React.RefAttributes<HTMLLabelElement>
    >;
    export const Item: React.ForwardRefExoticComponent<
      ItemProps & React.RefAttributes<HTMLLabelElement>
    >;
    export const ItemControl: React.ForwardRefExoticComponent<
      ItemControlProps & React.RefAttributes<HTMLDivElement>
    >;
    export const ItemText: React.ForwardRefExoticComponent<
      ItemTextProps & React.RefAttributes<HTMLSpanElement>
    >;
    export const Indicator: React.ForwardRefExoticComponent<
      IndicatorProps & React.RefAttributes<HTMLDivElement>
    >;
    export const ItemHiddenInput: React.ForwardRefExoticComponent<
      ItemHiddenInputProps & React.RefAttributes<HTMLInputElement>
    >;
  }
}
