declare module "@ark-ui/solid/steps" {
  import type { Component, JSX } from "solid-js";

  export interface StepsRootProps {
    value?: number | string;
    defaultValue?: number | string;
    count?: number;
    linear?: boolean;
    orientation?: "horizontal" | "vertical";
    onValueChange?: (details: { value: number | string }) => void;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsListProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsItemProps {
    value?: number | string;
    index?: number;
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsIndicatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsSeparatorProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsCompletedContentProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsProgressProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsNextTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export interface StepsPrevTriggerProps {
    children?: JSX.Element;
    asChild?: boolean;
  }

  export const Steps: {
    Root: Component<StepsRootProps>;
    List: Component<StepsListProps>;
    Item: Component<StepsItemProps>;
    Indicator: Component<StepsIndicatorProps>;
    Separator: Component<StepsSeparatorProps>;
    Trigger: Component<StepsTriggerProps>;
    Content: Component<StepsContentProps>;
    CompletedContent: Component<StepsCompletedContentProps>;
    Progress: Component<StepsProgressProps>;
    NextTrigger: Component<StepsNextTriggerProps>;
    PrevTrigger: Component<StepsPrevTriggerProps>;
  };
}
