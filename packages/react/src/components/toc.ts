import { createElement, forwardRef } from "react";
import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
  type TocRootProviderProps,
} from "@ark-ui/react/toc";
import { tocNavId } from "@loongark/kit";
import { mergeProps } from "@zag-js/react";
import { useToc } from "./use-toc";
export const LoongArkTocRootProvider = forwardRef<
  HTMLDivElement,
  TocRootProviderProps
>((props, ref) =>
  createElement(Toc.RootProvider, {
    ...mergeProps(props.value.getRootProps(), props),
    value: props.value,
    ref,
  }),
);
export const LoongArkTocRoot = forwardRef<HTMLDivElement, TocRootProps>(
  (props, ref) => {
    const {
      activeIds,
      autoScroll,
      defaultActiveIds,
      scrollEl,
      id,
      ids,
      items,
      onActiveChange,
      rootMargin,
      scrollBehavior,
      threshold,
      ...dom
    } = props;
    const toc = useToc({
      activeIds,
      autoScroll,
      defaultActiveIds,
      scrollEl,
      id,
      ids,
      items,
      onActiveChange,
      rootMargin,
      scrollBehavior,
      threshold,
    });
    return createElement(LoongArkTocRootProvider, { ...dom, value: toc, ref });
  },
);
export const LoongArkTocNav = forwardRef<HTMLElement, TocNavProps>(
  (props, ref) => {
    const toc = useTocContext();
    return createElement(Toc.Nav, {
      ...props,
      id: props.id ?? tocNavId(toc.getRootProps().id),
      ref,
    });
  },
);
