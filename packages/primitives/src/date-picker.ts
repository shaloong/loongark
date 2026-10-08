/**
 * Date Picker primitive styles.
 * Uses Ark UI Date Picker data attributes.
 */
import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { asTokenTree, toNumberToken, toStringToken } from "./tokenUtils";

export type DatePickerSize = "sm" | "md" | "lg";

export interface DatePickerPrimitiveProps {
  size?: DatePickerSize;
}

interface DatePickerDesignTokens {
  fontFamily: string;
  fontSize: Record<DatePickerSize, string>;
  lineHeight: number;
  fontWeight: number;
  paddingY: Record<DatePickerSize, string>;
  paddingX: Record<DatePickerSize, string>;
  radius: Record<DatePickerSize, string>;
  gap: string;
  cellSize: Record<DatePickerSize, string>;
  actionSize: Record<DatePickerSize, string>;
  neutral: {
    surface: string;
    surfaceRaised: string;
    border: string;
    borderHover: string;
    text: string;
    textMuted: string;
    placeholder: string;
  };
  disabled: {
    bg: string;
    text: string;
    border: string;
  };
  brand: {
    primary: string;
    accent: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
  shadow: string;
}

const extractDatePickerTokens = (
  theme: LoongArkTheme,
): DatePickerDesignTokens => {
  const typography = theme.styleTokens.typography as TokenTree;
  const fontFamily = asTokenTree(typography.fontFamily);
  const fontSize = asTokenTree(typography.fontSize);
  const lineHeight = asTokenTree(typography.lineHeight);
  const fontWeight = asTokenTree(typography.fontWeight);

  const space = asTokenTree(theme.styleTokens.space);
  const componentSpace = asTokenTree(space.component);
  const radius = asTokenTree(theme.styleTokens.radius);
  const shadow = asTokenTree(theme.styleTokens.shadow);

  const color = theme.styleTokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);

  const motion = theme.styleTokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  return {
    fontFamily: toStringToken(fontFamily.body, "sans-serif"),
    fontSize: {
      sm: toStringToken(fontSize.sm, "14px"),
      md: toStringToken(fontSize.md, "16px"),
      lg: toStringToken(fontSize.lg, "20px"),
    },
    lineHeight: toNumberToken(lineHeight.base, 1.5),
    fontWeight: toNumberToken(fontWeight.regular, 400),
    paddingY: {
      sm: toStringToken(componentSpace.xs, "4px"),
      md: toStringToken(componentSpace.sm, "8px"),
      lg: toStringToken(componentSpace.md, "12px"),
    },
    paddingX: {
      sm: toStringToken(componentSpace.sm, "12px"),
      md: toStringToken(componentSpace.md, "16px"),
      lg: toStringToken(componentSpace.lg, "20px"),
    },
    radius: {
      sm: toStringToken(radius.sm, "4px"),
      md: toStringToken(radius.md, "6px"),
      lg: toStringToken(radius.lg, "8px"),
    },
    gap: toStringToken(componentSpace.xs, "4px"),
    cellSize: {
      sm: "28px",
      md: "32px",
      lg: "36px",
    },
    actionSize: {
      sm: "24px",
      md: "28px",
      lg: "32px",
    },
    neutral: {
      surface: toStringToken(neutral["50"], "#FFFFFF"),
      surfaceRaised: toStringToken(neutral["100"], "#F2F2F2"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
      borderHover: toStringToken(neutral["300"], "#B3B4BD"),
      text: toStringToken(neutral["700"], "#232325"),
      textMuted: toStringToken(neutral["500"], "#767680"),
      placeholder: toStringToken(neutral["300"], "#B3B4BD"),
    },
    disabled: {
      bg: toStringToken(neutral["100"], "#E5E6EB"),
      text: toStringToken(neutral["300"], "#B3B4BD"),
      border: toStringToken(neutral["100"], "#E5E6EB"),
    },
    brand: {
      primary: toStringToken(brand.primary, "#006EFF"),
      accent: toStringToken(brand.accent, "#5AC8FA"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
    shadow: toStringToken(shadow.popover, "0 8px 40px rgba(0, 0, 0, 0.08)"),
  };
};

const buildDatePickerStyles = (theme: LoongArkTheme): string => {
  const tokens = extractDatePickerTokens(theme);
  const zIndex = (theme.styleTokens as any).zIndex || {};
  const scopeSelector = `[data-scope="date-picker"]`;
  const rootSelector = `${scopeSelector}[data-part="root"]`;
  const labelSelector = `${scopeSelector}[data-part="label"]`;
  const controlSelector = `${scopeSelector}[data-part="control"]`;
  const inputSelector = `${scopeSelector}[data-part="input"]`;
  const triggerSelector = `${scopeSelector}[data-part="trigger"]`;
  const clearTriggerSelector = `${scopeSelector}[data-part="clear-trigger"]`;
  const presetTriggerSelector = `${scopeSelector}[data-part="preset-trigger"]`;
  const rangeTextSelector = `${scopeSelector}[data-part="range-text"]`;
  const positionerSelector = `${scopeSelector}[data-part="positioner"]`;
  const contentSelector = `${scopeSelector}[data-part="content"]`;
  const viewSelector = `${scopeSelector}[data-part="view"]`;
  const viewControlSelector = `${scopeSelector}[data-part="view-control"]`;
  const viewTriggerSelector = `${scopeSelector}[data-part="view-trigger"]`;
  const prevTriggerSelector = `${scopeSelector}[data-part="prev-trigger"]`;
  const nextTriggerSelector = `${scopeSelector}[data-part="next-trigger"]`;
  const monthSelectSelector = `${scopeSelector}[data-part="month-select"]`;
  const yearSelectSelector = `${scopeSelector}[data-part="year-select"]`;
  const tableSelector = `${scopeSelector}[data-part="table"]`;
  const tableHeadSelector = `${scopeSelector}[data-part="table-head"]`;
  const tableBodySelector = `${scopeSelector}[data-part="table-body"]`;
  const tableRowSelector = `${scopeSelector}[data-part="table-row"]`;
  const tableHeaderSelector = `${scopeSelector}[data-part="table-header"]`;
  const tableCellSelector = `${scopeSelector}[data-part="table-cell"]`;
  const tableCellTriggerSelector = `${scopeSelector}[data-part="table-cell-trigger"]`;

  return `

${rootSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
  width: 100%;
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
}

${labelSelector} {
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  color: ${tokens.neutral.text};
  cursor: pointer;
}

${controlSelector} {
  display: inline-flex;
  align-items: center;
  width: 100%;
  gap: ${tokens.gap};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  background: ${tokens.neutral.surface};
  padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
  box-sizing: border-box;
  transition:
    border-color ${tokens.motion.duration} ${tokens.motion.easing},
    background ${tokens.motion.duration} ${tokens.motion.easing};
}

${controlSelector}:hover {
  border-color: ${tokens.neutral.borderHover};
}

${controlSelector}:focus-within {
  border-color: ${tokens.brand.primary};
}

${inputSelector} {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: inherit;
  font-family: inherit;
  font-size: ${tokens.fontSize.md};
  font-weight: ${tokens.fontWeight};
  line-height: ${tokens.lineHeight};
  padding: 0;
}

${inputSelector}::placeholder {
  color: var(--lk-color-semantic-mutedforeground);
  opacity: 1;
}

${inputSelector}:is([data-invalid=""],[data-invalid="true"]),
${inputSelector}[aria-invalid="true"] {
  color: var(--lk-color-semantic-foreground);
}

${triggerSelector},
${clearTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${tokens.actionSize.md};
  height: ${tokens.actionSize.md};
  border: none;
  border-radius: ${tokens.radius.sm};
  background: transparent;
  color: var(--lk-color-semantic-mutedforeground);
  cursor: pointer;
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    color ${tokens.motion.duration} ${tokens.motion.easing};
}

${triggerSelector}:hover,
${clearTriggerSelector}:hover {
  background: ${tokens.neutral.surfaceRaised};
  color: ${tokens.neutral.text};
}

${triggerSelector}:focus-visible,
${clearTriggerSelector}:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px ${tokens.brand.accent};
}

${rangeTextSelector} {
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  color: var(--lk-color-semantic-mutedforeground);
}

${controlSelector}:is([data-disabled=""],[data-disabled="true"]) {
  background: ${tokens.disabled.bg};
  border-color: ${tokens.disabled.border};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.85;
}

${controlSelector}:is([data-disabled=""],[data-disabled="true"]) ${inputSelector} {
  color: ${tokens.disabled.text};
}

${controlSelector}:is([data-disabled=""],[data-disabled="true"]) ${triggerSelector},
${controlSelector}:is([data-disabled=""],[data-disabled="true"]) ${clearTriggerSelector} {
  color: ${tokens.disabled.text};
  cursor: not-allowed;
}

${rootSelector}[data-size="sm"] ${controlSelector} {
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
}

${rootSelector}[data-size="sm"] ${inputSelector} {
  font-size: ${tokens.fontSize.sm};
}

${rootSelector}[data-size="sm"] ${triggerSelector},
${rootSelector}[data-size="sm"] ${clearTriggerSelector} {
  width: ${tokens.actionSize.sm};
  height: ${tokens.actionSize.sm};
}

${rootSelector}[data-size="lg"] ${controlSelector} {
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
}

${rootSelector}[data-size="lg"] ${inputSelector} {
  font-size: ${tokens.fontSize.lg};
}

${rootSelector}[data-size="lg"] ${triggerSelector},
${rootSelector}[data-size="lg"] ${clearTriggerSelector} {
  width: ${tokens.actionSize.lg};
  height: ${tokens.actionSize.lg};
}

${positionerSelector} {
  z-index: ${zIndex?.popover || 1000};
}

${contentSelector} {
  width: var(--lk-control-calendarwidth);
  max-width: calc(100vw - var(--lk-space-component-lg));
  background: ${tokens.neutral.surface};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.md};
  padding: ${tokens.paddingY.md} ${tokens.paddingX.md};
  box-shadow: ${tokens.shadow};
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  outline: none;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-2px) scale(0.98);
  transition:
    opacity ${tokens.motion.duration} ${tokens.motion.easing},
    transform ${tokens.motion.duration} ${tokens.motion.easing},
    visibility ${tokens.motion.duration} ${tokens.motion.easing};
}

${contentSelector}[data-state="open"] {
  opacity: 1;
  visibility: visible;
  transform: translateY(0) scale(1);
}

${contentSelector}[data-state="closed"] {
  opacity: 0;
  visibility: hidden;
  transform: translateY(-2px) scale(0.98);
}

${contentSelector}:is([data-inline=""],[data-inline="true"]) {
  border: none;
  box-shadow: none;
  padding: 0;
  opacity: 1;
  visibility: visible;
  transform: none;
}

${contentSelector}[data-size="sm"] {
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  border-radius: ${tokens.radius.sm};
}

${contentSelector}[data-size="lg"] {
  padding: ${tokens.paddingY.lg} ${tokens.paddingX.lg};
  border-radius: ${tokens.radius.lg};
}

${contentSelector}:is([data-inline=""],[data-inline="true"])[data-size="sm"],
${contentSelector}:is([data-inline=""],[data-inline="true"])[data-size="lg"] {
  padding: 0;
  border-radius: 0;
}

${viewSelector} {
  display: flex;
  flex-direction: column;
  gap: ${tokens.gap};
}

${viewControlSelector} {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.gap};
}

${viewTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: ${tokens.radius.sm};
  background: transparent;
  color: ${tokens.neutral.text};
  font-family: inherit;
  font-size: ${tokens.fontSize.md};
  font-weight: ${tokens.fontWeight};
  padding: 0 ${tokens.gap};
  cursor: pointer;
  transition: background ${tokens.motion.duration} ${tokens.motion.easing};
}

${viewTriggerSelector}:hover {
  background: ${tokens.neutral.surfaceRaised};
}

${prevTriggerSelector},
${nextTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${tokens.actionSize.md};
  height: ${tokens.actionSize.md};
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  cursor: pointer;
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    border-color ${tokens.motion.duration} ${tokens.motion.easing};
}

${prevTriggerSelector}:hover,
${nextTriggerSelector}:hover {
  background: ${tokens.neutral.surfaceRaised};
  border-color: ${tokens.neutral.borderHover};
}

${prevTriggerSelector}:is([data-disabled=""],[data-disabled="true"]),
${nextTriggerSelector}:is([data-disabled=""],[data-disabled="true"]) {
  background: ${tokens.disabled.bg};
  border-color: ${tokens.disabled.border};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
  opacity: 0.7;
}

${monthSelectSelector},
${yearSelectSelector} {
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-family: ${tokens.fontFamily};
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  padding: 2px ${tokens.gap};
}

${monthSelectSelector}:focus-visible,
${yearSelectSelector}:focus-visible {
  outline: none;
  border-color: ${tokens.brand.primary};
}

${monthSelectSelector}[disabled],
${yearSelectSelector}[disabled] {
  background: ${tokens.disabled.bg};
  border-color: ${tokens.disabled.border};
  color: ${tokens.disabled.text};
  cursor: not-allowed;
}

${presetTriggerSelector} {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${tokens.neutral.border};
  border-radius: ${tokens.radius.sm};
  background: ${tokens.neutral.surface};
  color: ${tokens.neutral.text};
  font-family: inherit;
  font-size: ${tokens.fontSize.sm};
  line-height: ${tokens.lineHeight};
  padding: ${tokens.paddingY.sm} ${tokens.paddingX.sm};
  cursor: pointer;
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    border-color ${tokens.motion.duration} ${tokens.motion.easing};
}

${presetTriggerSelector}:hover {
  background: ${tokens.neutral.surfaceRaised};
  border-color: ${tokens.neutral.borderHover};
}

${tableSelector} {
  width: 100%;
  border-collapse: separate;
  border-spacing: ${tokens.gap};
  table-layout: fixed;
}

${tableHeadSelector} {
  color: var(--lk-color-semantic-mutedforeground);
  font-size: ${tokens.fontSize.sm};
  font-weight: ${tokens.fontWeight};
}

${tableHeaderSelector} {
  text-align: center;
  font-weight: ${tokens.fontWeight};
  padding: 0;
}

${tableBodySelector},
${tableRowSelector} {
  text-align: center;
}

${tableCellSelector} {
  padding: 0;
}

${tableCellTriggerSelector} {
  appearance: none;
  border: 0;
  background: transparent;
  padding: 0;
  font: inherit;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: ${tokens.cellSize.md};
  height: ${tokens.cellSize.md};
  border-radius: ${tokens.radius.sm};
  color: ${tokens.neutral.text};
  cursor: pointer;
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    color ${tokens.motion.duration} ${tokens.motion.easing},
    box-shadow ${tokens.motion.duration} ${tokens.motion.easing};
}

${tableCellTriggerSelector}[data-view="month"],
${tableCellTriggerSelector}[data-view="year"] {
  min-width: calc(${tokens.cellSize.md} * 1.35);
  padding: 0 ${tokens.gap};
}

${tableCellTriggerSelector}:not(:is([data-disabled=""],[data-disabled="true"])):not(:is([data-selected=""],[data-selected="true"])):not(:is([data-range-start=""],[data-range-start="true"])):not(:is([data-range-end=""],[data-range-end="true"])):hover {
  background: ${tokens.neutral.surfaceRaised};
}

${tableCellTriggerSelector}:is([data-disabled=""],[data-disabled="true"]) {
  cursor: not-allowed;
  color: ${tokens.disabled.text};
  opacity: 0.7;
}

${tableCellTriggerSelector}:is([data-unavailable=""],[data-unavailable="true"]) {
  text-decoration: line-through;
  color: var(--lk-color-semantic-mutedforeground);
}

${tableCellTriggerSelector}:is([data-outside-range=""],[data-outside-range="true"]) {
  color: var(--lk-color-semantic-mutedforeground);
}

${tableCellTriggerSelector}:is([data-in-hover-range=""],[data-in-hover-range="true"]):not(:is([data-selected=""],[data-selected="true"])) {
  background: ${tokens.neutral.surfaceRaised};
}

${tableCellTriggerSelector}:is([data-in-range=""],[data-in-range="true"]):not(:is([data-selected=""],[data-selected="true"])) {
  background: var(--lk-color-semantic-accent);
  color: var(--lk-color-semantic-accentforeground);
}

${tableCellTriggerSelector}:is([data-selected=""],[data-selected="true"]),
${tableCellTriggerSelector}:is([data-range-start=""],[data-range-start="true"]),
${tableCellTriggerSelector}:is([data-range-end=""],[data-range-end="true"]) {
  background: var(--lk-color-semantic-primary);
  color: var(--lk-color-semantic-primaryforeground);
}

${tableCellTriggerSelector}:is([data-focus=""],[data-focus="true"]),
${tableCellTriggerSelector}:focus-visible {
  outline: var(--lk-control-focuswidth) solid var(--lk-color-semantic-ring);
  outline-offset: var(--lk-control-focuswidth);
  box-shadow: none;
}

${tableCellTriggerSelector}:is([data-today=""],[data-today="true"]):not(:is([data-selected=""],[data-selected="true"])) {
  box-shadow: inset 0 0 0 var(--lk-control-borderwidth) var(--lk-color-semantic-ring);
}

${contentSelector}[data-size="sm"] ${tableCellTriggerSelector} {
  width: ${tokens.cellSize.sm};
  height: ${tokens.cellSize.sm};
  font-size: ${tokens.fontSize.sm};
}

${contentSelector}[data-size="sm"] ${prevTriggerSelector},
${contentSelector}[data-size="sm"] ${nextTriggerSelector} {
  width: ${tokens.actionSize.sm};
  height: ${tokens.actionSize.sm};
}

${contentSelector}[data-size="lg"] ${tableCellTriggerSelector} {
  width: ${tokens.cellSize.lg};
  height: ${tokens.cellSize.lg};
  font-size: ${tokens.fontSize.lg};
}

${contentSelector}[data-size="lg"] ${prevTriggerSelector},
${contentSelector}[data-size="lg"] ${nextTriggerSelector} {
  width: ${tokens.actionSize.lg};
  height: ${tokens.actionSize.lg};
}
`;
};

const datePickerContract: PrimitiveContract<DatePickerPrimitiveProps> = {
  name: "date-picker",
  tokens: [
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.300",
    "color.neutral.500",
    "color.neutral.700",
    "color.brand.primary",
    "color.brand.accent",
    "color.brand.subtle",
    "color.brand.warning",
    "typography.fontFamily.body",
    "typography.fontSize.sm",
    "typography.fontSize.md",
    "typography.fontSize.lg",
    "typography.lineHeight.base",
    "typography.fontWeight.regular",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "radius.sm",
    "radius.md",
    "radius.lg",
    "motion.duration.base",
    "motion.easing.standard",
    "shadow.popover",
  ],
  defaults: {
    size: "md",
  },
};

const DatePickerPrimitive = createPrimitive(datePickerContract, (theme) => {
  const css = buildDatePickerStyles(theme);
  theme.mountStyles(`date-picker-${theme.mode}`, css);
});

registerPrimitive(DatePickerPrimitive);

export { DatePickerPrimitive };
