export const messageScrollerCSS = `
[data-scope=message-scroller][data-part=content][data-virtualized=true] { display:block;gap:0;padding:0; }
[data-scope=message-scroller] [data-part=virtual-item] { padding:var(--lk-space-component-sm) var(--lk-space-component-md); }
[data-scope=message-scroller] [data-part=virtual-spacer] { pointer-events:none; }

[data-scope=message-scroller][data-part=root] { position:relative;min-width:0; }
[data-scope=message-scroller][data-part=viewport] { height:calc(var(--lk-control-height-lg) * 8);overflow:auto;overscroll-behavior:contain;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-background); }
[data-scope=message-scroller][data-part=content] { display:flex;flex-direction:column;gap:var(--lk-space-component-md);padding:var(--lk-space-component-md); }
[data-scope=message-scroller][data-part=jump]:is(button) { position:absolute;bottom:var(--lk-space-component-sm);left:50%;transform:translateX(-50%);max-width:90%;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-pill);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);box-shadow:var(--lk-shadow-sm);font:inherit;font-size:var(--lk-typography-fontsize-sm);cursor:pointer; }
[data-scope=message-scroller][data-part=jump][hidden] { display:none; }
`;
