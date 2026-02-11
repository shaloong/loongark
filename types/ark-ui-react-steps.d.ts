declare module "@ark-ui/react/steps" {
  import React, { type ReactNode } from "react";

  export interface StepsRootProps {
    value?: number | string;
    defaultValue?: number | string;
    count?: number;
    linear?: boolean;
    orientation?: "horizontal" | "vertical";
    onValueChange?: (details: { value: number | string }) => void;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsListProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsItemProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    value?: number | string;
    index?: number;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsIndicatorProps {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsContentProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsCompletedContentProps
    extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsProgressProps extends React.HTMLAttributes<HTMLDivElement> {
    ref?: React.Ref<HTMLDivElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsNextTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export interface StepsPrevTriggerProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    ref?: React.Ref<HTMLButtonElement>;
    children?: ReactNode;
    asChild?: boolean;
  }

  export namespace Steps {
    export const Root: React.FC<StepsRootProps>;
    export const List: React.FC<StepsListProps>;
    export const Item: React.FC<StepsItemProps>;
    export const Indicator: React.FC<StepsIndicatorProps>;
    export const Separator: React.FC<StepsSeparatorProps>;
    export const Trigger: React.FC<StepsTriggerProps>;
    export const Content: React.FC<StepsContentProps>;
    export const CompletedContent: React.FC<StepsCompletedContentProps>;
    export const Progress: React.FC<StepsProgressProps>;
    export const NextTrigger: React.FC<StepsNextTriggerProps>;
    export const PrevTrigger: React.FC<StepsPrevTriggerProps>;
  }
}
