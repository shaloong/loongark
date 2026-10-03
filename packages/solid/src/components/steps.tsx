/**
 * Steps component - Solid wrapper.
 * Uses Ark UI Steps with data attributes for styling.
 */
import { type Component, type JSX, mergeProps, splitProps } from "solid-js";
import {
  Steps as ArkSteps,
  type StepsRootProps as ArkStepsRootProps,
  type StepsListProps as ArkStepsListProps,
  type StepsItemProps as ArkStepsItemProps,
  type StepsIndicatorProps as ArkStepsIndicatorProps,
  type StepsSeparatorProps as ArkStepsSeparatorProps,
  type StepsTriggerProps as ArkStepsTriggerProps,
  type StepsContentProps as ArkStepsContentProps,
  type StepsCompletedContentProps as ArkStepsCompletedContentProps,
  type StepsProgressProps as ArkStepsProgressProps,
  type StepsNextTriggerProps as ArkStepsNextTriggerProps,
  type StepsPrevTriggerProps as ArkStepsPrevTriggerProps,
} from "@ark-ui/solid/steps";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

export interface LoongArkStepsRootProps extends Omit<
  ArkStepsRootProps,
  "asChild"
> {
  size?: StepsSize;
  orientation?: StepsOrientation;
  children?: JSX.Element;
}

export const LoongArkStepsRoot: Component<LoongArkStepsRootProps> = (props) => {
  const merged = mergeProps(
    { size: "md" as StepsSize, orientation: "horizontal" as StepsOrientation },
    props,
  );
  const [local, others] = splitProps(merged, [
    "children",
    "size",
    "orientation",
  ]);

  return (
    <ArkSteps.Root
      {...others}
      orientation={local.orientation}
      data-scope="steps"
      data-part="root"
      data-size={local.size}
      data-orientation={local.orientation}
    >
      {local.children}
    </ArkSteps.Root>
  );
};

export interface LoongArkStepsListProps extends Omit<
  ArkStepsListProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsList: Component<LoongArkStepsListProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.List {...others} data-scope="steps" data-part="list">
      {local.children}
    </ArkSteps.List>
  );
};

export interface LoongArkStepsItemProps extends Omit<
  ArkStepsItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsItem: Component<LoongArkStepsItemProps> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Item
      role="presentation"
      // Ark preserves undefined overrides; null clears state on this presentational container.
      aria-current={null as unknown as LoongArkStepsItemProps["aria-current"]}
      {...others}
      data-scope="steps"
      data-part="item"
    >
      {local.children}
    </ArkSteps.Item>
  );
};

export interface LoongArkStepsIndicatorProps extends Omit<
  ArkStepsIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsIndicator: Component<LoongArkStepsIndicatorProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Indicator {...others} data-scope="steps" data-part="indicator">
      {local.children}
    </ArkSteps.Indicator>
  );
};

export interface LoongArkStepsSeparatorProps extends Omit<
  ArkStepsSeparatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsSeparator: Component<LoongArkStepsSeparatorProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Separator {...others} data-scope="steps" data-part="separator">
      {local.children}
    </ArkSteps.Separator>
  );
};

export interface LoongArkStepsTriggerProps extends Omit<
  ArkStepsTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsTrigger: Component<LoongArkStepsTriggerProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Trigger {...others} data-scope="steps" data-part="trigger">
      {local.children}
    </ArkSteps.Trigger>
  );
};

export interface LoongArkStepsContentProps extends Omit<
  ArkStepsContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsContent: Component<LoongArkStepsContentProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Content {...others} data-scope="steps" data-part="content">
      {local.children}
    </ArkSteps.Content>
  );
};

export interface LoongArkStepsCompletedContentProps extends Omit<
  ArkStepsCompletedContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsCompletedContent: Component<
  LoongArkStepsCompletedContentProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.CompletedContent
      {...others}
      data-scope="steps"
      data-part="completed-content"
    >
      {local.children}
    </ArkSteps.CompletedContent>
  );
};

export interface LoongArkStepsProgressProps extends Omit<
  ArkStepsProgressProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsProgress: Component<LoongArkStepsProgressProps> = (
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Progress {...others} data-scope="steps" data-part="progress">
      {local.children}
    </ArkSteps.Progress>
  );
};

export interface LoongArkStepsNextTriggerProps extends Omit<
  ArkStepsNextTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsNextTrigger: Component<
  LoongArkStepsNextTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.NextTrigger
      {...others}
      data-scope="steps"
      data-part="next-trigger"
    >
      {local.children}
    </ArkSteps.NextTrigger>
  );
};

export interface LoongArkStepsPrevTriggerProps extends Omit<
  ArkStepsPrevTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsPrevTrigger: Component<
  LoongArkStepsPrevTriggerProps
> = (props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.PrevTrigger
      {...others}
      data-scope="steps"
      data-part="prev-trigger"
    >
      {local.children}
    </ArkSteps.PrevTrigger>
  );
};
