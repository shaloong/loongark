export const conversationCSS = `
[data-scope=attachment][data-part=root] { display:flex;align-items:center;gap:var(--lk-space-component-compact);padding:var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);min-width:0; }
[data-scope=attachment][data-part=icon] { display:grid;place-items:center;flex:none;width:var(--lk-control-height-lg);height:var(--lk-control-height-lg);border-radius:var(--lk-radius-sm);background:var(--lk-color-semantic-muted);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=attachment][data-part=icon] svg { width:var(--lk-control-icon-lg);height:var(--lk-control-icon-lg); }
[data-scope=attachment][data-part=content] { flex:1;min-width:0;display:grid;gap:var(--lk-space-component-xs); }
[data-scope=attachment][data-part=name] { font-weight:var(--lk-typography-fontweight-medium);overflow-wrap:anywhere;color:inherit; }
[data-scope=attachment][data-part=description] { font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=attachment][data-part=progress] { width:100%;height:var(--lk-space-component-sm);accent-color:var(--lk-color-semantic-primary); }
[data-scope=attachment][data-status=error] { border-color:var(--lk-color-semantic-destructive); }
:is([data-scope=attachment],[data-scope=message])[data-part=actions] { display:flex;flex-wrap:wrap;align-items:center;gap:var(--lk-space-component-sm); }
:is([data-scope=attachment],[data-scope=message])[data-part=action]:is(button) { min-width:0;max-width:100%;overflow-wrap:anywhere;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-sm);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit;font-size:var(--lk-typography-fontsize-sm);cursor:pointer; }
:is([data-scope=attachment],[data-scope=message])[data-part=action]:hover:not(:disabled) { background:var(--lk-color-semantic-accent); }
[data-scope=attachment][data-disabled=true] { color:var(--lk-color-semantic-mutedforeground); }
[data-scope=attachment] button:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=bubble][data-part=root] { max-width:100%;min-width:0;padding:var(--lk-space-component-compact) var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);background:var(--lk-color-semantic-card);color:var(--lk-color-semantic-cardforeground);overflow-wrap:anywhere;white-space:pre-wrap;line-height:var(--lk-typography-lineheight-base); }
[data-scope=bubble][data-side=outgoing] { background:var(--lk-color-semantic-muted);color:var(--lk-color-semantic-foreground); }
[data-scope=message][data-part=root] { display:flex;flex-direction:column;align-items:flex-start;gap:var(--lk-space-component-xs);min-width:0; }
[data-scope=message][data-side=outgoing] { align-items:flex-end; }
[data-scope=message][data-part=content] { max-width:85%;min-width:0; }
[data-scope=message][data-part=meta] { display:flex;align-items:center;flex-wrap:wrap;gap:var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=message][data-part=author] { font-weight:var(--lk-typography-fontweight-medium);color:var(--lk-color-semantic-foreground); }
[data-scope=message][data-status=error] [data-part=status] { color:var(--lk-color-semantic-destructive); }
[data-scope=attachment][data-part=actions]:not(:has(button)) { display:none; }
@media (max-width:480px) { [data-scope=attachment][data-part=root] { flex-wrap:wrap; } [data-scope=attachment][data-part=actions]:has(button:nth-child(2)) { flex-basis:100%;justify-content:flex-end; } [data-scope=message][data-part=content] { max-width:95%; } }
:is([data-scope=attachment],[data-scope=message])[data-part=action-feedback] { font-size:var(--lk-typography-fontsize-sm);line-height:var(--lk-typography-lineheight-base);color:var(--lk-color-semantic-mutedforeground);overflow-wrap:anywhere; }
:is([data-scope=attachment],[data-scope=message])[data-part=action-feedback][data-outcome=error] { color:var(--lk-color-semantic-destructive); }
[data-scope=attachment][data-part=root]:has([data-part=action-feedback]) { flex-wrap:wrap; }
[data-scope=attachment][data-part=action-feedback] { flex-basis:100%; }
[data-scope=message] button:disabled { opacity:.5;cursor:not-allowed; }
`;
