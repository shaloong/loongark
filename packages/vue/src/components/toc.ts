import { defineComponent } from "vue";
import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
} from "@ark-ui/vue/toc";
import { tocNavId } from "@loongark/kit";
import { renderPart } from "../render-part";
export const LoongArkTocRoot = defineComponent<TocRootProps>({
  inheritAttrs: false,
  setup(_, context) {
    return () =>
      renderPart(
        Toc.Root,
        { scrollBehavior: "auto", autoScroll: true, ...context.attrs },
        context.slots,
      );
  },
});
export const LoongArkTocNav = defineComponent<TocNavProps>({
  inheritAttrs: false,
  setup(_, context) {
    const toc = useTocContext();
    return () =>
      renderPart(
        Toc.Nav,
        {
          ...context.attrs,
          id: context.attrs.id ?? tocNavId(toc.value.getRootProps().id),
        },
        context.slots,
      );
  },
});
