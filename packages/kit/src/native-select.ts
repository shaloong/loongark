/** 多选框架补丁后的原生选中项必须与状态机值一致，保证 FormData 正确。 */
export function syncNativeSelectOptions(element: HTMLSelectElement, values: readonly string[]) {
  const selected = new Set(values);
  for (const option of Array.from(element.options)) option.selected = selected.has(option.value);
}
