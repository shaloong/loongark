export const questionnaireCSS = `
[data-scope=questionnaire][data-part=root] { display:grid;gap:var(--lk-space-component-md);width:100%;min-width:0; }
[data-scope=questionnaire] [data-part=groups] { display:grid;gap:var(--lk-space-component-md);min-width:0; }
[data-scope=questionnaire] :is([data-part=group-instance],[data-part=group-question]) { display:block;min-width:0;margin:0;padding:var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md); }
[data-scope=questionnaire] [data-part=group-question] { padding:0;border:0;border-radius:0; }
[data-scope=questionnaire] [data-part=group-question] textarea[data-part=answer] { height:auto;min-height:calc(2 * var(--lk-control-height-md));padding-block:var(--lk-space-component-sm);resize:vertical; }
[data-scope=questionnaire] :is([data-part=group-instance],[data-part=group-question]) > legend { max-inline-size:100%;box-sizing:border-box;padding-inline:var(--lk-space-component-xs);font-weight:var(--lk-typography-fontweight-medium);overflow-wrap:anywhere; }
[data-scope=questionnaire] [data-part=group-question] :is([data-part=description],[data-part=error]):empty { display:none; }
[data-scope=questionnaire] [data-question-group] { justify-self:start;min-height:var(--lk-control-height-md);padding:var(--lk-space-component-xs) var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:inherit;font:inherit;cursor:pointer; }
[data-scope=questionnaire] [data-question-group]:hover:not(:disabled) { background:var(--lk-color-semantic-muted); }
[data-scope=questionnaire] [data-question-group]:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
[data-scope=questionnaire] [data-question-group]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire][data-part=header] { display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:var(--lk-space-component-sm); }
[data-scope=questionnaire][data-part=title] { margin:0;font-size:var(--lk-typography-fontsize-lg);font-weight:var(--lk-typography-fontweight-semibold); }
[data-scope=questionnaire][data-part=count] { font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground); }
[data-scope=questionnaire][data-part=question] { min-width:0;margin:0;padding:var(--lk-space-component-md);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-lg);display:block; }
[data-scope=questionnaire] [data-part=question-content] { display:grid;gap:var(--lk-space-component-compact);min-width:0; }
[data-scope=questionnaire] :is([data-part=group-instance],[data-part=group-question]) > [data-part=question-content] { gap:var(--lk-space-component-sm); }
[data-scope=questionnaire][data-part=legend] { max-inline-size:100%;box-sizing:border-box;font-weight:var(--lk-typography-fontweight-medium);padding-inline:var(--lk-space-component-xs);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=description] { margin:0;font-size:var(--lk-typography-fontsize-sm);color:var(--lk-color-semantic-mutedforeground);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=option] { display:flex;align-items:flex-start;line-height:var(--lk-typography-lineheight-base);gap:var(--lk-space-component-sm);min-height:var(--lk-control-height-md);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);cursor:pointer;overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=option][data-selected=true] { background:var(--lk-color-semantic-muted);border-color:var(--lk-color-semantic-foreground); }
[data-scope=questionnaire][data-part=option]:has(input:disabled) { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire][data-part=option] input { flex:none;font:inherit;margin:0;margin-block-start:calc((1em * var(--lk-typography-lineheight-base) - var(--lk-control-icon-sm)) / 2);width:var(--lk-control-icon-sm);height:var(--lk-control-icon-sm);accent-color:var(--lk-color-semantic-primary); }
[data-scope=questionnaire][data-part=option] span { min-width:0;flex:1; }
[data-scope=questionnaire][data-part=validation] { margin:0;color:var(--lk-color-semantic-mutedforeground);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=error] { color:var(--lk-color-semantic-destructive);font-size:var(--lk-typography-fontsize-sm);overflow-wrap:anywhere; }
[data-scope=questionnaire][data-part=actions] { display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:var(--lk-space-component-sm); }
[data-scope=questionnaire][data-part=actions] > :last-child { margin-inline-start:auto; }
[data-scope=questionnaire] [data-part=advanced-answer] { min-width:0; }
[data-scope=questionnaire] [data-part=answer] { box-sizing:border-box;width:100%;min-width:0;height:var(--lk-control-height-md);padding-inline:var(--lk-space-component-compact);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);font:inherit; }
[data-scope=questionnaire] [data-part=matrix] { display:grid;gap:var(--lk-space-component-md); }
[data-scope=questionnaire] [data-part=matrix-row] { margin:0;padding:0;border:0;min-width:0;display:block; }
[data-scope=questionnaire] [data-part=matrix-options] { display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,10em),1fr));gap:var(--lk-space-component-sm);min-width:0; }
[data-scope=questionnaire] [data-part=matrix-row] legend { max-inline-size:100%;box-sizing:border-box;margin-block-end:var(--lk-space-component-sm);font-weight:var(--lk-typography-fontweight-medium);overflow-wrap:anywhere; }
[data-scope=questionnaire] [data-part=ranking] { margin:0;padding:0;list-style:none;counter-reset:rank;display:grid;gap:var(--lk-space-component-sm); }
[data-scope=questionnaire] [data-part=rank-row] { counter-increment:rank;display:flex;align-items:center;flex-wrap:wrap;gap:var(--lk-space-component-sm);padding:var(--lk-space-component-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md); }
[data-scope=questionnaire] [data-part=rank-row]::before { content:counter(rank);color:var(--lk-color-semantic-mutedforeground);font-variant-numeric:tabular-nums; }
[data-scope=questionnaire] [data-part=rank-row] > span { flex:1;min-width:0;overflow-wrap:anywhere; }
[data-scope=questionnaire] [data-part=rank-actions] { display:flex;flex-wrap:wrap;gap:var(--lk-space-component-xs); }
[data-scope=questionnaire] [data-part=rank-actions] button { height:var(--lk-control-height-sm);padding-inline:var(--lk-space-component-sm);font:inherit;font-size:var(--lk-typography-fontsize-sm);border:var(--lk-control-borderwidth) solid var(--lk-color-semantic-border);border-radius:var(--lk-radius-md);background:var(--lk-color-semantic-background);color:var(--lk-color-semantic-foreground);cursor:pointer; }
[data-scope=questionnaire] [data-part=rank-actions] button:hover:enabled { background:var(--lk-color-semantic-muted); }
[data-scope=questionnaire] [data-part=rank-actions] button:disabled,[data-scope=questionnaire] [data-part=answer]:disabled { opacity:.5;cursor:not-allowed; }
[data-scope=questionnaire] [data-part=answer]:focus-visible,[data-scope=questionnaire] [data-part=rank-actions] button:focus-visible { outline:var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);outline-offset:var(--lk-control-focuswidth); }
[data-scope=questionnaire] [data-part=answer][aria-invalid=true] { border-color:var(--lk-color-semantic-destructive); }

@media (max-width:480px) { [data-scope=questionnaire] [data-part=rank-row] { display:grid;grid-template-columns:auto minmax(0,1fr); } [data-scope=questionnaire] [data-part=rank-actions] { grid-column:2;justify-self:start; } }
`;
