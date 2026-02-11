declare module "@ark-ui/solid/tags-input" {
  import type { Component, JSX } from "solid-js";

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
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputLabelProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputControlProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputInputProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputItemProps {
    value?: string;
    index?: number;
    disabled?: boolean;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputItemPreviewProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputItemTextProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputItemInputProps {
    value?: string;
    defaultValue?: string;
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputItemDeleteTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputClearTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface TagsInputHiddenInputProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const TagsInput: {
    Root: Component<TagsInputRootProps>;
    Label: Component<TagsInputLabelProps>;
    Control: Component<TagsInputControlProps>;
    Input: Component<TagsInputInputProps>;
    Item: Component<TagsInputItemProps>;
    ItemPreview: Component<TagsInputItemPreviewProps>;
    ItemText: Component<TagsInputItemTextProps>;
    ItemInput: Component<TagsInputItemInputProps>;
    ItemDeleteTrigger: Component<TagsInputItemDeleteTriggerProps>;
    ClearTrigger: Component<TagsInputClearTriggerProps>;
    HiddenInput: Component<TagsInputHiddenInputProps>;
  };
}
