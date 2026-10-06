import type { Question, QuestionnaireValue } from "@loongark/kit";
export const complexQuestions: readonly Question[] = [
  { id: "quantity", label: "Quantity", description: "Choose between 0 and 10, in steps of 0.5.", type: "number", required: true, min: 0, max: 10, step: 0.5 },
  { id: "date", label: "Review date", description: "A calendar date in 2026.", type: "date", required: true, min: "2026-01-01", max: "2026-12-31" },
  { id: "format", label: "Preferred format", type: "select", required: true, options: [{ value: "compact", label: "Compact summary" }, { value: "full", label: "Full details" }, { value: "old", label: "Unavailable format", disabled: true }] },
  { id: "review", label: "Review each area", description: "Answer every available row. Each row has its own radio group.", type: "matrix", required: true, rows: [{ id: "navigation", label: "Navigation and keyboard focus" }, { id: "content", label: "Content clarity with longer labels on a narrow screen" }, { id: "retired", label: "Retired area", disabled: true }], options: [{ value: "clear", label: "Clear" }, { value: "improve", label: "Needs improvement" }] },
  { id: "priority", label: "Order your priorities", description: "The initial order is a valid answer. Drag the handle or use the keyboard and move buttons; focus stays with the item.", type: "ranking", required: true, options: [{ value: "access", label: "Accessibility and keyboard interaction" }, { value: "layout", label: "Layout and alignment" }, { value: "speed", label: "Responsiveness" }], async validateAsync(_answer, _value, { signal }) { await new Promise<void>((resolve, reject) => { const timer = setTimeout(() => { signal.removeEventListener("abort", cancel); resolve(); }, 250); function cancel() { clearTimeout(timer); reject(new DOMException("Cancelled", "AbortError")); } signal.addEventListener("abort", cancel, { once: true }); if (signal.aborted) cancel(); }); return undefined; } },
];
export function createQuestionnaireTypesDemo(notify: () => void) {
  let value: QuestionnaireValue = {}, saved: QuestionnaireValue | undefined, reject = false, disabled = false, shown = true;
  return {
    get snapshot() { return { value, saved, reject, disabled, shown }; },
    change(details: { value: QuestionnaireValue }) { if (!reject) value = details.value; notify(); },
    complete(details: { value: QuestionnaireValue }) { saved = details.value; notify(); },
    toggleReject() { reject = !reject; notify(); },
    toggleDisabled() { disabled = !disabled; notify(); },
    toggleShown() { shown = !shown; notify(); },
    reset() { value = {}; saved = undefined; reject = false; disabled = false; shown = false; notify(); queueMicrotask(() => { shown = true; notify(); }); },
  };
}
