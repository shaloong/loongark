
import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticStepsStyles } from "@shaloong/loongark-primitives/automatic-styles/steps";
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
import type { StepsOrientation, StepsSize } from "@shaloong/loongark-primitives";

export interface LoongArkStepsRootProps extends Omit<
  ArkStepsRootProps,
  "asChild"
> {
  size?: StepsSize;
  orientation?: StepsOrientation;
  children?: JSX.Element;
}

export const LoongArkStepsRoot: Component<LoongArkStepsRootProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticStepsStyles);

export interface LoongArkStepsListProps extends Omit<
  ArkStepsListProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsList: Component<LoongArkStepsListProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.List {...others} data-scope="steps" data-part="list">
      {local.children}
    </ArkSteps.List>
  );
}, lkAutomaticStepsStyles);

export interface LoongArkStepsItemProps extends Omit<
  ArkStepsItemProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsItem: Component<LoongArkStepsItemProps> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticStepsStyles);

export interface LoongArkStepsIndicatorProps extends Omit<
  ArkStepsIndicatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsIndicator: Component<LoongArkStepsIndicatorProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Indicator {...others} data-scope="steps" data-part="indicator">
      {local.children}
    </ArkSteps.Indicator>
  );
}, lkAutomaticStepsStyles);

export interface LoongArkStepsSeparatorProps extends Omit<
  ArkStepsSeparatorProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsSeparator: Component<LoongArkStepsSeparatorProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Separator {...others} data-scope="steps" data-part="separator">
      {local.children}
    </ArkSteps.Separator>
  );
}, lkAutomaticStepsStyles);

export interface LoongArkStepsTriggerProps extends Omit<
  ArkStepsTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsTrigger: Component<LoongArkStepsTriggerProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Trigger {...others} data-scope="steps" data-part="trigger">
      {local.children}
    </ArkSteps.Trigger>
  );
}, lkAutomaticStepsStyles);

export interface LoongArkStepsContentProps extends Omit<
  ArkStepsContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsContent: Component<LoongArkStepsContentProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Content {...others} data-scope="steps" data-part="content">
      {local.children}
    </ArkSteps.Content>
  );
}, lkAutomaticStepsStyles);

export interface LoongArkStepsCompletedContentProps extends Omit<
  ArkStepsCompletedContentProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsCompletedContent: Component<
  LoongArkStepsCompletedContentProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticStepsStyles);

export interface LoongArkStepsProgressProps extends Omit<
  ArkStepsProgressProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsProgress: Component<LoongArkStepsProgressProps> = /*#__PURE__*/ withAutomaticStyles((
  props,
) => {
  const [local, others] = splitProps(props, ["children"]);
  return (
    <ArkSteps.Progress {...others} data-scope="steps" data-part="progress">
      {local.children}
    </ArkSteps.Progress>
  );
}, lkAutomaticStepsStyles);

export interface LoongArkStepsNextTriggerProps extends Omit<
  ArkStepsNextTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsNextTrigger: Component<
  LoongArkStepsNextTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticStepsStyles);

export interface LoongArkStepsPrevTriggerProps extends Omit<
  ArkStepsPrevTriggerProps,
  "asChild"
> {
  children?: JSX.Element;
}

export const LoongArkStepsPrevTrigger: Component<
  LoongArkStepsPrevTriggerProps
> = /*#__PURE__*/ withAutomaticStyles((props) => {
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
}, lkAutomaticStepsStyles);
