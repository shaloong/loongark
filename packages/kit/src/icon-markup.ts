import type { IconNode } from "lucide";
/** 内建控件的装饰图标共用序列化；调用方提供当前 HTML 转义函数。 */
export function decorativeIconMarkup(
  icon: IconNode,
  escape: (text: string) => string,
): string {
  return `<svg data-scope="icon" data-part="root" style="--lk-icon-size:var(--lk-control-icon-sm)" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${icon
    .map(
      ([tag, attrs]) =>
        `<${tag} ${Object.entries(attrs)
          .map(([key, value]) => `${key}="${escape(String(value))}"`)
          .join(" ")}></${tag}>`,
    )
    .join("")}</svg>`;
}
