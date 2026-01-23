/**
 * Listbox component - Solid wrapper.
 * Uses Ark UI Listbox with data attributes for styling.
 */
import { type Component, type JSX, mergeProps } from "solid-js";
import {
  Listbox as ArkListbox,
  type ListboxRootProps as ArkListboxRootProps,
  type ListboxLabelProps as ArkListboxLabelProps,
  type ListboxListProps as ArkListboxListProps,
  type ListboxItemGroupProps as ArkListboxItemGroupProps,
  type ListboxItemGroupLabelProps as ArkListboxItemGroupLabelProps,
  type ListboxItemProps as ArkListboxItemProps,
  type ListboxItemTextProps as ArkListboxItemTextProps,
  type ListboxItemIndicatorProps as ArkListboxItemIndicatorProps,
} from "@ark-ui/solid/listbox";
import type { ListboxOrientation, ListboxSize } from "@loongark/primitives";

export interface LoongArkListboxRootProps<
  T extends Record<string, any> = Record<string, any>
> extends Omit<ArkListboxRootProps<T>, "asChild"> {
  size?: ListboxSize;
  orientation?: ListboxOrientation;
  children?: JSX.Element;
}

export const LoongArkListboxRoot: Component<LoongArkListboxRootProps> = (
  props
) => {
  const merged = mergeProps(
    { size: "md" as ListboxSize, orientation: "vertical" as ListboxOrientation },
    props
  );

  return (
    <ArkListbox.Root
      {...(props as any)}
      orientation={merged.orientation}
      data-scope="listbox"
      data-part="root"
      data-size={merged.size}
      data-orientation={merged.orientation}
    >
      {props.children}
    </ArkListbox.Root>
  );
};

export const LoongArkListboxLabel: Component<
  ArkListboxLabelProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.Label {...props} data-scope="listbox" data-part="label">
      {props.children}
    </ArkListbox.Label>
  );
};

export const LoongArkListboxList: Component<
  ArkListboxListProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.List {...props} data-scope="listbox" data-part="list">
      {props.children}
    </ArkListbox.List>
  );
};

export const LoongArkListboxItemGroup: Component<
  ArkListboxItemGroupProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.ItemGroup {...props} data-scope="listbox" data-part="item-group">
      {props.children}
    </ArkListbox.ItemGroup>
  );
};

export const LoongArkListboxItemGroupLabel: Component<
  ArkListboxItemGroupLabelProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.ItemGroupLabel
      {...props}
      data-scope="listbox"
      data-part="item-group-label"
    >
      {props.children}
    </ArkListbox.ItemGroupLabel>
  );
};

export const LoongArkListboxItem: Component<
  ArkListboxItemProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.Item {...props} data-scope="listbox" data-part="item">
      {props.children}
    </ArkListbox.Item>
  );
};

export const LoongArkListboxItemText: Component<
  ArkListboxItemTextProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.ItemText {...props} data-scope="listbox" data-part="item-text">
      {props.children}
    </ArkListbox.ItemText>
  );
};

export const LoongArkListboxItemIndicator: Component<
  ArkListboxItemIndicatorProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkListbox.ItemIndicator
      {...props}
      data-scope="listbox"
      data-part="item-indicator"
    >
      {props.children}
    </ArkListbox.ItemIndicator>
  );
};
