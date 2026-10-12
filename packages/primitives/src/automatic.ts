import type { PrimitiveStyle } from "./styles";

const selected = new Map<string, PrimitiveStyle>();
const listeners = new Set<() => void>();

/** 由实际保留的组件入口声明样式；动态入口会同步通知已挂载 Provider。 */
export const registerAutomaticStyles = (styles: readonly PrimitiveStyle[]): void => {
  let changed = false;
  for (const style of styles) {
    if (selected.get(style.contract.name) === style) continue;
    selected.set(style.contract.name, style);
    changed = true;
  }
  if (changed) for (const listener of listeners) listener();
};

/** 保留组件本身与其真实类型；调用可随未使用的组件一起被生产构建裁剪。 */
export const withAutomaticStyles = <T>(component: T, styles: readonly PrimitiveStyle[]): T => {
  registerAutomaticStyles(styles);
  return component;
};

export const automaticStyleRegistry = {
  styles: () => [...selected.values()],
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    return () => { listeners.delete(listener); };
  },
};
