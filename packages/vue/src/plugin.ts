import { App, Plugin } from "vue";
import { createLoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit/bootstrap";

export interface VuePluginOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
}

export const createLoongArkVuePlugin = (
  options: VuePluginOptions = {},
): Plugin => {
  const theme = createLoongArkTheme({
    mode: options.mode,
    brand: options.brand,
    accent: options.accent,
  });

  return {
    install(app: App) {
      bootstrapKit(theme);
      theme.mount();
      app.provide("loongark-theme", theme);
      if (app.onUnmount) app.onUnmount(() => theme.unmount());
      else {
        const unmount = app.unmount.bind(app);
        app.unmount = () => {
          theme.unmount();
          unmount();
        };
      }
    },
  };
};
