import { createPrimitive, registerPrimitive } from "./core";
const css = `
[data-scope=questionnaire] [data-part=ranking] [data-part=rank-row] { display:grid;grid-template-columns:auto auto minmax(0,1fr) auto; }
[data-scope=questionnaire] [data-part=rank-handle] { width:var(--lk-control-height-sm);height:var(--lk-control-height-sm);display:inline-flex;align-items:center;justify-content:center;flex:none;border:var(--lk-control-borderwidth) solid transparent;border-radius:var(--lk-radius-sm);padding:0;background:transparent;color:var(--lk-color-semantic-mutedforeground);cursor:grab;touch-action:none;user-select:none; }
[data-scope=questionnaire] [data-part=rank-handle]:hover:enabled { background:var(--lk-color-semantic-muted);color:var(--lk-color-semantic-foreground); }
[data-scope=questionnaire] [data-part=rank-handle][aria-pressed=true] { cursor:grabbing;background:var(--lk-color-semantic-accent);color:var(--lk-color-semantic-accentforeground); }
[data-scope=questionnaire] [data-part=rank-handle]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire] [data-part=rank-handle]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
[data-scope=questionnaire] [data-part=rank-instructions] { margin:0 0 var(--lk-space-component-sm);font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=questionnaire] [data-part=rank-status] { position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip-path:inset(50%);white-space:nowrap;border:0; }
@media (max-width:480px) { [data-scope=questionnaire] [data-part=ranking] [data-part=rank-row] { grid-template-columns:auto auto minmax(0,1fr); } [data-scope=questionnaire] [data-part=ranking] [data-part=rank-actions] { grid-column:3;justify-self:start; } }
`;
registerPrimitive(
  createPrimitive(
    { name: "questionnaire-ranking", tokens: [], defaults: {} },
    (theme) => theme.mountStyles("questionnaire-ranking", css),
  ),
);
