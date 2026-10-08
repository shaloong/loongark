/** 操作型后缀沿用原生 Field 状态；只读阻止清空，仍允许调用方的非编辑操作。 */
export function inputSuffixDisabled(
  action: "clear" | "button" | "none" | "text" | undefined,
  disabled: boolean | undefined,
  field?: { disabled?: boolean; readOnly?: boolean },
): boolean {
  return (
    disabled ?? (!!field?.disabled || (action === "clear" && !!field?.readOnly))
  );
}
