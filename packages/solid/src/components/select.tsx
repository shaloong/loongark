
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticSelectStyles } from "@loongark/primitives/automatic-styles/select";
import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "./icon";
/**
 * Select 组件 - Solid 实现
 * 基于 Ark UI Select 的下拉选择器
 */

import {
  type Component,
  type JSX,
  mergeProps,
  createContext,
  useContext,
} from "solid-js";
import {
  Select as ArkSelect,
  type SelectRootProps as ArkSelectRootProps,
  type SelectLabelProps as ArkSelectLabelProps,
  type SelectControlProps as ArkSelectControlProps,
  type SelectTriggerProps as ArkSelectTriggerProps,
  type SelectValueTextProps as ArkSelectValueTextProps,
  type SelectIndicatorProps as ArkSelectIndicatorProps,
  type SelectClearTriggerProps as ArkSelectClearTriggerProps,
  type SelectPositionerProps as ArkSelectPositionerProps,
  type SelectContentProps as ArkSelectContentProps,
  type SelectListProps as ArkSelectListProps,
  type SelectItemGroupProps as ArkSelectItemGroupProps,
  type SelectItemGroupLabelProps as ArkSelectItemGroupLabelProps,
  type SelectItemProps as ArkSelectItemProps,
  type SelectItemTextProps as ArkSelectItemTextProps,
  type SelectItemIndicatorProps as ArkSelectItemIndicatorProps,
  type SelectHiddenSelectProps as ArkSelectHiddenSelectProps,
} from "@ark-ui/solid/select";
import type { SelectSize } from "@loongark/primitives";

const SelectContext = createContext<{ size: SelectSize }>({ size: "md" });

/**
 * Select Root Props
 */
export interface LoongArkSelectRootProps<
  T extends object = object,
> extends Omit<ArkSelectRootProps<T>, "asChild"> {
  size?: SelectSize;
  children?: JSX.Element;
}

/**
 * Select Root 组件
 */
export const LoongArkSelectRoot = /*#__PURE__*/ withAutomaticStyles(<T extends object>(
  props: LoongArkSelectRootProps<T>,
): JSX.Element => {
  const merged = mergeProps({ size: "md" as SelectSize }, props);

  return (
    <SelectContext.Provider value={{ size: merged.size }}>
      <ArkSelect.Root
        {...props}
        data-scope="select"
        data-part="root"
        data-size={merged.size}
      >
        {props.children}
      </ArkSelect.Root>
    </SelectContext.Provider>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Label 组件
 */
export const LoongArkSelectLabel: Component<
  ArkSelectLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.Label {...props} data-scope="select" data-part="label">
      {props.children}
    </ArkSelect.Label>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Control 组件
 */
export const LoongArkSelectControl: Component<
  ArkSelectControlProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.Control {...props} data-scope="select" data-part="control">
      {props.children}
    </ArkSelect.Control>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Trigger 组件
 */
export const LoongArkSelectTrigger: Component<
  ArkSelectTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.Trigger {...props} data-scope="select" data-part="trigger">
      {props.children}
    </ArkSelect.Trigger>
  );
}, lkAutomaticSelectStyles);

/**
 * Select ValueText 组件
 */
export const LoongArkSelectValueText: Component<
  ArkSelectValueTextProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.ValueText {...props} data-scope="select" data-part="value-text">
      {props.children}
    </ArkSelect.ValueText>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Indicator 组件
 */
export const LoongArkSelectIndicator: Component<
  ArkSelectIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.Indicator {...props} data-scope="select" data-part="indicator">
      {props.children ?? (
        <LoongArkIcon icon={controlIcons.chevronDown} size="sm" />
      )}
    </ArkSelect.Indicator>
  );
}, lkAutomaticSelectStyles);

/**
 * Select ClearTrigger 组件
 */
export const LoongArkSelectClearTrigger: Component<
  ArkSelectClearTriggerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.ClearTrigger
      {...props}
      data-scope="select"
      data-part="clear-trigger"
    >
      {props.children}
    </ArkSelect.ClearTrigger>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Positioner 组件
 */
export const LoongArkSelectPositioner: Component<
  ArkSelectPositionerProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.Positioner {...props} data-scope="select" data-part="positioner">
      {props.children}
    </ArkSelect.Positioner>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Content 组件
 */
export const LoongArkSelectContent: Component<
  ArkSelectContentProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const { size } = useContext(SelectContext);
  return (
    <ArkSelect.Content
      {...props}
      data-scope="select"
      data-part="content"
      data-size={size}
    >
      {props.children}
    </ArkSelect.Content>
  );
}, lkAutomaticSelectStyles);

/**
 * Select List 组件
 */
export const LoongArkSelectList: Component<
  ArkSelectListProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.List {...props} data-scope="select" data-part="list">
      {props.children}
    </ArkSelect.List>
  );
}, lkAutomaticSelectStyles);

/**
 * Select ItemGroup 组件
 */
export const LoongArkSelectItemGroup: Component<
  ArkSelectItemGroupProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.ItemGroup {...props} data-scope="select" data-part="item-group">
      {props.children}
    </ArkSelect.ItemGroup>
  );
}, lkAutomaticSelectStyles);

/**
 * Select ItemGroupLabel 组件
 */
export const LoongArkSelectItemGroupLabel: Component<
  ArkSelectItemGroupLabelProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.ItemGroupLabel
      {...props}
      data-scope="select"
      data-part="item-group-label"
    >
      {props.children}
    </ArkSelect.ItemGroupLabel>
  );
}, lkAutomaticSelectStyles);

/**
 * Select Item 组件
 */
export const LoongArkSelectItem: Component<
  ArkSelectItemProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.Item {...props} data-scope="select" data-part="item">
      {props.children}
    </ArkSelect.Item>
  );
}, lkAutomaticSelectStyles);

/**
 * Select ItemText 组件
 */
export const LoongArkSelectItemText: Component<
  ArkSelectItemTextProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.ItemText {...props} data-scope="select" data-part="item-text">
      {props.children}
    </ArkSelect.ItemText>
  );
}, lkAutomaticSelectStyles);

/**
 * Select ItemIndicator 组件
 */
export const LoongArkSelectItemIndicator: Component<
  ArkSelectItemIndicatorProps & { children?: JSX.Element }
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.ItemIndicator
      {...props}
      data-scope="select"
      data-part="item-indicator"
    >
      {props.children ?? <LoongArkIcon icon={controlIcons.check} size="sm" />}
    </ArkSelect.ItemIndicator>
  );
}, lkAutomaticSelectStyles);

/**
 * Select HiddenSelect 组件
 */
export const LoongArkSelectHiddenSelect: Component<
  ArkSelectHiddenSelectProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
  return (
    <ArkSelect.HiddenSelect
      {...props}
      data-scope="select"
      data-part="hidden-select"
    />
  );
}, lkAutomaticSelectStyles);
