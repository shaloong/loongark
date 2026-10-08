import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";

export type ButtonVariant =
  | "solid"
  | "default"
  | "outline"
  | "ghost"
  | "secondary"
  | "destructive"
  | "link";
export type ButtonSize =
  "sm" | "md" | "lg" | "xs" | "icon" | "icon-xs" | "icon-sm" | "icon-lg";
export interface ButtonPrimitiveProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  block?: boolean;
  loading?: boolean;
  disabled?: boolean;
}

const root = '[data-scope="button"][data-part="root"]';
const interactive =
  ":not(:disabled):not([aria-disabled=true]):not([data-loading=true])";
const css = `
${root} {
  --lk-button-height:var(--lk-control-height-md);
  appearance:none; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0;
  height:auto; min-height:var(--lk-button-height); max-width:100%; box-sizing:border-box; gap:var(--lk-space-component-sm);
  padding:max(0px,calc((var(--lk-button-height) - 1lh) / 2 - var(--lk-control-borderwidth))) var(--lk-space-component-md); border:var(--lk-control-borderwidth) solid transparent;
  border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-primary); color:var(--lk-color-semantic-primaryforeground);
  font:inherit; font-size:var(--lk-typography-fontsize-sm); font-weight:var(--lk-typography-fontweight-medium);
  line-height:var(--lk-typography-lineheight-base); white-space:normal; overflow-wrap:anywhere; text-decoration:none; cursor:pointer;
  transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), border-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard), box-shadow var(--lk-motion-duration-fast) var(--lk-motion-easing-standard);
}
${root}[data-block=true] { width:100%; }
${root}[data-size=xs], ${root}[data-size=icon-xs] { --lk-button-height:var(--lk-control-height-xs); padding-inline:var(--lk-space-component-sm); }
${root}[data-size=sm], ${root}[data-size=icon-sm] { --lk-button-height:var(--lk-control-height-sm); padding-inline:var(--lk-space-component-sm); }
${root}[data-size=lg], ${root}[data-size=icon-lg] { --lk-button-height:var(--lk-control-height-lg); padding-inline:var(--lk-space-component-lg); }
${root}[data-size^=icon] { width:var(--lk-button-height); padding:0; }
${root} svg { width:var(--lk-control-icon-md); height:var(--lk-control-icon-md); flex-shrink:0; pointer-events:none; }
${root}[data-variant=outline] { border-color:var(--lk-color-semantic-input); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-sm); }
${root}[data-variant=secondary] { background:var(--lk-color-semantic-secondary); color:var(--lk-color-semantic-secondaryforeground); }
${root}[data-variant=ghost], ${root}[data-variant=link] { background:transparent; color:var(--lk-color-semantic-foreground); }
${root}[data-variant=destructive] { background:var(--lk-color-semantic-destructive); color:var(--lk-color-semantic-destructiveforeground); }
${root}[data-variant=link] { padding-inline:0; text-underline-offset:var(--lk-space-component-xs); }
${root}${interactive}:is(:not([data-variant]),[data-variant=solid],[data-variant=default]):hover { background:color-mix(in srgb,var(--lk-color-semantic-primary) 90%,var(--lk-color-semantic-primaryforeground)); }
${root}${interactive}:is([data-variant=outline],[data-variant=secondary],[data-variant=ghost]):hover { background:var(--lk-color-semantic-accent); color:var(--lk-color-semantic-accentforeground); }
${root}${interactive}[data-variant=destructive]:hover { background:color-mix(in srgb,var(--lk-color-semantic-destructive) 90%,var(--lk-color-semantic-destructiveforeground)); }
${root}${interactive}[data-variant=link]:hover { text-decoration:underline; }
${root}:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring); outline-offset:var(--lk-control-focuswidth); }
${root}:disabled, ${root}[aria-disabled=true] { opacity:.5; cursor:not-allowed; }
${root}[data-loading=true] { cursor:progress; }
`;
const contract: PrimitiveContract<ButtonPrimitiveProps> = {
  name: "button",
  tokens: [
    "color.semantic.primary",
    "color.semantic.primaryForeground",
    "color.semantic.input",
    "color.semantic.ring",
    "control.height.md",
    "control.height.sm",
    "control.height.lg",
    "control.height.xs",
    "space.component.md",
    "space.component.sm",
    "radius.md",
    "motion.duration.fast",
    "motion.easing.standard",
  ],
  defaults: {
    variant: "solid",
    size: "md",
    block: false,
    loading: false,
    disabled: false,
  },
};
export const buttonPrimitive = createPrimitive<ButtonPrimitiveProps>(
  contract,
  (theme) => theme.mountStyles(`button-${theme.mode}`, css),
);
registerPrimitive(buttonPrimitive);
