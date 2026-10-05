import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
/**
 * Combobox component - Solid wrapper.
 * Uses Ark UI Combobox with data attributes for styling.
 */
import {
  type Component,
  type JSX,
  createContext,
  mergeProps,
  useContext,
} from "solid-js";
import {
  Combobox as ArkCombobox,
  type ComboboxRootProps as ArkComboboxRootProps,
  type ComboboxLabelProps as ArkComboboxLabelProps,
  type ComboboxControlProps as ArkComboboxControlProps,
  type ComboboxInputProps as ArkComboboxInputProps,
  type ComboboxTriggerProps as ArkComboboxTriggerProps,
  type ComboboxClearTriggerProps as ArkComboboxClearTriggerProps,
  type ComboboxPositionerProps as ArkComboboxPositionerProps,
  type ComboboxContentProps as ArkComboboxContentProps,
  type ComboboxListProps as ArkComboboxListProps,
  type ComboboxItemGroupProps as ArkComboboxItemGroupProps,
  type ComboboxItemGroupLabelProps as ArkComboboxItemGroupLabelProps,
  type ComboboxItemProps as ArkComboboxItemProps,
  type ComboboxItemTextProps as ArkComboboxItemTextProps,
  type ComboboxItemIndicatorProps as ArkComboboxItemIndicatorProps,
} from "@ark-ui/solid/combobox";
import type { ComboboxSize } from "@loongark/primitives";

const ComboboxContext = createContext<{ size: ComboboxSize }>({ size: "md" });

export interface LoongArkComboboxRootProps<
  T extends object = object,
> extends Omit<ArkComboboxRootProps<T>, "asChild"> {
  size?: ComboboxSize;
  children?: JSX.Element;
}

export const LoongArkComboboxRoot = <T extends object>(
  props: LoongArkComboboxRootProps<T>,
): JSX.Element => {
  const merged = mergeProps({ size: "md" as ComboboxSize }, props);

  return (
    <ComboboxContext.Provider value={{ size: merged.size }}>
      <ArkCombobox.Root
        {...props}
        data-scope="combobox"
        data-part="root"
        data-size={merged.size}
      >
        {props.children}
      </ArkCombobox.Root>
    </ComboboxContext.Provider>
  );
};

export const LoongArkComboboxLabel: Component<
  ArkComboboxLabelProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.Label {...props} data-scope="combobox" data-part="label">
      {props.children}
    </ArkCombobox.Label>
  );
};

export const LoongArkComboboxControl: Component<
  ArkComboboxControlProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.Control {...props} data-scope="combobox" data-part="control">
      {props.children}
    </ArkCombobox.Control>
  );
};

export const LoongArkComboboxInput: Component<ArkComboboxInputProps> = (
  props,
) => {
  return (
    <ArkCombobox.Input {...props} data-scope="combobox" data-part="input" />
  );
};

export const LoongArkComboboxTrigger: Component<
  ArkComboboxTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.Trigger {...props} data-scope="combobox" data-part="trigger">
      {props.children ?? (
        <LoongArkIcon icon={controlIcons.chevronDown} size="sm" />
      )}
    </ArkCombobox.Trigger>
  );
};

export const LoongArkComboboxClearTrigger: Component<
  ArkComboboxClearTriggerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.ClearTrigger
      {...props}
      data-scope="combobox"
      data-part="clear-trigger"
    >
      {props.children}
    </ArkCombobox.ClearTrigger>
  );
};

export const LoongArkComboboxPositioner: Component<
  ArkComboboxPositionerProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.Positioner
      {...props}
      data-scope="combobox"
      data-part="positioner"
    >
      {props.children}
    </ArkCombobox.Positioner>
  );
};

export const LoongArkComboboxContent: Component<
  ArkComboboxContentProps & { children?: JSX.Element }
> = (props) => {
  const { size } = useContext(ComboboxContext);
  return (
    <ArkCombobox.Content
      {...props}
      data-scope="combobox"
      data-part="content"
      data-size={size}
    >
      {props.children}
    </ArkCombobox.Content>
  );
};

export const LoongArkComboboxList: Component<
  ArkComboboxListProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.List {...props} data-scope="combobox" data-part="list">
      {props.children}
    </ArkCombobox.List>
  );
};

export const LoongArkComboboxItemGroup: Component<
  ArkComboboxItemGroupProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.ItemGroup
      {...props}
      data-scope="combobox"
      data-part="item-group"
    >
      {props.children}
    </ArkCombobox.ItemGroup>
  );
};

export const LoongArkComboboxItemGroupLabel: Component<
  ArkComboboxItemGroupLabelProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.ItemGroupLabel
      {...props}
      data-scope="combobox"
      data-part="item-group-label"
    >
      {props.children}
    </ArkCombobox.ItemGroupLabel>
  );
};

export const LoongArkComboboxItem: Component<
  ArkComboboxItemProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.Item {...props} data-scope="combobox" data-part="item">
      {props.children}
    </ArkCombobox.Item>
  );
};

export const LoongArkComboboxItemText: Component<
  ArkComboboxItemTextProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.ItemText
      {...props}
      data-scope="combobox"
      data-part="item-text"
    >
      {props.children}
    </ArkCombobox.ItemText>
  );
};

export const LoongArkComboboxItemIndicator: Component<
  ArkComboboxItemIndicatorProps & { children?: JSX.Element }
> = (props) => {
  return (
    <ArkCombobox.ItemIndicator
      {...props}
      data-scope="combobox"
      data-part="item-indicator"
    >
      {props.children ?? <LoongArkIcon icon={controlIcons.check} size="sm" />}
    </ArkCombobox.ItemIndicator>
  );
};
