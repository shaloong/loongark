import React, { useMemo } from "react";
import {
  LoongArkProvider,
  LoongArkButton,
  LoongArkToaster,
  LoongArkToastRoot,
  LoongArkToastTitle,
  LoongArkToastDescription,
  LoongArkToastActionTrigger,
  LoongArkToastCloseTrigger,
  createToaster,
} from "@loongark/react";

type ToastVariant = "info" | "success" | "warning" | "error";

const createToast = (
  toaster: ReturnType<typeof createToaster>,
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

export const ToastExample = () => {
  const toaster = useMemo(() => createToaster({ placement: "bottom-end" }), []);

  return (
    <LoongArkProvider mode="light">
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <LoongArkButton onClick={() => createToast(toaster, "info", "Toast created")}>
          Create toast
        </LoongArkButton>
        <LoongArkButton onClick={() => createToast(toaster, "success", "Saved successfully")}>
          Success
        </LoongArkButton>
      </div>

      <LoongArkToaster toaster={toaster}>
        {(toast) => (
          <LoongArkToastRoot>
            {toast.title ? <LoongArkToastTitle>{toast.title}</LoongArkToastTitle> : null}
            {toast.description ? (
              <LoongArkToastDescription>{toast.description}</LoongArkToastDescription>
            ) : null}
            {toast.action ? (
              <LoongArkToastActionTrigger>
                {toast.action.label}
              </LoongArkToastActionTrigger>
            ) : null}
            {toast.closable ? (
              <LoongArkToastCloseTrigger>Close</LoongArkToastCloseTrigger>
            ) : null}
          </LoongArkToastRoot>
        )}
      </LoongArkToaster>
    </LoongArkProvider>
  );
};
