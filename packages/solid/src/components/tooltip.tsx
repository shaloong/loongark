
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTooltipStyles } from "@loongark/primitives/automatic-styles/tooltip";
import { createMemo, JSX } from "solid-js";
import {
  Tooltip as ArkTooltip,
  type TooltipRootProps as ArkTooltipRootProps,
  type TooltipTriggerProps as ArkTooltipTriggerProps,
  type TooltipContentProps as ArkTooltipContentProps,
  type TooltipPositionerProps as ArkTooltipPositionerProps,
  type TooltipArrowProps as ArkTooltipArrowProps,
  type TooltipArrowTipProps as ArkTooltipArrowTipProps,
} from "@ark-ui/solid/tooltip";

import { LoongArkPortal } from "./portal";

export const LoongArkTooltipRoot = /*#__PURE__*/ withAutomaticStyles((
  props: ArkTooltipRootProps,
): JSX.Element => (
  <ArkTooltip.Root {...props} data-scope="tooltip" data-part="root" />
), lkAutomaticTooltipStyles);

export const LoongArkTooltipTrigger = /*#__PURE__*/ withAutomaticStyles((
  props: ArkTooltipTriggerProps,
): JSX.Element => {
  const merged = createMemo(() => ({ ...props }));
  return (
    <ArkTooltip.Trigger
      {...merged()}
      data-scope="tooltip"
      data-part="trigger"
    />
  );
}, lkAutomaticTooltipStyles);

export const LoongArkTooltipPositioner = /*#__PURE__*/ withAutomaticStyles((
  props: ArkTooltipPositionerProps & { children?: JSX.Element },
): JSX.Element => {
  return (
    <LoongArkPortal>
      <ArkTooltip.Positioner
        {...props}
        data-scope="tooltip"
        data-part="positioner"
      />
    </LoongArkPortal>
  );
}, lkAutomaticTooltipStyles);

export const LoongArkTooltipContent = /*#__PURE__*/ withAutomaticStyles((
  props: ArkTooltipContentProps & { interactive?: boolean },
): JSX.Element => {
  const interactive = props.interactive ? "true" : undefined;
  return (
    <ArkTooltip.Content
      {...props}
      data-scope="tooltip"
      data-part="content"
      data-interactive={interactive}
    />
  );
}, lkAutomaticTooltipStyles);

export const LoongArkTooltipArrow = /*#__PURE__*/ withAutomaticStyles((
  props: ArkTooltipArrowProps,
): JSX.Element => (
  <ArkTooltip.Arrow {...props} data-scope="tooltip" data-part="arrow" />
), lkAutomaticTooltipStyles);

export const LoongArkTooltipArrowTip = /*#__PURE__*/ withAutomaticStyles((
  props: ArkTooltipArrowTipProps,
): JSX.Element => (
  <ArkTooltip.ArrowTip {...props} data-scope="tooltip" data-part="arrow-tip" />
), lkAutomaticTooltipStyles);
