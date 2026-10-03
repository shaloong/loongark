/**
 * Steps component - React wrapper.
 * Uses Ark UI Steps with data attributes for styling.
 */
import React, { forwardRef } from "react";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Steps } from "@ark-ui/react/steps";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

type ArkStepsRootProps = ComponentPropsWithoutRef<typeof Steps.Root>;
type ArkStepsListProps = ComponentPropsWithoutRef<typeof Steps.List>;
type ArkStepsItemProps = ComponentPropsWithoutRef<typeof Steps.Item>;
type ArkStepsIndicatorProps = ComponentPropsWithoutRef<typeof Steps.Indicator>;
type ArkStepsSeparatorProps = ComponentPropsWithoutRef<typeof Steps.Separator>;
type ArkStepsTriggerProps = ComponentPropsWithoutRef<typeof Steps.Trigger>;
type ArkStepsContentProps = ComponentPropsWithoutRef<typeof Steps.Content>;
type ArkStepsCompletedContentProps = ComponentPropsWithoutRef<
  typeof Steps.CompletedContent
>;
type ArkStepsProgressProps = ComponentPropsWithoutRef<typeof Steps.Progress>;
type ArkStepsNextTriggerProps = ComponentPropsWithoutRef<
  typeof Steps.NextTrigger
>;
type ArkStepsPrevTriggerProps = ComponentPropsWithoutRef<
  typeof Steps.PrevTrigger
>;

export interface LoongArkStepsRootProps extends Omit<
  ArkStepsRootProps,
  "asChild"
> {
  size?: StepsSize;
  orientation?: StepsOrientation;
  children?: ReactNode;
}

export interface LoongArkStepsListProps extends Omit<
  ArkStepsListProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsItemProps extends Omit<
  ArkStepsItemProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsIndicatorProps extends Omit<
  ArkStepsIndicatorProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsSeparatorProps extends Omit<
  ArkStepsSeparatorProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsTriggerProps extends Omit<
  ArkStepsTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsContentProps extends Omit<
  ArkStepsContentProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsCompletedContentProps extends Omit<
  ArkStepsCompletedContentProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsProgressProps extends Omit<
  ArkStepsProgressProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsNextTriggerProps extends Omit<
  ArkStepsNextTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export interface LoongArkStepsPrevTriggerProps extends Omit<
  ArkStepsPrevTriggerProps,
  "asChild"
> {
  children?: ReactNode;
}

export const LoongArkStepsRoot = forwardRef<
  HTMLDivElement,
  LoongArkStepsRootProps
>(({ children, size = "md", orientation = "horizontal", ...props }, ref) => {
  return (
    <Steps.Root
      {...props}
      ref={ref}
      orientation={orientation}
      data-scope="steps"
      data-part="root"
      data-size={size}
      data-orientation={orientation}
    >
      {children}
    </Steps.Root>
  );
});

LoongArkStepsRoot.displayName = "LoongArkStepsRoot";

export const LoongArkStepsList = forwardRef<
  HTMLDivElement,
  LoongArkStepsListProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.List {...props} ref={ref} data-scope="steps" data-part="list">
      {children}
    </Steps.List>
  );
});

LoongArkStepsList.displayName = "LoongArkStepsList";

export const LoongArkStepsItem = forwardRef<
  HTMLDivElement,
  LoongArkStepsItemProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.Item
      role="presentation"
      // Ark preserves undefined overrides; null clears state on this presentational container.
      aria-current={null as unknown as LoongArkStepsItemProps["aria-current"]}
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="item"
    >
      {children}
    </Steps.Item>
  );
});

LoongArkStepsItem.displayName = "LoongArkStepsItem";

export const LoongArkStepsIndicator = forwardRef<
  HTMLDivElement,
  LoongArkStepsIndicatorProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.Indicator
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="indicator"
    >
      {children}
    </Steps.Indicator>
  );
});

LoongArkStepsIndicator.displayName = "LoongArkStepsIndicator";

export const LoongArkStepsSeparator = forwardRef<
  HTMLDivElement,
  LoongArkStepsSeparatorProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.Separator
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="separator"
    >
      {children}
    </Steps.Separator>
  );
});

LoongArkStepsSeparator.displayName = "LoongArkStepsSeparator";

export const LoongArkStepsTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkStepsTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.Trigger {...props} ref={ref} data-scope="steps" data-part="trigger">
      {children}
    </Steps.Trigger>
  );
});

LoongArkStepsTrigger.displayName = "LoongArkStepsTrigger";

export const LoongArkStepsContent = forwardRef<
  HTMLDivElement,
  LoongArkStepsContentProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.Content {...props} ref={ref} data-scope="steps" data-part="content">
      {children}
    </Steps.Content>
  );
});

LoongArkStepsContent.displayName = "LoongArkStepsContent";

export const LoongArkStepsCompletedContent = forwardRef<
  HTMLDivElement,
  LoongArkStepsCompletedContentProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.CompletedContent
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="completed-content"
    >
      {children}
    </Steps.CompletedContent>
  );
});

LoongArkStepsCompletedContent.displayName = "LoongArkStepsCompletedContent";

export const LoongArkStepsProgress = forwardRef<
  HTMLDivElement,
  LoongArkStepsProgressProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.Progress
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="progress"
    >
      {children}
    </Steps.Progress>
  );
});

LoongArkStepsProgress.displayName = "LoongArkStepsProgress";

export const LoongArkStepsNextTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkStepsNextTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.NextTrigger
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="next-trigger"
    >
      {children}
    </Steps.NextTrigger>
  );
});

LoongArkStepsNextTrigger.displayName = "LoongArkStepsNextTrigger";

export const LoongArkStepsPrevTrigger = forwardRef<
  HTMLButtonElement,
  LoongArkStepsPrevTriggerProps
>(({ children, ...props }, ref) => {
  return (
    <Steps.PrevTrigger
      {...props}
      ref={ref}
      data-scope="steps"
      data-part="prev-trigger"
    >
      {children}
    </Steps.PrevTrigger>
  );
});

LoongArkStepsPrevTrigger.displayName = "LoongArkStepsPrevTrigger";
