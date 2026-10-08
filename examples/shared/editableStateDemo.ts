export const editableStates = [
  { label: "默认", state: "default", disabled: false },
  { label: "错误", state: "invalid", disabled: false },
  { label: "成功", state: "success", disabled: false },
  { label: "禁用", state: "default", disabled: true },
] as const;
export const editableStateStyle = {
  display: "grid",
  gap: "var(--lk-space-component-lg)",
  width: "min(100%, 560px)",
} as const;
