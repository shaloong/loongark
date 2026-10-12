
import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticTocStyles } from "@loongark/primitives/automatic-styles/toc";
import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
} from "@ark-ui/solid/toc";
import { tocNavId, tocControlKeys } from "@loongark/kit";
import { splitProps } from "solid-js";
import { useToc } from "./use-toc";
export const LoongArkTocRoot = /*#__PURE__*/ withAutomaticStyles((props: TocRootProps) => {
  const [controls, dom] = splitProps(props, tocControlKeys);
  const toc = useToc(controls);
  return <Toc.RootProvider value={toc} {...dom} />;
}, lkAutomaticTocStyles);
export const LoongArkTocNav = /*#__PURE__*/ withAutomaticStyles((props: TocNavProps) => {
  const toc = useTocContext();
  return (
    <Toc.Nav {...props} id={props.id ?? tocNavId(toc().getRootProps().id)} />
  );
}, lkAutomaticTocStyles);
