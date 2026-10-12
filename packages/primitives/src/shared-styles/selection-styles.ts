export const selectionInputsCSS = `
[data-lk-autosize-toggle] { display:flex;align-items:center;gap:var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-sm); }
[data-lk-autosize-toggle] input { width:var(--lk-control-icon-md);height:var(--lk-control-icon-md);margin:0;accent-color:var(--lk-color-semantic-primary); }
[data-scope=textarea][data-autosize=true] { min-height:0;resize:none; }
[data-scope=transfer-list][data-part=root] { display:grid;grid-template-columns:minmax(0,1fr) auto minmax(0,1fr);gap:var(--lk-space-component-md);align-items:center;width:100%;min-width:0; }
[data-scope=transfer-list][data-part=panel] { min-inline-size:0;margin:0;padding:var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground); }
[data-scope=transfer-list][data-part=legend] { padding-inline:var(--lk-space-component-xs);font-size:var(--lk-typography-fontsize-md);font-weight:600; }
[data-scope=transfer-list][data-part=toolbar] { display:flex;justify-content:space-between;align-items:center;gap:var(--lk-space-component-sm);margin-bottom:var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-xs);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=transfer-list][data-part=select-all] { padding:var(--lk-space-component-xs);background:transparent;border:0;border-radius:var(--lk-radius-sm);font:inherit;color:var(--lk-color-semantic-foreground);cursor:pointer;text-decoration:underline;text-underline-offset:var(--lk-control-focuswidth); }
[data-scope=transfer-list][data-part=list] { list-style:none;margin:0;padding:0;min-height:calc(var(--lk-control-height-lg)*4);max-height:calc(var(--lk-control-height-lg)*7);overflow-y:auto; }
[data-scope=transfer-list][data-part=item] { display:flex;align-items:center;gap:var(--lk-space-component-sm);padding:var(--lk-space-component-sm);min-height:var(--lk-control-height-lg);border-radius:var(--lk-radius-md);cursor:pointer;transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
[data-scope=transfer-list][data-part=item]:is(:hover,[data-selected=true]) { background:var(--lk-color-semantic-accent); }
[data-scope=transfer-list][data-part=item][data-disabled=true] { opacity:.5;cursor:not-allowed; }
[data-scope=transfer-list] input[type=checkbox] { width:var(--lk-control-icon-md);height:var(--lk-control-icon-md);margin:0;flex:none;accent-color:var(--lk-color-semantic-primary); }
[data-scope=transfer-list][data-part=item-text] { display:grid;gap:var(--lk-space-component-xs);min-width:0;overflow-wrap:anywhere; }
[data-scope=transfer-list][data-part=description] { color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-xs); }
[data-scope=transfer-list][data-part=actions] { display:flex;flex-direction:column;gap:var(--lk-space-component-sm); }
:is([data-scope=transfer-list][data-part=move],[data-scope=time-picker][data-part=control] [data-part=trigger]) { display:inline-flex;align-items:center;justify-content:center;flex:none;min-width:var(--lk-control-height-lg);height:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;cursor:pointer;transition:background-color var(--lk-motion-duration-fast) var(--lk-motion-easing-standard); }
:is([data-scope=transfer-list][data-part=move],[data-scope=time-picker][data-part=control] [data-part=trigger]):hover { background:var(--lk-color-semantic-accent); }
[data-scope=transfer-list] button:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=transfer-list][data-part=empty] { color:var(--lk-color-semantic-mutedforeground);padding:var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-sm); }
[data-scope=transfer-list][data-part=status] { grid-column:1/-1;min-height:var(--lk-space-component-md);font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=time-picker][data-part=root] { display:grid;gap:var(--lk-space-component-sm);min-width:0;max-width:100%; }
[data-scope=time-picker][data-part=label] { font-size:var(--lk-typography-fontsize-sm);font-weight:500; }
[data-scope=time-picker][data-part=control] { display:flex;gap:var(--lk-space-component-sm);align-items:center;min-width:0; }
[data-scope=time-picker][data-part=input] { min-width:0;width:100%;height:var(--lk-control-height-md);padding:var(--lk-space-component-sm) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;font-size:var(--lk-typography-fontsize-md); }
[data-scope=time-picker][data-part=input]::-webkit-calendar-picker-indicator { display:none; }
[data-scope=time-picker][data-part=input][aria-invalid=true] { border-color:var(--lk-color-semantic-destructive); }
[data-scope=time-picker][data-part=input]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=time-picker][data-part=preview] { color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm);min-height:var(--lk-space-component-md); }
[data-scope=time-picker][data-part=error] { margin:0;color:var(--lk-color-semantic-destructive);font-size:var(--lk-typography-fontsize-sm); }
[data-scope=time-picker][data-part=panel] { display:grid;gap:var(--lk-space-component-md);min-width:min(240px,calc(100vw - 32px)); }
[data-scope=time-picker][data-part=segments] { display:grid;grid-template-columns:1fr 1fr;gap:var(--lk-space-component-sm); }
[data-scope=time-picker][data-part=segment] { display:grid;gap:var(--lk-space-component-xs);font-size:var(--lk-typography-fontsize-sm); }
[data-scope=time-picker] select { width:100%;min-width:0;height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit; }
@media(max-width:560px) { [data-scope=transfer-list][data-part=root] { grid-template-columns:minmax(0,1fr); } [data-scope=transfer-list][data-part=actions] { flex-direction:row;justify-content:center; } [data-scope=transfer-list][data-part=move] span { transform:rotate(90deg); } }
`;
