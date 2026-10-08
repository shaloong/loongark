import {
  createMemo,
  createEffect,
  createUniqueId,
  onCleanup,
  type ParentComponent,
} from "solid-js";
import { createLoongArkTheme, type CreateThemeOptions } from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit";
import { ThemeContext } from "./theme-context";
export type LoongArkProviderProps = CreateThemeOptions;
export const LoongArkProvider: ParentComponent<LoongArkProviderProps> = (
  props,
) => {
  let scope!: HTMLDivElement;
  const scopeId = createUniqueId();
  const theme = createMemo(() =>
    createLoongArkTheme({
      mode: props.mode,
      brand: props.brand,
      accent: props.accent,
      overrides: props.overrides,
      targetId: props.targetId ?? scopeId,
      motionPreference: props.motionPreference,
    }),
  );
  createEffect(() => {
    const instance = theme();
    instance.mount(scope);
    bootstrapKit(instance);
    onCleanup(() => instance.unmount());
  });
  return (
    <ThemeContext.Provider value={theme}>
      <div
        ref={scope}
        data-lk-theme={theme().id}
        style={{ display: "contents" }}
      >
        {props.children}
      </div>
    </ThemeContext.Provider>
  );
};
