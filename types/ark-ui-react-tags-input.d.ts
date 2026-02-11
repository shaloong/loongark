declare module "@ark-ui/react/tags-input" {
  import React, { type ReactNode } from "react";

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
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputLabelProps {
    ref?: React.Ref<HTMLLabelElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputControlProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    asChild?: boolean;
  }

  export interface TagsInputItemProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    value?: string;
    index?: number;
    disabled?: boolean;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputItemPreviewProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputItemTextProps
    extends React.HTMLAttributes<HTMLSpanElement> {
    ref?: React.Ref<HTMLSpanElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputItemInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    asChild?: boolean;
  }

  export interface TagsInputItemDeleteTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputClearTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface TagsInputHiddenInputProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    ref?: React.Ref<HTMLInputElement>;
    asChild?: boolean;
  }

  export namespace TagsInput {
    export const Root: React.FC<TagsInputRootProps>;
    export const Label: React.FC<TagsInputLabelProps>;
    export const Control: React.FC<TagsInputControlProps>;
    export const Input: React.FC<TagsInputInputProps>;
    export const Item: React.FC<TagsInputItemProps>;
    export const ItemPreview: React.FC<TagsInputItemPreviewProps>;
    export const ItemText: React.FC<TagsInputItemTextProps>;
    export const ItemInput: React.FC<TagsInputItemInputProps>;
    export const ItemDeleteTrigger: React.FC<TagsInputItemDeleteTriggerProps>;
    export const ClearTrigger: React.FC<TagsInputClearTriggerProps>;
    export const HiddenInput: React.FC<TagsInputHiddenInputProps>;
  }
}
