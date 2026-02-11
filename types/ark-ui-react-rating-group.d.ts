declare module "@ark-ui/react/rating-group" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface RatingGroupRootProps extends BaseProps {}
  export interface RatingGroupLabelProps extends BaseProps {}
  export interface RatingGroupControlProps extends BaseProps {}
  export interface RatingGroupItemProps extends BaseProps {}
  export interface RatingGroupHiddenInputProps extends BaseProps {}

  export namespace RatingGroup {
    export const Root: React.FC<RatingGroupRootProps>;
    export const Label: React.FC<RatingGroupLabelProps>;
    export const Control: React.FC<RatingGroupControlProps>;
    export const Item: React.FC<RatingGroupItemProps>;
    export const HiddenInput: React.FC<RatingGroupHiddenInputProps>;
  }
}
