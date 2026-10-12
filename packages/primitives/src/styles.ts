import type { LoongArkTheme } from "@loongark/theme";
import type { PrimitiveRegistration } from "./core";
import { neutralSystem } from "./neutral-system";
import { primitiveStyleOrder } from "./style-order";

export type StyleBootstrap = (theme: LoongArkTheme) => void;
export type PrimitiveStyle = PrimitiveRegistration<unknown>;

/** Core 的通用语义、焦点与动效；不包含组件注册表或 Kit 的完整 CSS。 */
export const bootstrapPrimitiveBase: StyleBootstrap = (theme) =>
  neutralSystem.apply(theme);

/** 显式选择样式并保持完整 Provider 的级联顺序；重复组件仅应用一次。 */
export const createPrimitiveStyleBootstrap = (
  styles: readonly PrimitiveStyle[],
): StyleBootstrap => {
  const selected = new Map(
    [neutralSystem, ...styles].map((style) => [style.contract.name, style]),
  );
  const order = new Map<string, number>(
    primitiveStyleOrder.map((name, index) => [name, index]),
  );
  const sorted = [...selected.values()].sort(
    (a, b) =>
      (order.get(a.contract.name) ?? order.size) -
      (order.get(b.contract.name) ?? order.size),
  );
  return (theme) => sorted.forEach((style) => style.apply(theme));
};
