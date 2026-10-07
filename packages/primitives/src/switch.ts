import { LoongArkTheme } from "@loongark/theme";
import { TokenTree } from "@loongark/tokens";
import { createPrimitive, registerPrimitive, PrimitiveContract } from "./core";
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
  };
  thumb: {
    size: Record<SwitchSize, string>;
    bg: string;
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
  const space = theme.styleTokens.space as TokenTree;
  const componentSpace = asTokenTree(space.component);
  const radius = theme.styleTokens.radius as TokenTree;
  const color = theme.styleTokens.color as TokenTree;
  const brand = asTokenTree(color.brand);
  const neutral = asTokenTree(color.neutral);
  const motion = theme.styleTokens.motion as TokenTree;
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
    },
    thumb: {
      size: {
        sm: "12px",
        md: "16px",
        lg: "18px",
      },
      bg: toStringToken(neutral["50"], "#F5F6FA"),
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
  const scope = `[data-scope="switch"]`;
  const root = `${scope}[data-part="root"]`;
  const control = `${scope}[data-part="control"]`;
  const thumb = `${scope}[data-part="thumb"]`;
  const label = `${scope}[data-part="label"]`;

  const controlSizing = (size: SwitchSize) => `
${control}[data-size='${size}'] {
  width: ${tokens.track.width[size]};
  height: ${tokens.track.height[size]};
  margin-block-start: calc((var(--lk-control-height-xs) - ${tokens.track.height[size]}) / 2);
  padding: ${tokens.track.padding[size]};
}

${thumb}[data-size='${size}'] {
  width: ${tokens.thumb.size[size]};
  height: ${tokens.thumb.size[size]};
}

${control}[data-size='${size}'][data-state='checked'] ${thumb} {
  transform: translateX(calc(${tokens.track.width[size]} - ${tokens.thumb.size[size]} - (${tokens.track.padding[size]} * 2)));
}

${control}[data-size='${size}'][data-state='checked']:dir(rtl) ${thumb} {
  transform: translateX(calc(-1 * (${tokens.track.width[size]} - ${tokens.thumb.size[size]} - (${tokens.track.padding[size]} * 2))));
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
  color: var(--lk-color-semantic-mutedforeground);
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


${root}:is([data-disabled=''],[data-disabled='true']) ${control},
${control}:is([data-disabled=''],[data-disabled='true']) {
  cursor: not-allowed;
  background: ${tokens.disabled.track};
  border-color: ${tokens.disabled.border};
}

${thumb} {
  display: block;
  position: relative;
  border-radius: ${tokens.track.radius};
  background: ${tokens.thumb.bg};
  transition: transform ${tokens.motion.duration} ${tokens.motion.easing};
}

${control}[data-state='checked'] ${thumb} {
  background: ${tokens.thumb.bg};
}

${root}:is([data-disabled=''],[data-disabled='true']) ${thumb},
${control}:is([data-disabled=''],[data-disabled='true']) ${thumb} {
  background: ${tokens.disabled.thumb};
}

${control}[data-state='checked']:is([data-disabled=''],[data-disabled='true']) {
  background: ${tokens.disabled.track};
  border-color: ${tokens.disabled.border};
}

${label}:is([data-disabled=''],[data-disabled='true']) {
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
    theme.mountStyles(`switch-${theme.mode}`, css);
  },
);

registerPrimitive(switchPrimitive);

export { switchPrimitive };
