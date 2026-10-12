import type { StyleBootstrap } from "./styles";
import { neutralSystem } from "./neutral-system";
import { registry } from "./core";
import { primitiveStyleOrder } from "./style-order";
import { automaticStyleOrder } from "./automatic-style-order";
import { automaticStyleRegistry } from "./automatic";

/** 默认 Provider 自动消费组件样式；显式 Core 的选择不受此注册表影响。 */
export const bootstrapAutomaticStyles: StyleBootstrap = (theme) => {
  const apply = () => {
    theme.setStyleOrder(automaticStyleOrder);
    (registry.find((style) => style.contract.name === neutralSystem.contract.name) ?? neutralSystem).apply(theme);
    const builtins = new Set<string>(primitiveStyleOrder);
    const styles = [...automaticStyleRegistry.styles(), ...registry.filter((style) => !builtins.has(style.contract.name))];
    const selected = new Map(styles.map((style) => [style.contract.name, style]));
    for (const style of selected.values()) {
      const override = registry.find((entry) => entry.contract.name === (style.sourceContract ?? style.contract.name));
      (override ?? style).apply(theme);
    }
  };
  apply();
  // SSR 快照没有活动 DOM；只订阅实际浏览器挂载，避免保留请求主题。
  if (typeof document !== "undefined")
    theme.onUnmount(automaticStyleRegistry.subscribe(apply));
};
