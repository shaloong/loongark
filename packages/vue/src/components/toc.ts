import { defineComponent, computed } from "vue";
import {
  Toc,
  useTocContext,
  type TocRootProps,
  type TocNavProps,
} from "@ark-ui/vue/toc";
import { tocNavId, tocControlKeys } from "@loongark/kit";
import { useToc } from "./use-toc";
import { renderPart } from "../render-part";
export const LoongArkTocRoot = defineComponent<TocRootProps>({
  inheritAttrs: false,
  props: tocControlKeys,
  setup(props, context) {
    const toc = useToc(computed(() => props));
    return () =>
      renderPart(
        Toc.RootProvider,
        { ...context.attrs, value: toc.value },
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
