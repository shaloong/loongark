declare module "@ark-ui/solid/rating-group" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
  };

  export interface RatingGroupRootProps extends BaseProps {}
  export interface RatingGroupLabelProps extends BaseProps {}
  export interface RatingGroupControlProps extends BaseProps {}
  export interface RatingGroupItemProps extends BaseProps {}
  export interface RatingGroupHiddenInputProps extends BaseProps {}

  export namespace RatingGroup {
    export const Root: Component<RatingGroupRootProps>;
    export const Label: Component<RatingGroupLabelProps>;
    export const Control: Component<RatingGroupControlProps>;
    export const Item: Component<RatingGroupItemProps>;
    export const HiddenInput: Component<RatingGroupHiddenInputProps>;
  }
}
