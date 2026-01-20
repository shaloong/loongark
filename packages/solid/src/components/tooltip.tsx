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

// 简易 Portal 占位，避免对 solid-js/web 依赖
const NoopPortal = (props: { children?: JSX.Element }) => <>{props.children}</>;

export const LoongArkTooltipRoot = (props: ArkTooltipRootProps): JSX.Element => (
  <ArkTooltip.Root {...props} data-scope="tooltip" data-part="root" />
);

export const LoongArkTooltipTrigger = (
  props: ArkTooltipTriggerProps
): JSX.Element => {
  const merged = createMemo(() => ({ asChild: true, ...props }));
  return <ArkTooltip.Trigger {...merged()} data-scope="tooltip" data-part="trigger" />;
};

export const LoongArkTooltipPositioner = (
  props: ArkTooltipPositionerProps & { children?: JSX.Element }
): JSX.Element => {
  return (
    <NoopPortal>
      <ArkTooltip.Positioner {...props} data-scope="tooltip" data-part="positioner" />
    </NoopPortal>
  );
};

export const LoongArkTooltipContent = (
  props: ArkTooltipContentProps & { interactive?: boolean }
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
};

export const LoongArkTooltipArrow = (props: ArkTooltipArrowProps): JSX.Element => (
  <ArkTooltip.Arrow {...props} data-scope="tooltip" data-part="arrow" />
);

export const LoongArkTooltipArrowTip = (props: ArkTooltipArrowTipProps): JSX.Element => (
  <ArkTooltip.ArrowTip {...props} data-scope="tooltip" data-part="arrow-tip" />
);
