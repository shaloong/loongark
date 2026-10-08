import assert from "node:assert/strict";
import { createLoongArkTheme } from "../packages/theme/dist/index.js";
import {
  baseTokens,
  viPalette,
  neutralPalette,
} from "../packages/tokens/dist/index.js";
import { registry } from "../packages/primitives/dist/index.js";

const light = createLoongArkTheme();
const dark = createLoongArkTheme({ mode: "dark" });
const highContrast = createLoongArkTheme({ mode: "high-contrast" });
assert.notEqual(
  light.tokens.color.semantic.background,
  dark.tokens.color.semantic.background,
);
assert.notEqual(
  light.tokens.color.semantic.border,
  highContrast.tokens.color.semantic.border,
);
assert.equal(viPalette.skyBlue, "#006EFF");
assert.deepEqual(viPalette, {
  skyBlue: "#006EFF",
  deepBlue: "#0A3565",
  dawnBlue: "#5AC8FA",
  coral: "#F58220",
  cloudWhite: "#F2F2F2",
  leadGray: "#767680",
  stoneGray: "#3A3A3C",
  inkNight: "#121212",
});
assert.equal(light.tokens.color.semantic.primary, viPalette.inkNight);
assert.equal(light.tokens.color.semantic.secondary, viPalette.cloudWhite);
assert.equal(dark.tokens.color.semantic.primary, viPalette.cloudWhite);
assert.equal(dark.tokens.color.semantic.background, viPalette.inkNight);
assert.equal(neutralPalette.stone, viPalette.stoneGray);
assert.equal(neutralPalette.lead, viPalette.leadGray);
const luminance = (hex) => {
  const channels = [1, 3, 5]
    .map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};
for (const theme of [light, dark, highContrast]) {
  const semantic = theme.tokens.color.semantic;
  for (const [text, background] of [
    ["foreground", "background"],
    ["mutedForeground", "muted"],
    ["primaryForeground", "primary"],
    ["secondaryForeground", "secondary"],
    ["destructiveForeground", "destructive"],
    ["successForeground", "success"],
  ]) {
    const values = [
      luminance(semantic[text]),
      luminance(semantic[background]),
    ].sort((a, b) => a - b);
    assert.ok(
      (values[1] + 0.05) / (values[0] + 0.05) >= 4.5,
      `${theme.mode}: ${text}/${background} 文本对比不足`,
    );
  }
}
const ramp = Object.entries(light.tokens.color.neutral)
  .filter(([name]) => /^\d+$/.test(name))
  .map(([, value]) => luminance(value));
assert.ok(
  ramp.every((value, index) => index === 0 || value <= ramp[index - 1]),
  "中性灰阶必须按亮度递减",
);
const darkRamp = Object.entries(dark.tokens.color.neutral)
  .filter(([name]) => /^\d+$/.test(name))
  .map(([, value]) => luminance(value));
assert.ok(
  darkRamp.every((value, index) => index === 0 || value >= darkRamp[index - 1]),
  "深色中性灰阶必须按亮度递增",
);
assert.equal(
  createLoongArkTheme({ brand: "vi" }).tokens.color.brand.primary,
  viPalette.skyBlue,
);
assert.match(light.styleTokens.color.semantic.primary, /^var\(--lk-/);
assert.throws(
  () => createLoongArkTheme({ brand: "wrong-brand-name" }),
  /无效品牌色/,
);
assert.equal(
  createLoongArkTheme({ brand: "#F58220" }).tokens.color.semantic
    .primaryForeground,
  viPalette.inkNight,
);
assert.equal(
  createLoongArkTheme({ brand: "#00B8D9" }).tokens.color.semantic
    .primaryForeground,
  viPalette.inkNight,
);
assert.equal(
  createLoongArkTheme({ brand: "vi" }).tokens.color.semantic.primaryForeground,
  "#FFFFFF",
);
for (const primitive of registry)
  for (const path of primitive.contract.tokens) {
    assert.notEqual(
      path.split(".").reduce((value, key) => value?.[key], baseTokens),
      undefined,
      `${primitive.contract.name} 缺少 Token ${path}`,
    );
  }
console.log(
  `明暗、高对比、VI、CSS 变量及 ${registry.length} 个组件 Token 契约验证通过`,
);
