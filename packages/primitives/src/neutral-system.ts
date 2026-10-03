import { createPrimitive, registerPrimitive } from "./core";
import { stateMotionCSS } from "./motion";
const css = `
[data-scope][hidden] { display:none !important; }
[data-scope=field] :is([data-part=input],[data-part=select]) { height:var(--lk-control-height-md); padding-block:0; }
[data-scope=popover][data-part=close-trigger]:is(button), [data-scope][data-part=trigger]:is(button), [data-scope=menu][data-part=context-trigger]:is(button), [data-scope=timer][data-part=action-trigger], [data-scope=signature-pad][data-part=clear-trigger] { min-height:var(--lk-control-height-md); padding:0 var(--lk-space-component-compact); display:inline-flex; align-items:center; justify-content:center; border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); font:inherit; cursor:pointer; }
[data-scope][data-part=trigger]:is(button):disabled { opacity:.5; cursor:not-allowed; }
[data-scope][data-part=root] { min-width:0; max-width:100%; --lk-field-height:var(--lk-control-height-md); }
[data-scope][data-part=root][data-size=sm] { --lk-field-height:var(--lk-control-height-sm); }
[data-scope][data-part=root][data-size=lg] { --lk-field-height:var(--lk-control-height-lg); }
[data-scope] { font-size:var(--lk-typography-fontsize-md); line-height:1.5; }
[data-scope] :where(button,input,textarea,select) { font:inherit; }
[data-scope] :where(button,[role=button],[role=option],[role=tab],[role=menuitem]) { touch-action:manipulation; }
[data-scope] :where(button,input,textarea,select,[tabindex]):focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring); outline-offset:var(--lk-control-focuswidth); }
[data-scope] :where([data-disabled],[disabled]) { cursor:not-allowed; }
[data-scope] :where(input,select,textarea) { min-width:0; max-width:100%; }
[data-scope] :where([data-part=helper-text],[data-part=error-text],[data-part=description]) { overflow-wrap:anywhere; }
:is([data-scope=select],[data-scope=combobox],[data-scope=date-picker],[data-scope=number-input],[data-scope=password-input]) :is([data-part=trigger],[data-part=input],[data-part=control]) { min-height:var(--lk-control-height-md); border-radius:var(--lk-radius-md); border-color:var(--lk-color-semantic-input); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-sm); }
:is([data-scope=select],[data-scope=combobox],[data-scope=menu],[data-scope=popover],[data-scope=hover-card],[data-scope=color-picker],[data-scope=date-picker]) [data-part=content] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-popover); color:var(--lk-color-semantic-popoverforeground); box-shadow:var(--lk-shadow-popover); padding:var(--lk-space-component-md); max-width:calc(100vw - var(--lk-space-component-xl)); }
:is([data-scope=menu],[data-scope=select],[data-scope=combobox],[data-scope=listbox],[data-scope=tree-view]) :is([data-part=item],[data-part=branch-control]) { border-radius:var(--lk-radius-sm); color:var(--lk-color-semantic-foreground); padding:var(--lk-control-fieldgap) var(--lk-space-component-sm); }
:is([data-scope=menu],[data-scope=select],[data-scope=combobox],[data-scope=listbox],[data-scope=tree-view]) :is([data-part=item],[data-part=branch-control]):is([data-highlighted],[data-selected]) { background:var(--lk-color-semantic-accent); color:var(--lk-color-semantic-accentforeground); }
[data-scope=tooltip][data-part=content], [data-scope=tooltip] [data-part=content] { background:var(--lk-color-semantic-primary); color:var(--lk-color-semantic-primaryforeground); border-radius:var(--lk-radius-md); padding:var(--lk-control-fieldgap) var(--lk-space-component-compact); font-size:var(--lk-typography-fontsize-xs); box-shadow:var(--lk-shadow-tooltip); }
[data-scope=checkbox] [data-part=control], [data-scope=radio-group] [data-part=item-control] { width:var(--lk-space-component-md); height:var(--lk-space-component-md); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-primary); background:var(--lk-color-semantic-background); }
[data-scope=checkbox] [data-part=control] { border-radius:var(--lk-space-component-xs); }
[data-scope=checkbox][data-part=root], [data-scope=radio-group][data-part=item], [data-scope=switch][data-part=root] { min-height:var(--lk-control-height-xs); }
[data-scope=radio-group] [data-part=item-control] { border-radius:50%; }
[data-scope=rating-group][data-part=item] { min-width:var(--lk-control-height-xs); min-height:var(--lk-control-height-xs); }
[data-scope=collapsible][data-part=trigger]:is(button) { border:0; background:transparent; border-radius:inherit; justify-content:space-between; }
[data-scope=collapsible][data-part=content]:is([data-state=open],:not([data-state])) { height:auto; overflow:visible; }
[data-scope=color-picker][data-part=trigger] { width:auto; gap:var(--lk-space-component-sm); white-space:nowrap; }
[data-scope=color-picker][data-part=area-background] { width:100%; height:100%; }
[data-scope=color-picker][data-part=value-swatch] { display:inline-block; flex:none; width:var(--lk-control-icon-md); height:var(--lk-control-icon-md); border-radius:var(--lk-radius-sm); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=rating-group][data-part=item] svg { width:var(--lk-control-icon-lg); height:var(--lk-control-icon-lg); fill:none; stroke:var(--lk-color-semantic-mutedforeground); stroke-width:2; }
[data-scope=rating-group][data-part=item]:is([data-checked],[data-highlighted]) svg { fill:var(--lk-color-semantic-primary); stroke:var(--lk-color-semantic-primary); }
[data-scope=steps][data-part=list] { gap:var(--lk-space-component-lg); flex-wrap:wrap; }
[data-scope=steps][data-part=item] > div { display:grid; gap:var(--lk-space-component-xs); }
[data-scope=steps][data-part=item] > div > span { font-size:var(--lk-typography-fontsize-xs); color:var(--lk-color-semantic-mutedforeground); }
[data-scope=steps][data-part=trigger]:is(button) { min-height:0; height:auto; padding:0; border:0; background:transparent; color:var(--lk-color-semantic-foreground); justify-content:flex-start; font-weight:var(--lk-typography-fontweight-medium); }
[data-scope=radio-group][data-part=root][data-size] [data-scope=radio-group][data-part=item-control], [data-scope=checkbox][data-part=root][data-size] [data-scope=checkbox][data-part=control] { width:var(--lk-control-icon-md); height:var(--lk-control-icon-md); }
[data-scope=radio-group][data-part=root][data-size=sm] [data-scope=radio-group][data-part=item-control], [data-scope=checkbox][data-part=root][data-size=sm] [data-scope=checkbox][data-part=control] { width:var(--lk-control-icon-sm); height:var(--lk-control-icon-sm); }
[data-scope=radio-group][data-part=root][data-size=lg] [data-scope=radio-group][data-part=item-control], [data-scope=checkbox][data-part=root][data-size=lg] [data-scope=checkbox][data-part=control] { width:var(--lk-control-icon-lg); height:var(--lk-control-icon-lg); }
[data-scope=checkbox] [data-part=control][data-state=checked], [data-scope=radio-group] [data-part=item-control][data-state=checked] { background:var(--lk-color-semantic-primary); color:var(--lk-color-semantic-primaryforeground); }
[data-scope=switch] [data-part=control] { width:var(--lk-space-component-xl); height:var(--lk-control-icon-lg); padding:var(--lk-control-focuswidth); border:0; background:var(--lk-color-semantic-input); }
[data-scope=switch] [data-part=thumb] { width:var(--lk-typography-fontsize-md); height:var(--lk-typography-fontsize-md); background:var(--lk-color-semantic-background); box-shadow:var(--lk-shadow-sm); }
[data-scope=switch] [data-part=control][data-state=checked] { background:var(--lk-color-semantic-primary); }
[data-scope=switch] [data-part=thumb][data-state=checked] { transform:translateX(var(--lk-typography-fontsize-md)); }
[data-scope=tabs] [data-part=list], [data-scope=segment-group][data-part=root] { background:var(--lk-color-semantic-muted); border-radius:var(--lk-radius-md); padding:var(--lk-space-component-xs); gap:var(--lk-space-component-xs); border:0; }
[data-scope=tabs] [data-part=trigger]:is(button) { border:0; border-radius:var(--lk-radius-sm); background:transparent; color:var(--lk-color-semantic-mutedforeground); min-height:var(--lk-control-height-xs); padding:var(--lk-space-component-xs) var(--lk-space-component-compact); }
[data-scope=menubar] [data-scope=menu][data-part=trigger]:is(button) { border:0; background:transparent; box-shadow:none; }
[data-scope=menubar] [data-scope=menu][data-part=trigger]:is(button):hover { background:var(--lk-color-semantic-accent); }
[data-scope=splitter][data-part=resize-trigger] { border:0; padding:0; touch-action:none; }
[data-scope=scroll-area][data-part=root]:has([data-part=viewport]:not([data-overflow-x])) [data-part=scrollbar][data-orientation=horizontal], [data-scope=scroll-area][data-part=root]:has([data-part=viewport]:not([data-overflow-y])) [data-part=scrollbar][data-orientation=vertical] { display:none; }
[data-scope=tabs] [data-part=trigger][data-selected] { background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); box-shadow:var(--lk-shadow-sm); }
[data-scope=tabs] [data-part=indicator] { display:none; }
[data-scope=accordion] [data-part=item] { border:0; border-bottom:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); border-radius:0; }
[data-scope=accordion] [data-part=item-trigger] { background:transparent; padding:var(--lk-space-component-md) 0; color:var(--lk-color-semantic-foreground); font-weight:600; }
[data-scope=accordion] [data-part=item-trigger]:hover { text-decoration:underline; }
[data-scope=accordion] [data-part=item-content] { padding:0 0 var(--lk-space-component-md); color:var(--lk-color-semantic-mutedforeground); }
:is([data-scope=slider],[data-scope=progress]) [data-part=track] { background:var(--lk-color-semantic-muted); border:0; height:var(--lk-space-component-sm); border-radius:9999px; }
:is([data-scope=slider],[data-scope=progress]) [data-part=range] { background:var(--lk-color-semantic-primary); border-radius:9999px; }
[data-scope=slider][data-part=marker-group][data-orientation=horizontal] { height:calc(var(--lk-typography-fontsize-md) * 1.5 + var(--lk-space-component-sm)); }
[data-scope=slider][data-part=root][data-orientation=vertical] { display:grid; grid-template-columns:var(--lk-control-height-xs) minmax(0,1fr); width:max-content; column-gap:var(--lk-space-component-sm); }
[data-scope=slider][data-part=root][data-orientation=vertical] > :is([data-part=label],[data-part=value-text]) { grid-column:1 / -1; }
[data-scope=slider][data-part=control][data-orientation=vertical] { grid-row:3; grid-column:1; }
[data-scope=slider][data-part=marker-group][data-orientation=vertical] { grid-row:3; grid-column:2; height:160px; min-width:48px; margin:0; }
[data-scope=slider][data-part=marker][data-orientation=vertical] { flex-direction:row; }
[data-scope=slider][data-part=track][data-orientation=vertical] { flex:none; height:100%; width:var(--lk-space-component-sm); }
[data-scope=slider] [data-part=thumb] { width:var(--lk-space-component-md); height:var(--lk-space-component-md); background:var(--lk-color-semantic-background); border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-primary); box-shadow:var(--lk-shadow-sm); }
[data-scope=dialog] [data-part=positioner] { padding:var(--lk-space-component-md); }
[data-scope=dialog] [data-part=content] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); border-radius:var(--lk-radius-lg); max-height:calc(100dvh - var(--lk-space-component-xl)); overflow:auto; box-shadow:var(--lk-shadow-xl); }
[data-scope=dialog] [data-part=description] { color:var(--lk-color-semantic-mutedforeground); }
[data-scope=dialog] [data-part=close-trigger] { color:var(--lk-color-semantic-mutedforeground); }
[data-scope=dialog] [data-part=content][data-state=closed], [data-scope=dialog] [data-part=backdrop][data-state=closed] { pointer-events:none; }
[data-scope=date-picker] [data-part=table] { width:100%; border-collapse:collapse; }
[data-scope=date-picker] [data-part=table-cell-trigger] { width:var(--lk-space-component-xl); height:var(--lk-space-component-xl); padding:0; border-radius:var(--lk-radius-sm); }
[data-scope=date-picker] [data-part=table-cell-trigger][data-selected] { color:var(--lk-color-semantic-primaryforeground); background:var(--lk-color-semantic-primary); }
[data-scope=pin-input] [data-part=input] { width:var(--lk-control-height-lg); height:var(--lk-control-height-lg); padding:0; text-align:center; border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input); border-radius:var(--lk-radius-md); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); }
[data-scope=steps] [data-part=indicator][data-current], [data-scope=pagination] [data-part=item][data-selected] { background:var(--lk-color-semantic-primary); color:var(--lk-color-semantic-primaryforeground); }
[data-scope=toast][data-part=root] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); background:var(--lk-color-semantic-background); color:var(--lk-color-semantic-foreground); border-radius:var(--lk-radius-lg); box-shadow:var(--lk-shadow-popover); }
[data-scope=filter-bar] { color:var(--lk-color-semantic-foreground); }
[data-scope=filter-bar] [data-part=chip][data-active=true] { color:var(--lk-color-semantic-primaryforeground); background:var(--lk-color-semantic-primary); }
[data-scope=pagination][data-part=root] { gap:var(--lk-space-component-xs); flex-wrap:wrap; }
[data-scope=pagination][data-part=list] { gap:var(--lk-space-component-xs); flex-wrap:wrap; }
[data-scope=pagination][data-part=root] :is([data-part=item],[data-part=prev-trigger],[data-part=next-trigger]) { min-width:var(--lk-control-height-sm); height:var(--lk-field-height); min-height:0; padding:0 var(--lk-space-component-sm); font-size:var(--lk-typography-fontsize-md); border-radius:var(--lk-radius-md); }
[data-scope=pagination][data-part=root] [data-part=item] { padding:0; }
[data-scope=pagination][data-part=root] [data-part=item]:is([data-selected=true],[aria-current=page],[data-state=checked]) { background:var(--lk-color-semantic-primary); color:var(--lk-color-semantic-primaryforeground); border-color:transparent; }
[data-scope=pin-input][data-part=control], [data-scope=toggle-group][data-part=root], [data-scope=segment-group][data-part=root] { flex-wrap:wrap; max-width:100%; }
[data-scope=date-picker][data-part=control] { min-width:0; }
[data-scope=date-picker][data-part=input] { min-width:0; width:100%; }
:is([data-scope=menu],[data-scope=select],[data-scope=combobox],[data-scope=listbox]) [data-part=content] { padding:var(--lk-space-component-xs); }
[data-scope=color-picker][data-part=content], [data-scope=date-picker][data-part=content] { padding:var(--lk-space-component-sm); }
[data-scope=combobox][data-part=control] { height:var(--lk-field-height); min-height:0; padding:0 var(--lk-space-component-compact); gap:var(--lk-space-component-xs); }
[data-scope=combobox][data-part=input] { height:100%; min-height:0; padding:0; border:0; border-radius:0; box-shadow:none; background:transparent; font-size:var(--lk-typography-fontsize-md); }
[data-scope=combobox][data-part=trigger]:is(button), [data-scope=combobox][data-part=clear-trigger]:is(button) { width:var(--lk-control-height-xs); height:var(--lk-control-height-xs); min-height:0; padding:0; border:0; box-shadow:none; background:transparent; flex:none; }
[data-scope=number-input][data-part=control], [data-scope=password-input][data-part=control], [data-scope=select][data-part=trigger] { height:var(--lk-field-height); min-height:0; font-size:var(--lk-typography-fontsize-md); padding-block:0; }
[data-scope=select][data-part=control] { height:var(--lk-field-height); min-height:0; }
[data-scope=select][data-part=trigger], [data-scope=password-input][data-part=control] { padding-inline:var(--lk-space-component-compact); }
[data-scope=select][data-part=trigger]:is(button) { justify-content:space-between; }
:is([data-scope=select],[data-scope=combobox])[data-part=content] { min-width:var(--reference-width,220px); }
[data-scope=number-input][data-part=control] { grid-template-rows:minmax(0,1fr) minmax(0,1fr); }
[data-scope=number-input] :is([data-part=increment-trigger],[data-part=decrement-trigger]) { min-height:0; min-width:var(--lk-control-height-xs); padding:0 var(--lk-space-component-xs); font-size:var(--lk-typography-fontsize-xs); line-height:1; }
:is([data-scope=number-input],[data-scope=password-input]) [data-part=input] { min-height:0; height:100%; border:0; box-shadow:none; background:transparent; padding-block:0; }
@media(max-width:480px) { [data-scope=filter-bar][data-part=root] { flex-wrap:wrap; } [data-scope=filter-bar] [data-part=search] { min-width:0; width:100%; } }
`;
export const neutralSystem = createPrimitive(
  {
    name: "neutral-system",
    tokens: [
      "color.semantic.background",
      "color.semantic.foreground",
      "control.height.md",
      "radius.md",
    ],
    defaults: {},
  },
  (theme) => theme.mountStyles("neutral-system", css + stateMotionCSS),
);
registerPrimitive(neutralSystem);
