/** WebKit 等平台在组合确认时可能先结束 composition，再发出 keyCode=229。 */
export function isCompositionKey(event: KeyboardEvent): boolean {
  return event.isComposing || event.keyCode === 229;
}
