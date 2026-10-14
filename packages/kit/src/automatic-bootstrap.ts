import type { LoongArkTheme } from "@shaloong/loongark-theme";
import { bootstrapAutomaticStyles } from "@shaloong/loongark-primitives/automatic-provider";
import { kitRegistry } from "./component-registry";

/** 默认入口仅启动实际组件样式，同时保留调用方的 Kit 注册扩展。 */
export const bootstrapKitAutomatic = (theme: LoongArkTheme): void => {
  bootstrapAutomaticStyles(theme);
  kitRegistry.forEach((component) => component.mount(theme));
};
