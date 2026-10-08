import { createPrimitive, registerPrimitive } from "./core";

const css = `
@media(forced-colors:active) { [data-scope=editor] [data-part=surface]:focus-within { outline:var(--lk-control-focuswidth) solid Highlight;outline-offset:var(--lk-control-focuswidth); } }
[data-scope=editor] { --lk-editor-rows:6;min-width:0;max-width:100%;color:var(--lk-color-semantic-foreground);font-family:var(--lk-typography-fontfamily-body);font-size:var(--lk-typography-fontsize-sm);line-height:var(--lk-typography-lineheight-base); }
[data-scope=editor] [data-part=label] { margin-bottom:var(--lk-space-component-sm);font-weight:var(--lk-typography-fontweight-medium);overflow-wrap:anywhere; }
[data-scope=editor] [data-part=toolbar] { display:flex;flex-wrap:wrap;align-items:center;gap:var(--lk-space-component-xs);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-bottom:0;border-radius:var(--lk-radius-lg) var(--lk-radius-lg) 0 0;background:var(--lk-color-semantic-muted); }
[data-scope=editor] button { display:inline-flex;justify-content:center;align-items:center;gap:var(--lk-space-component-sm);min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid transparent;border-radius:var(--lk-radius-md);background:transparent;color:inherit;font:inherit;cursor:pointer;text-align:start; }
[data-scope=editor] [data-part=toolbar] button { width:var(--lk-control-height-md);flex-shrink:0; }
[data-scope=editor] button svg { width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm);flex-shrink:0; }
[data-scope=editor] button:hover:not(:disabled) { background:var(--lk-color-semantic-accent); }
[data-scope=editor] button[aria-pressed=true] { background:var(--lk-color-semantic-background);border-color:var(--lk-color-semantic-border); }
[data-scope=editor] button:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=editor] button:focus-visible,[data-scope=editor] summary:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
[data-scope=editor] [data-part=surface] { position:relative;min-width:0;overflow:hidden;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:0 0 var(--lk-radius-lg) var(--lk-radius-lg);background:var(--lk-color-semantic-background); }
[data-scope=editor] [data-part=surface]:focus-within { border-color:var(--lk-color-semantic-ring);box-shadow:0 0 0 var(--lk-control-focuswidth) var(--lk-color-semantic-ring); }
[data-scope=editor][data-invalid=true] [data-part=surface] { border-color:var(--lk-color-semantic-destructive); }
[data-scope=editor][data-disabled=true] [data-part=surface] { opacity:.5; }
[data-scope=editor] [data-part=description],[data-scope=editor] [data-part=keyboard-hint],[data-scope=editor] [data-part=status],[data-scope=editor] [data-part=error] { margin:var(--lk-space-component-sm) 0 0;overflow-wrap:anywhere;font-size:var(--lk-typography-fontsize-xs); }
[data-scope=editor] [data-part=description],[data-scope=editor] [data-part=keyboard-hint] { color:var(--lk-color-semantic-mutedforeground); }
[data-scope=editor] [data-part=error],[data-scope=editor] [data-part=link-error] { color:var(--lk-color-semantic-destructive); }
[data-scope=editor] [hidden] { display:none; }
[data-scope=editor][data-mounted=true] [data-part=fallback] { display:none; }
[data-scope=editor][data-mounted=true] textarea[data-part=form-value], [data-scope=editor][data-kind=rich] textarea[data-part=form-value] { position:absolute;inline-size:1px;block-size:1px;padding:0;border:0;overflow:hidden;clip-path:inset(50%);white-space:nowrap; }
[data-scope=editor] textarea[data-part=form-value] { display:block;box-sizing:border-box;inline-size:100%;min-block-size:calc(var(--lk-editor-rows,6)*1.5em);resize:vertical;padding:var(--lk-space-component-md);border:0;background:transparent;color:inherit;font:inherit;font-family:var(--lk-typography-fontfamily-mono); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) { min-height:calc(var(--lk-editor-rows,6)*1.5em);padding:var(--lk-space-component-md);outline:none;overflow-wrap:anywhere; }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) > :first-child { margin-top:0; }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) > :last-child { margin-bottom:0; }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) p { margin:0 0 var(--lk-space-component-sm); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) :is(h1,h2,h3,h4,h5,h6) { margin:var(--lk-space-component-lg) 0 var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-lg);line-height:var(--lk-typography-lineheight-tight); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) :is(ul,ol) { padding-inline-start:var(--lk-space-component-xl); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) blockquote { margin-inline:0;padding-inline-start:var(--lk-space-component-md);border-inline-start:var(--lk-control-focuswidth) solid var(--lk-color-semantic-border); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) a { color:inherit;text-decoration:underline;text-underline-offset:var(--lk-space-component-xs); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) :is(code,pre) { font-family:var(--lk-typography-fontfamily-mono);background:var(--lk-color-semantic-muted);border-radius:var(--lk-radius-sm); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) pre { padding:var(--lk-space-component-sm);overflow:auto;white-space:pre-wrap; }
[data-scope=editor] .ProseMirror { white-space:pre-wrap;word-wrap:break-word; }
[data-scope=editor] .ProseMirror :is(table) { border-collapse:collapse;table-layout:fixed;width:100%;overflow:hidden; }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) :is(td,th) { position:relative;vertical-align:top;box-sizing:border-box;min-width:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=editor] :is(.ProseMirror,[data-part=fallback]) th { background:var(--lk-color-semantic-muted);text-align:start;font-weight:var(--lk-typography-fontweight-medium); }
[data-scope=editor] .tableWrapper { overflow-x:auto; }
[data-scope=editor] .selectedCell::after { content:"";position:absolute;inset:0;background:var(--lk-color-semantic-accent);opacity:.5;pointer-events:none; }
[data-scope=editor] .column-resize-handle { position:absolute;inset-block:0;inset-inline-end:calc(-1*var(--lk-control-focuswidth));width:var(--lk-control-focuswidth);background:var(--lk-color-semantic-ring);pointer-events:none; }
[data-scope=editor] .resize-cursor { cursor:col-resize; }
[data-scope=editor] [data-part=table-tools] { border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-bottom:0;padding:var(--lk-space-component-sm); }
[data-scope=editor] [data-part=table-tools] > summary { display:flex;align-items:center;gap:var(--lk-space-component-sm);list-style:none;cursor:pointer;color:var(--lk-color-semantic-mutedforeground); }
[data-scope=editor] [data-part=table-tools] > summary::-webkit-details-marker { display:none; }
[data-scope=editor] [data-part=table-tools] > summary svg { display:block;flex:none;width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm); }
[data-scope=editor] [data-part=table-tools] > summary:dir(rtl) svg { transform:rotate(180deg); }
[data-scope=editor] [data-part=table-tools][open] > summary svg { transform:rotate(90deg); }
[data-scope=editor] [data-part=table-toolbar] { display:flex;flex-wrap:wrap;gap:var(--lk-space-component-xs);padding-block-start:var(--lk-space-component-sm); }
[data-scope=editor] [data-part=table-toolbar] button { min-width:0;max-width:100%;font-size:var(--lk-typography-fontsize-xs); }
[data-scope=editor] [data-part=link-editor] { min-width:0;margin:0;padding:var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-bottom:0; }
[data-scope=editor] [data-part=link-editor] legend { padding-inline:var(--lk-space-component-xs); }
[data-scope=editor] [data-part=link-url] { display:block;box-sizing:border-box;width:100%;min-height:var(--lk-control-height-md);margin-block-start:var(--lk-space-component-xs);padding:var(--lk-space-component-xs) var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:inherit;font:inherit; }
[data-scope=editor] [data-part=link-actions] { display:flex;flex-wrap:wrap;gap:var(--lk-space-component-xs);margin-block-start:var(--lk-space-component-sm); }
[data-scope=editor] .cm-editor { color:var(--lk-color-semantic-foreground);background:var(--lk-color-semantic-background); }
[data-scope=editor] .cm-editor.cm-focused { outline:none; }
[data-scope=editor] .cm-scroller { overflow:auto;font-family:var(--lk-typography-fontfamily-mono);line-height:var(--lk-typography-lineheight-base);min-height:calc(var(--lk-editor-rows,6)*1.5em); }
[data-scope=editor] .cm-content { padding-block:var(--lk-space-component-sm);caret-color:var(--lk-color-semantic-foreground); }
[data-scope=editor] .cm-line { padding-inline:var(--lk-space-component-sm); }
[data-scope=editor] .cm-gutters { background:var(--lk-color-semantic-muted);color:var(--lk-color-semantic-mutedforeground);border-color:var(--lk-color-semantic-border); }
[data-scope=editor] :is(.cm-activeLine,.cm-activeLineGutter) { background:var(--lk-color-semantic-muted); }
[data-scope=editor] .cm-cursor { border-color:var(--lk-color-semantic-foreground); }
[data-scope=editor] .cm-selectionBackground,[data-scope=editor] .cm-focused .cm-selectionBackground { background:var(--lk-color-semantic-accent); }
[data-scope=editor] .cm-panels,[data-scope=editor] .cm-tooltip { background:var(--lk-color-semantic-popover);color:var(--lk-color-semantic-popoverforeground);border-color:var(--lk-color-semantic-border); }
[data-scope=editor] .cm-search { display:flex;flex-wrap:wrap;align-items:center;gap:var(--lk-space-component-xs);padding:var(--lk-space-component-sm); }
[data-scope=editor] :is(.cm-textfield,.cm-button) { min-height:var(--lk-control-height-md);max-width:100%;box-sizing:border-box;border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-input);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:inherit;font:inherit; }
[data-scope=editor] .cm-search input[type=text] { min-width:0;width:min(100%,12em); }
[data-scope=editor] .cm-searchMatch { background:var(--lk-color-semantic-accent);outline:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border); }
[data-scope=editor] .cm-tooltip-autocomplete > ul > li[aria-selected=true] { background:var(--lk-color-semantic-primary);color:var(--lk-color-semantic-primaryforeground); }
[data-scope=editor] .cm-placeholder { color:var(--lk-color-semantic-mutedforeground); }
`;
registerPrimitive(
  createPrimitive(
    {
      name: "editor",
      tokens: ["typography.fontFamily.mono", "color.semantic.foreground"],
      defaults: {},
    },
    (theme) => theme.mountStyles("editor", css),
  ),
);
