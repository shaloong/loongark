import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "invalid" | "success";
export interface InputPrimitiveProps {
  size?: InputSize;
  state?: InputState;
  disabled?: boolean;
  readOnly?: boolean;
  multiline?: boolean;
}

const root = '[data-scope="input"][data-part="root"]';
const control = '[data-scope="input"][data-part="control"]';
const group = '[data-scope="input"][data-part="group"]';
const label = '[data-scope="input"][data-part="label"]';
const helper = '[data-scope="input"][data-part="helper-text"]';
const css = `
${root} { display:grid; width:100%; min-width:0; gap:var(--lk-control-fieldgap); padding:0; border:0; background:transparent; color:var(--lk-color-semantic-foreground); --lk-field-height:var(--lk-control-height-md); }
${root}[data-size=sm] { --lk-field-height:var(--lk-control-height-sm); }
${root}[data-size=lg] { --lk-field-height:var(--lk-control-height-lg); }
${control}, ${group} { width:100%; min-width:0; height:var(--lk-field-height,var(--lk-control-height-md)); padding:0 var(--lk-space-component-compact); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-sm); font:inherit; font-size:var(--lk-typography-fontsize-md); line-height:var(--lk-typography-lineheight-base); transition:border-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), box-shadow var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
${control}[data-size=sm] { height:var(--lk-control-height-sm); }
${control}[data-size=lg] { height:var(--lk-control-height-lg); }
${control}::placeholder { color:var(--lk-color-semantic-mutedforeground); opacity:1; }
${control}:hover:not(:disabled), ${group}:hover:not(:has(${control}:disabled)) { border-color:var(--lk-color-border-hover); }
${control}:focus-visible, ${group}:focus-within { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring); outline-offset:var(--lk-control-focuswidth); }
${group} { display:flex; align-items:center; gap:var(--lk-space-component-sm); }
${group} ${control} { height:100%; flex:1; border:0; padding:0; background:transparent; box-shadow:none; }
${group} ${control}:focus-visible { outline:none; }
${group}:has(${control}:disabled) { opacity:.5;cursor:not-allowed; }
${group} ${control}:disabled { opacity:1; }
${group}:has(${control}[readonly]) { background:var(--lk-color-semantic-muted); }
${root} :is([data-part=prefix],[data-part=suffix]) { display:inline-flex; align-items:center; flex:none; color:var(--lk-color-semantic-mutedforeground); font:inherit; }
${root} button[data-part=suffix] { align-self:stretch;min-width:var(--lk-control-height-sm);border:0;padding:0 var(--lk-space-component-xs);background:transparent;cursor:pointer; }
${group} button[data-part=suffix] { margin-inline-end:calc(-1 * var(--lk-space-component-compact));border-start-end-radius:var(--lk-radius-md);border-end-end-radius:var(--lk-radius-md); }
${root} button[data-part=suffix]:hover:not(:disabled) { background:var(--lk-color-semantic-accent);color:var(--lk-color-semantic-foreground); }
${root} button[data-part=suffix]:focus-visible { outline-offset:calc(-1 * var(--lk-control-focuswidth)); }
${root} button[data-part=suffix]:disabled { cursor:not-allowed; }
textarea${control}, ${control}[data-multiline=true] { height:auto; min-height:calc(var(--lk-field-height,var(--lk-control-height-md)) * 2); padding-block:var(--lk-space-component-sm); resize:vertical; }
${label} { width:fit-content; margin:0; color:var(--lk-color-semantic-foreground); font-size:var(--lk-typography-fontsize-sm); font-weight:var(--lk-typography-fontweight-medium); line-height:var(--lk-typography-lineheight-base); }
${helper} { margin:0; color:var(--lk-color-semantic-mutedforeground); font-size:var(--lk-typography-fontsize-xs); line-height:var(--lk-typography-lineheight-base); overflow-wrap:anywhere; }
${helper}[data-variant=error] { color:var(--lk-color-semantic-destructive); }
${helper}[data-variant=success] { color:var(--lk-color-semantic-success); }
${control}:disabled, ${root}[data-disabled=true] ${control} { opacity:.5; cursor:not-allowed; }
${control}[readonly] { background:var(--lk-color-semantic-muted); cursor:default; }
${root}[data-state=invalid] :is(${control},${group}), ${control}:is([aria-invalid=true],[data-state=invalid]) { border-color:var(--lk-color-semantic-destructive); }
${root}[data-state=invalid] :is(${control},${group}), ${control}[aria-invalid=true] { outline-color:var(--lk-color-semantic-destructive); }
${root}[data-state=success] :is(${control},${group}), ${control}[data-state=success] { border-color:var(--lk-color-semantic-success); }
${root}[data-variant=floating] { position:relative; }
${root}[data-variant=floating] ${label} { position:absolute; inset-inline-start:var(--lk-space-component-sm); top:calc(var(--lk-field-height) / 2); transform:translateY(-50%); transform-origin:left center; pointer-events:none; padding:0 var(--lk-space-component-xs); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-mutedforeground); transition:transform var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
${root}[data-variant=floating]:is(:focus-within,[data-has-value=true]) ${label} { transform:translateY(calc(-50% - var(--lk-field-height) / 2)) scale(.85); color:var(--lk-color-semantic-foreground); }
${root}[data-variant=floating][data-state=invalid] ${label} { color:var(--lk-color-semantic-destructive); }
`;
const contract: PrimitiveContract<InputPrimitiveProps> = {
  name: "input",
  tokens: [
    "color.semantic.background",
    "color.semantic.foreground",
    "color.semantic.input",
    "color.semantic.ring",
    "color.semantic.destructive",
    "color.semantic.success",
    "control.height.md",
    "control.fieldGap",
    "space.component.compact",
    "space.component.sm",
    "radius.md",
    "motion.duration.fast",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
    state: "default",
    disabled: false,
    readOnly: false,
    multiline: false,
  },
};
export const inputPrimitive = createPrimitive<InputPrimitiveProps>(
  contract,
  (theme) => theme.mountStyles(`input-${theme.mode}`, css),
);
registerPrimitive(inputPrimitive);
