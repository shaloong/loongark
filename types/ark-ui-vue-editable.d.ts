declare module "@ark-ui/vue/editable" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface EditableRootProps {}
  export interface EditableLabelProps {}
  export interface EditableAreaProps {}
  export interface EditableControlProps {}
  export interface EditableInputProps {}
  export interface EditablePreviewProps {}
  export interface EditableEditTriggerProps {}
  export interface EditableSubmitTriggerProps {}
  export interface EditableCancelTriggerProps {}

  export const Editable: {
    Root: VueComponent<EditableRootProps>;
    Label: VueComponent<EditableLabelProps>;
    Area: VueComponent<EditableAreaProps>;
    Control: VueComponent<EditableControlProps>;
    Input: VueComponent<EditableInputProps>;
    Preview: VueComponent<EditablePreviewProps>;
    EditTrigger: VueComponent<EditableEditTriggerProps>;
    SubmitTrigger: VueComponent<EditableSubmitTriggerProps>;
    CancelTrigger: VueComponent<EditableCancelTriggerProps>;
  };
}
