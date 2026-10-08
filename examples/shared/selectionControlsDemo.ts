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
    fieldRequired: false,
    fieldInvalid: false,
    overrideField: false,
    submitted: {} as Record<string, FormDataEntryValue>,
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
        | "reject"
        | "fieldRequired"
        | "fieldInvalid"
        | "overrideField",
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
    submit(form: HTMLFormElement) {
      const submitted: Record<string, FormDataEntryValue> = {};
      new FormData(form).forEach((value, name) => {
        submitted[name] = value;
      });
      state.submitted = submitted;
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

export const selectionFieldControls = {
  fieldRequired: "Required",
  fieldInvalid: "Invalid",
  overrideField: "Override Field state",
} as const;
export const selectionFieldText = {
  checkbox: {
    hint: "Accept updates to these preferences.",
    error: "Review the agreement.",
  },
  switch: {
    hint: "Choose whether to receive notifications.",
    error: "Review notifications.",
  },
  "radio-group": {
    hint: "Choose how much detail is shown.",
    error: "Choose a valid density.",
  },
  "tags-input": {
    hint: "Enter a framework and press Enter.",
    error: "Review the frameworks.",
  },
} as const;
export type SelectionFieldKind = keyof typeof selectionFieldText;
export function selectionOwnFlags(
  state: { disabled: boolean; readOnly: boolean; overrideField: boolean },
  field: boolean,
) {
  return field
    ? state.overrideField
      ? { disabled: false, readOnly: false, required: false, invalid: false }
      : {}
    : { disabled: state.disabled, readOnly: state.readOnly };
}

/** 单选组遵循 Ark 的 Fieldset 契约；只读与必填由组自身声明。 */
export function selectionOwnRadioFlags(
  state: {
    disabled: boolean;
    readOnly: boolean;
    overrideField: boolean;
    fieldRequired: boolean;
  },
  field: boolean,
) {
  return {
    ...selectionOwnFlags(state, field),
    ...(field
      ? {
          readOnly: state.overrideField ? false : state.readOnly,
          required: state.overrideField ? false : state.fieldRequired,
        }
      : {}),
  };
}
