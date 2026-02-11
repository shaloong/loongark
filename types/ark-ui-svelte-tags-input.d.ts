declare module "@ark-ui/svelte/tags-input" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface TagsInputRootProps {
    value?: string[];
    defaultValue?: string[];
    inputValue?: string;
    defaultInputValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    required?: boolean;
    invalid?: boolean;
    name?: string;
    form?: string;
    id?: string;
    ids?: any;
    onValueChange?: (details: { value: string[] }) => void;
    onInputValueChange?: (details: { inputValue: string }) => void;
    onValueInvalid?: (details: any) => void;
    asChild?: boolean;
  }

  export interface TagsInputLabelProps {
    asChild?: boolean;
  }

  export interface TagsInputControlProps {
    asChild?: boolean;
  }

  export interface TagsInputInputProps {
    asChild?: boolean;
  }

  export interface TagsInputItemProps {
    value?: string;
    index?: number;
    disabled?: boolean;
    asChild?: boolean;
  }

  export interface TagsInputItemPreviewProps {
    asChild?: boolean;
  }

  export interface TagsInputItemTextProps {
    asChild?: boolean;
  }

  export interface TagsInputItemInputProps {
    asChild?: boolean;
  }

  export interface TagsInputItemDeleteTriggerProps {
    asChild?: boolean;
  }

  export interface TagsInputClearTriggerProps {
    asChild?: boolean;
  }

  export interface TagsInputHiddenInputProps {
    asChild?: boolean;
  }

  export const TagsInput: {
    Root: SvelteComponent<TagsInputRootProps>;
    Label: SvelteComponent<TagsInputLabelProps>;
    Control: SvelteComponent<TagsInputControlProps>;
    Input: SvelteComponent<TagsInputInputProps>;
    Item: SvelteComponent<TagsInputItemProps>;
    ItemPreview: SvelteComponent<TagsInputItemPreviewProps>;
    ItemText: SvelteComponent<TagsInputItemTextProps>;
    ItemInput: SvelteComponent<TagsInputItemInputProps>;
    ItemDeleteTrigger: SvelteComponent<TagsInputItemDeleteTriggerProps>;
    ClearTrigger: SvelteComponent<TagsInputClearTriggerProps>;
    HiddenInput: SvelteComponent<TagsInputHiddenInputProps>;
  };
}
