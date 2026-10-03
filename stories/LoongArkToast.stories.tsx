import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  LoongArkToaster,
  LoongArkToastRoot,
  LoongArkToastTitle,
  LoongArkToastDescription,
  LoongArkToastActionTrigger,
  LoongArkToastCloseTrigger,
  createToaster,
} from "@loongark/react";
import { LoongArkButton } from "@loongark/react";

const meta: Meta = {
  title: "Components/Toast",
  parameters: {
    docs: {
      description: {
        component:
          "LoongArkToast wraps Ark UI Toast with LoongArk data attributes and token-driven styling.",
      },
    },
  },
};

export default meta;

type Story = StoryObj;

type ToastVariant = "info" | "success" | "warning" | "error";

const ToastHost = ({
  toaster,
}: {
  toaster: ReturnType<typeof createToaster<React.ReactNode>>;
}) => (
  <LoongArkToaster toaster={toaster}>
    {(toast) => (
      <LoongArkToastRoot>
        {toast.title ? (
          <LoongArkToastTitle>{toast.title}</LoongArkToastTitle>
        ) : null}
        {toast.description ? (
          <LoongArkToastDescription>
            {toast.description}
          </LoongArkToastDescription>
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
);

const createToast = (
  toaster: ReturnType<typeof createToaster<React.ReactNode>>,
  type: ToastVariant,
  title: string,
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

const BasicDemo = () => {
  const toaster = React.useMemo(
    () => createToaster({ placement: "bottom-end" }),
    [],
  );
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <LoongArkButton
        onClick={() => createToast(toaster, "info", "Toast created")}
      >
        Create toast
      </LoongArkButton>
      <ToastHost toaster={toaster} />
    </div>
  );
};

const VariantsDemo = () => {
  const toaster = React.useMemo(
    () => createToaster({ placement: "bottom-end" }),
    [],
  );
  return (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      <LoongArkButton
        onClick={() => createToast(toaster, "info", "New update available")}
      >
        Info
      </LoongArkButton>
      <LoongArkButton
        onClick={() => createToast(toaster, "success", "Saved successfully")}
      >
        Success
      </LoongArkButton>
      <LoongArkButton
        onClick={() => createToast(toaster, "warning", "Check your inputs")}
      >
        Warning
      </LoongArkButton>
      <LoongArkButton
        onClick={() => createToast(toaster, "error", "Upload failed")}
      >
        Error
      </LoongArkButton>
      <ToastHost toaster={toaster} />
    </div>
  );
};

export const Basic: Story = {
  render: () => <BasicDemo />,
};

export const Variants: Story = {
  render: () => <VariantsDemo />,
};
