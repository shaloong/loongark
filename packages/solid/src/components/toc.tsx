import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
} from "@ark-ui/solid/toc";
import { tocNavId } from "@loongark/kit";
export const LoongArkTocRoot = (props: TocRootProps) => (
  <Toc.Root scrollBehavior="auto" {...props} />
);
export const LoongArkTocNav = (props: TocNavProps) => {
  const toc = useTocContext();
  return (
    <Toc.Nav {...props} id={props.id ?? tocNavId(toc().getRootProps().id)} />
  );
};
