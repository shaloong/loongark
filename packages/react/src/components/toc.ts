import { createElement, forwardRef } from "react";
import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
} from "@ark-ui/react/toc";
import { tocNavId } from "@loongark/kit";
export const LoongArkTocRoot = forwardRef<HTMLDivElement, TocRootProps>(
  (props, ref) =>
    createElement(Toc.Root, { scrollBehavior: "auto", ...props, ref }),
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
