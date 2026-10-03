import { dataProps } from "../data-props";
import { Portal as ArkPortal } from "@ark-ui/react/portal";
import { createElement } from "react";
import type { ReactNode } from "react";
import { useOptionalLoongArkTheme } from "../theme-context";
export interface PortalProps {
  children?: ReactNode;
  disabled?: boolean;
  container?: { current: HTMLElement | null };
}
export const Portal = (props: PortalProps) => {
  const theme = useOptionalLoongArkTheme();
  return createElement(
    ArkPortal,
    dataProps({
      ...props,
      container: props.container ?? {
        current: theme?.getPortalContainer() ?? null,
      },
    }),
  );
};
export const LoongArkPortal = Portal;
