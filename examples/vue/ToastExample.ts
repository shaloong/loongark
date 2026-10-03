import { defineComponent, h } from "vue";
import {
  LoongArkButton,
  LoongArkToaster,
  LoongArkToastRoot,
  LoongArkToastTitle,
  LoongArkToastDescription,
  LoongArkToastActionTrigger,
  LoongArkToastCloseTrigger,
  createToaster,
} from "@loongark/vue";

type ToastVariant = "info" | "success" | "warning" | "error";

const createToast = (
  toaster: ReturnType<typeof createToaster<import("vue").VNodeChild>>,
  type: ToastVariant,
  title: string
) => {
  const actionLabel = type === "success" ? "Undo" : "Details";
  toaster[type]({
    title,
    description: "Updates are synchronized with your workspace.",
    action: {
      label: actionLabel,
      onClick: () => undefined,
    },
    closable: true,
  });
};

export const ToastExample = defineComponent({
  name: "ToastExample",
  setup() {
    const toaster = createToaster({ placement: "bottom-end" });
    const resolveToast = (slotProps: any) =>
      slotProps?.toast ?? slotProps ?? {};

    return () =>
      h("div", { style: { display: "flex", flexDirection: "column", gap: "12px" } }, [
        h(
          "div",
          { style: { display: "flex", gap: "12px", flexWrap: "wrap" } },
          [
            h(
              LoongArkButton,
              {
                onClick: () => createToast(toaster, "info", "Toast created"),
              },
              { default: () => "Create toast" }
            ),
            h(
              LoongArkButton,
              {
                onClick: () => createToast(toaster, "success", "Saved successfully"),
              },
              { default: () => "Success" }
            ),
          ]
        ),
        h(
          LoongArkToaster,
          { toaster },
          {
            default: (slotProps: any) => {
              const toast = resolveToast(slotProps);
              return h(
                LoongArkToastRoot,
                null,
                {
                  default: () => [
                    toast.title
                      ? h(
                          LoongArkToastTitle,
                          null,
                          { default: () => toast.title }
                        )
                      : null,
                    toast.description
                      ? h(
                          LoongArkToastDescription,
                          null,
                          { default: () => toast.description }
                        )
                      : null,
                    toast.action
                      ? h(
                          LoongArkToastActionTrigger,
                          null,
                          { default: () => toast.action.label }
                        )
                      : null,
                    toast.closable
                      ? h(
                          LoongArkToastCloseTrigger,
                          null,
                          { default: () => "Close" }
                        )
                      : null,
                  ].filter(Boolean),
                }
              );
            },
          }
        ),
      ]);
  },
});
