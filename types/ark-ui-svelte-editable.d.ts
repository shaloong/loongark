declare module "@ark-ui/svelte/editable" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface EditableRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableLabelProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableAreaProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableControlProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableInputProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditablePreviewProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableEditTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableSubmitTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface EditableCancelTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const Editable: {
    Root: SvelteComponent<EditableRootProps>;
    Label: SvelteComponent<EditableLabelProps>;
    Area: SvelteComponent<EditableAreaProps>;
    Control: SvelteComponent<EditableControlProps>;
    Input: SvelteComponent<EditableInputProps>;
    Preview: SvelteComponent<EditablePreviewProps>;
    EditTrigger: SvelteComponent<EditableEditTriggerProps>;
    SubmitTrigger: SvelteComponent<EditableSubmitTriggerProps>;
    CancelTrigger: SvelteComponent<EditableCancelTriggerProps>;
  };
}
