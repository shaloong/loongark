/**
 * Combobox component - React wrapper.
 * Based on Ark UI Combobox, injects data-scope/data-part attributes.
 */
import React, {
  createContext,
  createElement,
  forwardRef,
  useContext,
  type FC,
  type ReactNode,
} from "react";
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
} from "@ark-ui/react/combobox";
import { Portal as ArkPortal } from "./portal";
import type { ComboboxSize } from "@loongark/primitives";

const SafePortal: FC<{ children?: ReactNode }> = ({ children }) =>
  createElement(ArkPortal, null, children);

const ComboboxContext = createContext<{ size: ComboboxSize }>({ size: "md" });

export interface LoongArkComboboxRootProps<T = object> extends Omit<
  ArkComboboxRootProps<T>,
  "asChild"
> {
  size?: ComboboxSize;
  children?: ReactNode;
}

export const LoongArkComboboxRoot = forwardRef<
  HTMLDivElement,
  LoongArkComboboxRootProps
>(({ size = "md", children, ...props }, ref) => {
  return (
    <ComboboxContext.Provider value={{ size }}>
      <ArkCombobox.Root
        {...props}
        ref={ref}
        data-scope="combobox"
        data-part="root"
        data-size={size}
      >
        {children}
      </ArkCombobox.Root>
    </ComboboxContext.Provider>
  );
}) as (<T>(
  props: LoongArkComboboxRootProps<T> &
    import("react").RefAttributes<HTMLDivElement>,
) => import("react").ReactElement | null) & { displayName?: string };

LoongArkComboboxRoot.displayName = "LoongArkComboboxRoot";

export const LoongArkComboboxLabel = forwardRef<
  HTMLLabelElement,
  ArkComboboxLabelProps
>((props, ref) => {
  return (
    <ArkCombobox.Label
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="label"
    />
  );
});

LoongArkComboboxLabel.displayName = "LoongArkComboboxLabel";

export const LoongArkComboboxControl = forwardRef<
  HTMLDivElement,
  ArkComboboxControlProps
>((props, ref) => {
  return (
    <ArkCombobox.Control
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="control"
    />
  );
});

LoongArkComboboxControl.displayName = "LoongArkComboboxControl";

export const LoongArkComboboxInput = forwardRef<
  HTMLInputElement,
  ArkComboboxInputProps
>((props, ref) => {
  return (
    <ArkCombobox.Input
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="input"
    />
  );
});

LoongArkComboboxInput.displayName = "LoongArkComboboxInput";

export const LoongArkComboboxTrigger = forwardRef<
  HTMLButtonElement,
  ArkComboboxTriggerProps
>((props, ref) => {
  return (
    <ArkCombobox.Trigger
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="trigger"
    />
  );
});

LoongArkComboboxTrigger.displayName = "LoongArkComboboxTrigger";

export const LoongArkComboboxClearTrigger = forwardRef<
  HTMLButtonElement,
  ArkComboboxClearTriggerProps
>((props, ref) => {
  return (
    <ArkCombobox.ClearTrigger
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="clear-trigger"
    />
  );
});

LoongArkComboboxClearTrigger.displayName = "LoongArkComboboxClearTrigger";

export const LoongArkComboboxPositioner = forwardRef<
  HTMLDivElement,
  ArkComboboxPositionerProps
>((props, ref) => {
  return (
    <SafePortal>
      <ArkCombobox.Positioner
        {...props}
        ref={ref}
        data-scope="combobox"
        data-part="positioner"
      />
    </SafePortal>
  );
});

LoongArkComboboxPositioner.displayName = "LoongArkComboboxPositioner";

export const LoongArkComboboxContent = forwardRef<
  HTMLDivElement,
  ArkComboboxContentProps
>((props, ref) => {
  const { size } = useContext(ComboboxContext);
  return (
    <ArkCombobox.Content
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="content"
      data-size={size}
    />
  );
});

LoongArkComboboxContent.displayName = "LoongArkComboboxContent";

export const LoongArkComboboxList = forwardRef<
  HTMLDivElement,
  ArkComboboxListProps
>((props, ref) => {
  return (
    <ArkCombobox.List
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="list"
    />
  );
});

LoongArkComboboxList.displayName = "LoongArkComboboxList";

export const LoongArkComboboxItemGroup = forwardRef<
  HTMLDivElement,
  ArkComboboxItemGroupProps
>((props, ref) => {
  return (
    <ArkCombobox.ItemGroup
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-group"
    />
  );
});

LoongArkComboboxItemGroup.displayName = "LoongArkComboboxItemGroup";

export const LoongArkComboboxItemGroupLabel = forwardRef<
  HTMLDivElement,
  ArkComboboxItemGroupLabelProps
>((props, ref) => {
  return (
    <ArkCombobox.ItemGroupLabel
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-group-label"
    />
  );
});

LoongArkComboboxItemGroupLabel.displayName = "LoongArkComboboxItemGroupLabel";

export const LoongArkComboboxItem = forwardRef<
  HTMLDivElement,
  ArkComboboxItemProps
>((props, ref) => {
  return (
    <ArkCombobox.Item
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item"
    />
  );
});

LoongArkComboboxItem.displayName = "LoongArkComboboxItem";

export const LoongArkComboboxItemText = forwardRef<
  HTMLDivElement,
  ArkComboboxItemTextProps
>((props, ref) => {
  return (
    <ArkCombobox.ItemText
      {...props}
      ref={ref}
      data-scope="combobox"
      data-part="item-text"
    />
  );
});

LoongArkComboboxItemText.displayName = "LoongArkComboboxItemText";

export const LoongArkComboboxItemIndicator = forwardRef<
  HTMLDivElement,
  ArkComboboxItemIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <ArkCombobox.ItemIndicator
      {...props}
      ref={ref}
      data-scope="combobox"
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
    </ArkCombobox.ItemIndicator>
  );
});

LoongArkComboboxItemIndicator.displayName = "LoongArkComboboxItemIndicator";
