export const contextMenuDemoCSS = `
[data-context-demo] { max-width:640px; }
section[data-context-demo] [data-scope=menu][data-part=context-trigger] { box-sizing:border-box;width:100%;display:block;justify-content:flex-start;font:inherit;text-align:start;background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground); }
section[data-context-demo] [data-context-actions][data-part] { display:inline-flex;align-items:center;justify-content:center;justify-self:start;width:auto;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;font-size:var(--lk-typography-fontsize-sm);cursor:pointer; }
[data-context-demo] [data-context-actions]:hover { background:var(--lk-color-semantic-accent); }
[data-context-demo] :is([data-context-actions],[data-part=context-trigger]):focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
`;
