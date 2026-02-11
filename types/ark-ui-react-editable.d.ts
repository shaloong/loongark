declare module "@ark-ui/react/editable" {
  import React, { type ReactNode } from "react";

  type BaseProps = React.HTMLAttributes<HTMLElement> & {
    children?: ReactNode;
    asChild?: boolean;
  };

  export interface EditableRootProps extends BaseProps {}
  export interface EditableLabelProps extends BaseProps {}
  export interface EditableAreaProps extends BaseProps {}
  export interface EditableControlProps extends BaseProps {}
  export interface EditableInputProps extends BaseProps {}
  export interface EditablePreviewProps extends BaseProps {}
  export interface EditableEditTriggerProps extends BaseProps {}
  export interface EditableSubmitTriggerProps extends BaseProps {}
  export interface EditableCancelTriggerProps extends BaseProps {}

  export namespace Editable {
    export const Root: React.FC<EditableRootProps>;
    export const Label: React.FC<EditableLabelProps>;
    export const Area: React.FC<EditableAreaProps>;
    export const Control: React.FC<EditableControlProps>;
    export const Input: React.FC<EditableInputProps>;
    export const Preview: React.FC<EditablePreviewProps>;
    export const EditTrigger: React.FC<EditableEditTriggerProps>;
    export const SubmitTrigger: React.FC<EditableSubmitTriggerProps>;
    export const CancelTrigger: React.FC<EditableCancelTriggerProps>;
  }
}
