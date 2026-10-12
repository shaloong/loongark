
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticComboboxStyles } from "@loongark/primitives/automatic-styles/combobox";
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

export const LoongArkComboboxRoot = /*#__PURE__*/ withAutomaticStyles(<T extends object>(
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
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxLabel: Component<
  ArkComboboxLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.Label {...props} data-scope="combobox" data-part="label">
      {props.children}
    </ArkCombobox.Label>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxControl: Component<
  ArkComboboxControlProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.Control {...props} data-scope="combobox" data-part="control">
      {props.children}
    </ArkCombobox.Control>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxInput: Component<ArkComboboxInputProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  return (
    <ArkCombobox.Input {...props} data-scope="combobox" data-part="input" />
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxTrigger: Component<
  ArkComboboxTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.Trigger {...props} data-scope="combobox" data-part="trigger">
      {props.children ?? (
        <LoongArkIcon icon={controlIcons.chevronDown} size="sm" />
      )}
    </ArkCombobox.Trigger>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxClearTrigger: Component<
  ArkComboboxClearTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.ClearTrigger
      {...props}
      data-scope="combobox"
      data-part="clear-trigger"
    >
      {props.children}
    </ArkCombobox.ClearTrigger>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxPositioner: Component<
  ArkComboboxPositionerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.Positioner
      {...props}
      data-scope="combobox"
      data-part="positioner"
    >
      {props.children}
    </ArkCombobox.Positioner>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxContent: Component<
  ArkComboboxContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxList: Component<
  ArkComboboxListProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.List {...props} data-scope="combobox" data-part="list">
      {props.children}
    </ArkCombobox.List>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxItemGroup: Component<
  ArkComboboxItemGroupProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.ItemGroup
      {...props}
      data-scope="combobox"
      data-part="item-group"
    >
      {props.children}
    </ArkCombobox.ItemGroup>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxItemGroupLabel: Component<
  ArkComboboxItemGroupLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.ItemGroupLabel
      {...props}
      data-scope="combobox"
      data-part="item-group-label"
    >
      {props.children}
    </ArkCombobox.ItemGroupLabel>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxItem: Component<
  ArkComboboxItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.Item {...props} data-scope="combobox" data-part="item">
      {props.children}
    </ArkCombobox.Item>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxItemText: Component<
  ArkComboboxItemTextProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.ItemText
      {...props}
      data-scope="combobox"
      data-part="item-text"
    >
      {props.children}
    </ArkCombobox.ItemText>
  );
}, lkAutomaticComboboxStyles);

export const LoongArkComboboxItemIndicator: Component<
  ArkComboboxItemIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkCombobox.ItemIndicator
      {...props}
      data-scope="combobox"
      data-part="item-indicator"
    >
      {props.children ?? <LoongArkIcon icon={controlIcons.check} size="sm" />}
    </ArkCombobox.ItemIndicator>
  );
}, lkAutomaticComboboxStyles);
