export interface NumberFormatProps extends Intl.NumberFormatOptions { value: number; }
/** 与 Ark 数字格式化采用相同 Intl 语义，补框架缺失参数时复用。 */
export function formatNumberValue(value: number, locale: string, options: Intl.NumberFormatOptions) {
  return new Intl.NumberFormat(locale, options).format(value);
}
