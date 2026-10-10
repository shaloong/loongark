import { writable } from "svelte/store";
import { createLoongArkTheme } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit/bootstrap";
export interface ThemeStoreOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
}

export const createThemeStore = (options: ThemeStoreOptions = {}) => {
  let theme = createLoongArkTheme({
    mode: options.mode,
    brand: options.brand,
    accent: options.accent,
  });
  bootstrapKit(theme);
  theme.mount();
  const store = writable(theme);
  const set = (next: typeof theme) => {
    if (next !== theme) {
      theme.unmount();
      next.mount();
      bootstrapKit(next);
      theme = next;
    }
    store.set(next);
  };
  return {
    subscribe: store.subscribe,
    set,
    update(change: (current: typeof theme) => typeof theme) {
      set(change(theme));
    },
    destroy() {
      theme.unmount();
    },
  };
};
