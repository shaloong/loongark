export const adornmentSizes = ["sm", "md", "lg"] as const;
export const adornmentControls = [
  ["disabled", "Disabled"],
  ["readOnly", "Read only"],
  ["invalid", "Invalid"],
  ["rtl", "Right-to-left"],
  ["long", "Long labels"],
  ["inspect", "View instead of clear"],
  ["override", "Enable suffix explicitly"],
] as const;
export function createInputAdornmentDemo(notify: () => void) {
  const flags = {
    disabled: false,
    readOnly: false,
    invalid: false,
    rtl: false,
    long: false,
    inspect: false,
    override: false,
  };
  const values = { sm: "LoongArk", md: "LoongArk", lg: "LoongArk" };
  let inspected = "";
  return {
    activate(size: keyof typeof values) {
      if (flags.inspect) inspected = values[size];
      else values[size] = "";
      notify();
    },
    get snapshot() {
      return { ...flags, inspected, values: { ...values } };
    },
    toggle(key: keyof typeof flags) {
      flags[key] = !flags[key];
      notify();
    },
    update(size: keyof typeof values, value: string) {
      values[size] = value;
      notify();
    },
  };
}
export function adornmentLabel(size: string, long: boolean) {
  return long
    ? `Search ${size} — keep the full label readable in a narrow form`
    : `Search ${size}`;
}
export const adornmentCSS = `
[data-input-adornments] { display:grid;gap:var(--lk-space-component-lg);width:min(100%,640px);min-width:0; }
[data-input-adornments] [data-demo-controls] { display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm); }
[data-input-adornments] [data-demo-fields] { display:grid;gap:var(--lk-space-component-lg); }
[data-input-adornments] [data-part=label] { overflow-wrap:anywhere; }
`;
