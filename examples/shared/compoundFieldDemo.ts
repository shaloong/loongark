/** 四端共用的表单演示状态；原生输入及 Ark 管理校验、reset 与焦点。 */
export function createCompoundFieldDemo(notify: () => void) {
  const state = {
    disabled: false,
    readOnly: false,
    invalid: false,
    required: true,
    reject: false,
    long: false,
    rtl: false,
    quantity: "3",
    ownQuantity: "3",
    submitted: "",
  };
  return {
    get snapshot() {
      return { ...state };
    },
    toggle(key: CompoundFieldToggle) {
      state[key] = !state[key];
      notify();
    },
    quantity(own: boolean, value: string) {
      if (!state.reject) state[own ? "ownQuantity" : "quantity"] = value;
      notify();
    },
    submit(form: HTMLFormElement) {
      const names: string[] = [];
      new FormData(form).forEach((_, name) => names.push(name));
      state.submitted = names.join(", ");
      notify();
    },
  };
}
export type CompoundFieldToggle =
  "disabled" | "readOnly" | "invalid" | "required" | "reject" | "long" | "rtl";
export const compoundFieldControls: Array<[CompoundFieldToggle, string]> = [
  ["disabled", "Disabled"],
  ["readOnly", "Read only"],
  ["invalid", "Invalid"],
  ["required", "Required"],
  ["reject", "Reject numeric updates"],
  ["long", "Long descriptions"],
  ["rtl", "Right-to-left"],
];
export const compoundOwnFlags = {
  disabled: false,
  readOnly: false,
  required: false,
  invalid: false,
};
export function compoundFieldLabel(
  kind: "quantity" | "password",
  own: boolean,
  long: boolean,
) {
  const label =
    (own ? "Independent " : "") +
    (kind === "quantity" ? "quantity" : "password");
  const text = label[0].toUpperCase() + label.slice(1);
  return long
    ? `${text} — keep the complete label readable when the form becomes narrow`
    : text;
}
export const compoundFieldCSS = `
[data-compound-field-demo] { display:grid; gap:var(--lk-space-component-lg); width:min(100%,640px); min-width:0; }
[data-compound-field-demo] h2,[data-compound-field-demo] h3,[data-compound-field-demo] p { margin:0; }
[data-compound-field-demo] h2 { font-size:var(--lk-typography-fontsize-lg); }
[data-compound-field-demo] h3 { font-size:var(--lk-typography-fontsize-md); }
[data-compound-field-demo] header,[data-compound-field-demo] section { display:grid; gap:var(--lk-space-component-md); min-width:0; align-content:start; }
[data-compound-field-demo] p { color:var(--lk-color-semantic-foreground);opacity:0.75; font-size:var(--lk-typography-fontsize-sm); }
[data-compound-field-demo] [data-demo-controls] { display:flex;flex-wrap:wrap;gap:var(--lk-space-component-sm); }
[data-compound-field-demo] [data-demo-grid] { display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:var(--lk-space-component-lg); }
[data-compound-field-demo] :is([data-scope=number-input],[data-scope=password-input])[data-part=root] { width:100%;min-width:0; }
[data-compound-field-demo] [data-part=label],[data-compound-field-demo] output { overflow-wrap:anywhere;min-width:0; }
@media(min-width:481px) {
  [data-compound-field-demo] [data-demo-grid] { grid-template-rows:repeat(9,auto);row-gap:var(--lk-space-component-xs); }
  [data-compound-field-demo] [data-demo-grid] > section { grid-row:span 9;grid-template-rows:subgrid;row-gap:inherit; }
  [data-compound-field-demo] [data-demo-grid] > section > h3 { margin-block-end:var(--lk-space-component-sm); }
  [data-compound-field-demo] [data-demo-grid] [data-scope=field][data-part=root] { grid-row:span 4;grid-template-rows:subgrid;row-gap:inherit; }
}
@media(max-width:480px) { [data-compound-field-demo] [data-demo-grid] { grid-template-columns:minmax(0,1fr); } }
`;
