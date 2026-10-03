import { Portal } from "solid-js/web";
import type { ParentProps } from "solid-js";
import { useOptionalTheme } from "../theme-context";
export const LoongArkPortal = (
  props: ParentProps & { disabled?: boolean; mount?: HTMLElement },
) => {
  const theme = useOptionalTheme();
  return (
    <Portal
      mount={props.mount ?? theme?.().getPortalContainer()}
      children={props.children}
    />
  );
};
