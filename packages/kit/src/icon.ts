import {
  Check,
  Minus,
  Plus,
  X,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  FileText,
  Circle,
  Search,
  LoaderCircle,
  Star,
  Pencil,
} from "lucide";
import type { IconNode } from "lucide";
export type { IconNode } from "lucide";
export interface IconOptions {
  /** 按需导入的 SVG 节点，不查找全量字符串注册表。 */
  icon: IconNode;
  size?: "sm" | "md" | "lg" | number;
  strokeWidth?: number;
  /** 在缩放后保持每条路径的实际描边宽度。 */
  absoluteStrokeWidth?: boolean;
  /** 仅用于具有逻辑方向的图标，继承祖先的方向。 */
  mirrorInRtl?: boolean;
  /** 有含义的独立图标使用 label；按钮内装饰图标保持默认隐藏。 */
  label?: string;
}
/** 内置控件只使用此有限集合；业务图标从 lucide 按名字导入。 */
export const controlIcons = {
  check: Check,
  minus: Minus,
  plus: Plus,
  close: X,
  chevronDown: ChevronDown,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  arrowLeft: ArrowLeft,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  arrowDown: ArrowDown,
  externalLink: ArrowUpRight,
  file: FileText,
  circle: Circle,
  search: Search,
  loading: LoaderCircle,
  star: Star,
  pencil: Pencil,
};
export function iconAttributes(
  options: IconOptions,
  names: {
    "aria-label"?: string | null;
    "aria-labelledby"?: string | null;
  } = {},
) {
  const label = (options.label ?? names["aria-label"])?.trim();
  const labelledby = names["aria-labelledby"]?.trim();
  const named = !!(label || labelledby);
  if (
    options.strokeWidth !== undefined &&
    (!Number.isFinite(options.strokeWidth) || options.strokeWidth < 0)
  )
    throw Error("Icon strokeWidth must be a non-negative finite number");
  return {
    "data-scope": "icon",
    "data-part": "root",
    "data-mirror-rtl": options.mirrorInRtl ? "true" : undefined,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    "stroke-width": options.strokeWidth ?? 2,
    "stroke-linecap": "round" as const,
    "stroke-linejoin": "round" as const,
    focusable: "false",
    role: named ? ("img" as const) : undefined,
    "aria-label": label || undefined,
    "aria-labelledby": labelledby || undefined,
    "aria-hidden": named ? undefined : ("true" as const),
  };
}
export function iconStyles(size: IconOptions["size"] = "md") {
  if (typeof size === "number" && (!Number.isFinite(size) || size <= 0))
    throw Error("Icon size must be a positive finite number");
  return {
    "--lk-icon-size":
      typeof size === "number"
        ? `${size}px`
        : {
            sm: "var(--lk-control-icon-sm)",
            md: "var(--lk-control-icon-md)",
            lg: "var(--lk-control-icon-lg)",
          }[size],
  };
}
/** React 使用 camelCase SVG 属性，aria/data 属性保持原生名称。 */
export function reactSvgAttributes(
  attrs: Record<string, string | number | undefined>,
) {
  return Object.fromEntries(
    Object.entries(attrs).map(([key, value]) => [
      key.startsWith("aria-") || key.startsWith("data-")
        ? key
        : key.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase()),
      value,
    ]),
  );
}
