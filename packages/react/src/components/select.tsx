/**
 * Select 组件 - React 实现
 * 基于 Ark UI Select 的下拉选择器
 */

import React, {
  forwardRef,
  createContext,
  useContext,
  createElement,
  type FC,
  type ReactNode,
} from "react";
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
} from "@ark-ui/react/select";
import type { SelectSize } from "@loongark/primitives";
import { Portal as ArkPortal } from "./portal";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const SelectContext = createContext<{ size: SelectSize }>({ size: "md" });

/**
 * Select Root Props
 */
export interface SelectRootProps<T = object> extends Omit<
  ArkSelectRootProps<T>,
  "asChild"
> {
  size?: SelectSize;
}

/**
 * Select Root 组件
 */
export function SelectRoot<T = object>(props: SelectRootProps<T>) {
  const { size = "md", ...rest } = props;

  return (
    <SelectContext.Provider value={{ size }}>
      <ArkSelect.Root
        {...rest}
        data-scope="select"
        data-part="root"
        data-size={size}
      />
    </SelectContext.Provider>
  );
}

SelectRoot.displayName = "LoongArkSelectRoot";

/**
 * Select Label 组件
 */
export const SelectLabel = forwardRef<HTMLLabelElement, ArkSelectLabelProps>(
  (props, ref) => {
    return (
      <ArkSelect.Label
        {...props}
        ref={ref}
        data-scope="select"
        data-part="label"
      />
    );
  },
);

SelectLabel.displayName = "LoongArkSelectLabel";

/**
 * Select Control 组件
 */
export const SelectControl = forwardRef<HTMLDivElement, ArkSelectControlProps>(
  (props, ref) => {
    return (
      <ArkSelect.Control
        {...props}
        ref={ref}
        data-scope="select"
        data-part="control"
      />
    );
  },
);

SelectControl.displayName = "LoongArkSelectControl";

/**
 * Select Trigger 组件
 */
export const SelectTrigger = forwardRef<
  HTMLButtonElement,
  ArkSelectTriggerProps
>((props, ref) => {
  return (
    <ArkSelect.Trigger
      {...props}
      ref={ref}
      data-scope="select"
      data-part="trigger"
    />
  );
});

SelectTrigger.displayName = "LoongArkSelectTrigger";

/**
 * Select ValueText 组件
 */
export const SelectValueText = forwardRef<
  HTMLSpanElement,
  ArkSelectValueTextProps
>((props, ref) => {
  return (
    <ArkSelect.ValueText
      {...props}
      ref={ref}
      data-scope="select"
      data-part="value-text"
    />
  );
});

SelectValueText.displayName = "LoongArkSelectValueText";

/**
 * Select Indicator 组件
 */
export const SelectIndicator = forwardRef<
  HTMLDivElement,
  ArkSelectIndicatorProps
>((props, ref) => {
  return (
    <ArkSelect.Indicator
      {...props}
      ref={ref}
      data-scope="select"
      data-part="indicator"
    />
  );
});

SelectIndicator.displayName = "LoongArkSelectIndicator";

/**
 * Select ClearTrigger 组件
 */
export const SelectClearTrigger = forwardRef<
  HTMLButtonElement,
  ArkSelectClearTriggerProps
>((props, ref) => {
  return (
    <ArkSelect.ClearTrigger
      {...props}
      ref={ref}
      data-scope="select"
      data-part="clear-trigger"
    />
  );
});

SelectClearTrigger.displayName = "LoongArkSelectClearTrigger";

/**
 * Select Positioner 组件
 */
export const SelectPositioner = forwardRef<
  HTMLDivElement,
  ArkSelectPositionerProps
>((props, ref) => {
  return (
    <SafePortal>
      <ArkSelect.Positioner
        {...props}
        ref={ref}
        data-scope="select"
        data-part="positioner"
      />
    </SafePortal>
  );
});

SelectPositioner.displayName = "LoongArkSelectPositioner";

/**
 * Select Content 组件
 */
export const SelectContent = forwardRef<HTMLDivElement, ArkSelectContentProps>(
  (props, ref) => {
    const { size } = useContext(SelectContext);
    return (
      <ArkSelect.Content
        {...props}
        ref={ref}
        data-scope="select"
        data-part="content"
        data-size={size}
      />
    );
  },
);

SelectContent.displayName = "LoongArkSelectContent";

/**
 * Select List 组件
 */
export const SelectList = forwardRef<HTMLDivElement, ArkSelectListProps>(
  (props, ref) => {
    return (
      <ArkSelect.List
        {...props}
        ref={ref}
        data-scope="select"
        data-part="list"
      />
    );
  },
);

SelectList.displayName = "LoongArkSelectList";

/**
 * Select ItemGroup 组件
 */
export const SelectItemGroup = forwardRef<
  HTMLDivElement,
  ArkSelectItemGroupProps
>((props, ref) => {
  return (
    <ArkSelect.ItemGroup
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-group"
    />
  );
});

SelectItemGroup.displayName = "LoongArkSelectItemGroup";

/**
 * Select ItemGroupLabel 组件
 */
export const SelectItemGroupLabel = forwardRef<
  HTMLDivElement,
  ArkSelectItemGroupLabelProps
>((props, ref) => {
  return (
    <ArkSelect.ItemGroupLabel
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-group-label"
    />
  );
});

SelectItemGroupLabel.displayName = "LoongArkSelectItemGroupLabel";

/**
 * Select Item 组件
 */
export const SelectItem = forwardRef<HTMLDivElement, ArkSelectItemProps>(
  (props, ref) => {
    return (
      <ArkSelect.Item
        {...props}
        ref={ref}
        data-scope="select"
        data-part="item"
      />
    );
  },
);

SelectItem.displayName = "LoongArkSelectItem";

/**
 * Select ItemText 组件
 */
export const SelectItemText = forwardRef<
  HTMLDivElement,
  ArkSelectItemTextProps
>((props, ref) => {
  return (
    <ArkSelect.ItemText
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-text"
    />
  );
});

SelectItemText.displayName = "LoongArkSelectItemText";

/**
 * Select ItemIndicator 组件
 */
export const SelectItemIndicator = forwardRef<
  HTMLDivElement,
  ArkSelectItemIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <ArkSelect.ItemIndicator
      {...props}
      ref={ref}
      data-scope="select"
      data-part="item-indicator"
    >
      {children || (
        <svg
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ width: "1em", height: "1em" }}
        >
          <path
            d="M11.6666 3.5L5.24992 9.91667L2.33325 7"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </ArkSelect.ItemIndicator>
  );
});

SelectItemIndicator.displayName = "LoongArkSelectItemIndicator";

/**
 * Select HiddenSelect 组件 (用于表单提交)
 */
export const SelectHiddenSelect = forwardRef<
  HTMLSelectElement,
  ArkSelectHiddenSelectProps
>((props, ref) => {
  return (
    <ArkSelect.HiddenSelect
      {...props}
      ref={ref}
      data-scope="select"
      data-part="hidden-select"
    />
  );
});

SelectHiddenSelect.displayName = "LoongArkSelectHiddenSelect";
