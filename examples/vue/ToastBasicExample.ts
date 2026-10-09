import { defineComponent, h, type VNodeChild } from "vue";
import * as L from "@loongark/vue";
export const ToastBasicExample = defineComponent({
  setup() {
    const toaster = L.createToaster<VNodeChild>({ placement: "bottom-end" });
    return () =>
      h("div", {}, [
        h(
          L.LoongArkButton,
          {
            onClick: () => toaster.create({ title: "已保存", closable: true }),
          },
          () => "显示通知",
        ),
        h(
          L.LoongArkToaster,
          { toaster },
          {
            default: (toast: { title?: VNodeChild }) =>
              h(L.LoongArkToastRoot, {}, () => [
                h(L.LoongArkToastTitle, {}, () => toast.title),
                h(L.LoongArkToastCloseTrigger, {"aria-label":"关闭"}, () => "关闭"),
              ]),
          },
        ),
      ]);
  },
});
