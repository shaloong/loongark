import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
import { mountPrimitiveStyles } from "./styleSheet";
import { asTokenTree, toStringToken } from "./tokenUtils";

export type SwitchSize = "sm" | "md" | "lg";

export interface SwitchPrimitiveProps {
  size?: SwitchSize;
  disabled?: boolean;
}

interface SwitchDesignTokens {
  track: {
    width: Record<SwitchSize, string>;
    height: Record<SwitchSize, string>;
    padding: Record<SwitchSize, string>;
    radius: string;
    bg: string;
    bgChecked: string;
    border: string;
    borderHover: string;
    shadow: string;
  };
  thumb: {
    size: Record<SwitchSize, string>;
    bg: string;
    shadow: string;
  };
  focus: {
    outline: string;
    ring: string;
  };
  motion: {
    duration: string;
    easing: string;
  };
  disabled: {
    track: string;
    thumb: string;
    border: string;
  };
}

const extractSwitchTokens = (theme: LoongArkTheme): SwitchDesignTokens => {
  const space = theme.tokens.space as TokenTree;
  const componentSpace = asTokenTree(space.component);
  const radius = theme.tokens.radius as TokenTree;
  const color = theme.tokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);
  const motion = theme.tokens.motion as TokenTree;
  const duration = asTokenTree(motion.duration);
  const easing = asTokenTree(motion.easing);

  const trackHeightSm = "18px";
  const trackHeightMd = "22px";
  const trackHeightLg = "26px";

  return {
    track: {
      width: {
        sm: "36px",
        md: "44px",
        lg: "52px",
      },
      height: {
        sm: trackHeightSm,
        md: trackHeightMd,
        lg: trackHeightLg,
      },
      padding: {
        sm: "3px",
        md: "3px",
        lg: "4px",
      },
      radius: toStringToken(radius.pill ?? radius.lg, "999px"),
      bg: toStringToken(neutral["100"], "#E5E6EB"),
      bgChecked: toStringToken(brand.primary, "#006EFF"),
      border: toStringToken(neutral["300"], "#B3B4BD"),
      borderHover: toStringToken(neutral["500"], "#3A3A3C"),
      shadow: "inset 0 1px 1px rgba(0,0,0,0.08)",
    },
    thumb: {
      size: {
        sm: "12px",
        md: "16px",
        lg: "18px",
      },
      bg: toStringToken(neutral["50"], "#F5F6FA"),
      shadow: "0 1px 2px rgba(0,0,0,0.16)",
    },
    focus: {
      outline: toStringToken(brand.primary, "#006EFF"),
      ring: toStringToken(brand.accent ?? brand.primary, "#5AC8FA"),
    },
    motion: {
      duration: toStringToken(duration.base, "200ms"),
      easing: toStringToken(easing.standard, "cubic-bezier(0.2, 0, 0, 1)"),
    },
    disabled: {
      track: toStringToken(neutral["100"], "#E5E6EB"),
      thumb: toStringToken(neutral["300"], "#B3B4BD"),
      border: toStringToken(neutral["200"] ?? neutral["300"], "#D5D7DE"),
    },
  };
};

const buildSwitchStyles = (theme: LoongArkTheme): string => {
  const tokens = extractSwitchTokens(theme);
  const root = `[data-lk-switch]`;
  const control = `[data-lk-switch-control]`;
  const thumb = `[data-lk-switch-thumb]`;
  const label = `[data-lk-switch-label]`;

  const controlSizing = (size: SwitchSize) => `
${control}[data-size='${size}'] {
  width: ${tokens.track.width[size]};
  height: ${tokens.track.height[size]};
  padding: ${tokens.track.padding[size]};
}

${thumb}[data-size='${size}'] {
  width: ${tokens.thumb.size[size]};
  height: ${tokens.thumb.size[size]};
}

${control}[data-size='${size}'][data-state='checked'] ${thumb} {
  transform: translateX(calc(${tokens.track.width[size]} - ${tokens.thumb.size[size]} - (${tokens.track.padding[size]} * 2) - 2px));
}
`;

  return `
${root} {
  display: inline-flex;
  align-items: center;
  gap: ${tokens.track.padding.md};
}

${label} {
  cursor: pointer;
  color: ${tokens.track.borderHover};
  user-select: none;
}

${control} {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
  background: ${tokens.track.bg};
  border: 1px solid ${tokens.track.border};
  border-radius: ${tokens.track.radius};
  box-shadow: ${tokens.track.shadow};
  transition:
    background ${tokens.motion.duration} ${tokens.motion.easing},
    border-color ${tokens.motion.duration} ${tokens.motion.easing};
}

${control}[data-state='checked'] {
  background: ${tokens.track.bgChecked};
  border-color: ${tokens.track.bgChecked};
}

${control}:focus-visible {
  outline: none;
  border-color: ${tokens.focus.outline};
}

${control}[data-state='checked']:hover {
  border-color: ${tokens.track.borderHover};
}

${root}[data-disabled='true'] ${control},
${control}[data-disabled='true'] {
  cursor: not-allowed;
  background: ${tokens.disabled.track};
  border-color: ${tokens.disabled.border};
}

${thumb} {
  display: block;
  position: relative;
  border-radius: ${tokens.track.radius};
  background: ${tokens.thumb.bg};
  box-shadow: ${tokens.thumb.shadow};
  transition: transform ${tokens.motion.duration} ${tokens.motion.easing};
}

${control}[data-state='checked'] ${thumb} {
  background: ${tokens.thumb.bg};
}

${root}[data-disabled='true'] ${thumb},
${control}[data-disabled='true'] ${thumb} {
  background: ${tokens.disabled.thumb};
  box-shadow: none;
}

${control}[data-state='checked'][data-disabled='true'] {
  background: ${tokens.disabled.track};
  border-color: ${tokens.disabled.border};
}

${label}[data-disabled='true'] {
  color: ${tokens.disabled.thumb};
  cursor: not-allowed;
}

${controlSizing("sm")}
${controlSizing("md")}
${controlSizing("lg")}
`;
};

const SWITCH_CONTRACT: PrimitiveContract<SwitchPrimitiveProps> = {
  name: "switch",
  tokens: [
    "color.brand.primary",
    "color.brand.accent",
    "color.neutral.50",
    "color.neutral.100",
    "color.neutral.200",
    "color.neutral.300",
    "color.neutral.500",
    "space.component.xs",
    "space.component.sm",
    "space.component.md",
    "space.component.lg",
    "space.component.xl",
    "space.component.xxl",
    "radius.lg",
    "radius.pill",
    "motion.duration.base",
    "motion.easing.standard",
  ],
  defaults: {
    size: "md",
    disabled: false,
  },
};

const switchPrimitive = createPrimitive<SwitchPrimitiveProps>(
  SWITCH_CONTRACT,
  (theme) => {
    const css = buildSwitchStyles(theme);
    mountPrimitiveStyles(`switch-${theme.mode}`, css);
  }
);

registerPrimitive(switchPrimitive);

export { switchPrimitive };
