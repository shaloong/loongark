import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
} from "@ark-ui/solid/toc";
import { tocNavId, tocControlKeys } from "@loongark/kit";
import { splitProps } from "solid-js";
import { useToc } from "./use-toc";
export const LoongArkTocRoot = (props: TocRootProps) => {
  const [controls, dom] = splitProps(props, tocControlKeys);
  const toc = useToc(controls);
  return <Toc.RootProvider value={toc} {...dom} />;
};
export const LoongArkTocNav = (props: TocNavProps) => {
  const toc = useTocContext();
  return (
    <Toc.Nav {...props} id={props.id ?? tocNavId(toc().getRootProps().id)} />
  );
};
