/** 同一份受控交互用于四端演示；原生输入负责提交、键盘和禁用语义。 */
export function createSelectionControlsDemo(notify: () => void) {
  const state = {
    size: "md" as "sm" | "md" | "lg",
    horizontal: true,
    rtl: false,
    longLabels: false,
    disabled: false,
    readOnly: false,
    reject: false,
    checked: false,
    notifications: false,
    density: "compact",
    tags: ["React", "Vue", "Solid"],
  };
  return {
    get snapshot() {
      return { ...state, tags: [...state.tags] };
    },
    toggle(
      key:
        | "horizontal"
        | "rtl"
        | "longLabels"
        | "disabled"
        | "readOnly"
        | "reject",
    ) {
      state[key] = !state[key];
      notify();
    },
    setSize(size: typeof state.size) {
      state.size = size;
      notify();
    },
    check(checked: boolean | "indeterminate") {
      if (!state.reject) state.checked = checked === true;
      notify();
    },
    switch(checked: boolean) {
      if (!state.reject) state.notifications = checked;
      notify();
    },
    tags(value: string[]) {
      if (!state.reject) state.tags = [...value];
      notify();
    },
    select(value: string | null) {
      if (!state.reject && value) state.density = value;
      notify();
    },
  };
}
export const selectionOptions = ["compact", "comfortable", "spacious"] as const;
export function selectionLabel(label: string, long: boolean) {
  return long
    ? `${label} — keep the full description readable when this preference wraps across several lines on a small screen`
    : label;
}

export const selectionControlLabels = {
  horizontal: "Horizontal layout",
  rtl: "Right-to-left",
  longLabels: "Long descriptions",
  disabled: "Disabled",
  readOnly: "Read only",
  reject: "Reject updates",
} as const;
