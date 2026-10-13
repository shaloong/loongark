import { controlIcons } from "./icon";
import type {
  ConversationActionHandler,
  ConversationActionLabels,
  ConversationAction,
} from "./conversation-actions";
/** @deprecated 请使用 controlIcons.file 节点；保留旧入口，不再维护独立路径。 */
export const attachmentIconPath = controlIcons.file
  .filter(([tag]) => tag === "path")
  .map(([, attributes]) => attributes.d ?? "")
  .join(" ");
export interface ConversationActionOptions {
  /** 换成另一个消息或文件时重置反馈并取消旧动作。 */
  actionKey?: string | number;
  actionLabels?: ConversationActionLabels;
}
export interface AttachmentOptions extends ConversationActionOptions {
  name: string;
  size?: number;
  href?: string;
  status?: "ready" | "uploading" | "error";
  progress?: number;
  disabled?: boolean;
  errorLabel?: string;
  removeLabel?: string;
  retryLabel?: string;
  onRemove?: ConversationActionHandler;
  onRetry?: ConversationActionHandler;
  onPreview?: ConversationActionHandler;
  onCancel?: ConversationActionHandler;
  previewLabel?: string;
  cancelLabel?: string;
}
export interface BubbleOptions {
  side?: "incoming" | "outgoing";
}
export interface MessageOptions
  extends BubbleOptions, ConversationActionOptions {
  actions?: readonly ConversationAction[];
  disabled?: boolean;
  author: string;
  dateTime?: string;
  timeLabel?: string;
  status?: "sent" | "sending" | "error";
  statusLabel?: string;
  retryLabel?: string;
  onRetry?: ConversationActionHandler;
}
export function fileSize(bytes?: number) {
  if (bytes === undefined || !Number.isFinite(bytes) || bytes < 0) return "";
  if (bytes < 1024) return Math.round(bytes) + " B";
  const unit = bytes < 1024 ** 2 ? "KB" : bytes < 1024 ** 3 ? "MB" : "GB";
  const divisor = unit === "KB" ? 1024 : unit === "MB" ? 1024 ** 2 : 1024 ** 3;
  return Number((bytes / divisor).toFixed(1)) + " " + unit;
}
export function attachmentView(options: AttachmentOptions) {
  const status = options.status ?? "ready";
  return {
    status,
    size: fileSize(options.size),
    progress:
      options.progress === undefined || !Number.isFinite(options.progress)
        ? undefined
        : Math.min(100, Math.max(0, options.progress)),
    link: status === "ready" && !options.disabled ? options.href : undefined,
    error: options.errorLabel ?? "Upload failed",
    remove: options.removeLabel ?? "Remove " + options.name,
    retry: options.retryLabel ?? "Retry " + options.name,
  };
}
export function messageStatus(options: MessageOptions) {
  return (
    options.statusLabel ??
    (options.status === "error"
      ? "Could not send"
      : options.status === "sending"
        ? "Sending…"
        : "Sent")
  );
}
export { conversationCSS } from "./conversation-styles";
