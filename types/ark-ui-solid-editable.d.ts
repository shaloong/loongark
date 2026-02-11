declare module "@ark-ui/solid/editable" {
  import type { Component, JSX } from "solid-js";

  type BaseProps = {
    children?: JSX.Element;
    asChild?: boolean;
    [key: string]: any;
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
    export const Root: Component<EditableRootProps>;
    export const Label: Component<EditableLabelProps>;
    export const Area: Component<EditableAreaProps>;
    export const Control: Component<EditableControlProps>;
    export const Input: Component<EditableInputProps>;
    export const Preview: Component<EditablePreviewProps>;
    export const EditTrigger: Component<EditableEditTriggerProps>;
    export const SubmitTrigger: Component<EditableSubmitTriggerProps>;
    export const CancelTrigger: Component<EditableCancelTriggerProps>;
  }
}
