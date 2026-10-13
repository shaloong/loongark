import {
  createMemo,
  createEffect,
  createUniqueId,
  onCleanup,
  type ParentComponent,
} from "solid-js";
import { createLoongArkTheme, type CreateThemeOptions } from "@loongark/theme";
import {
  bootstrapPrimitiveBase,
  type StyleBootstrap,
} from "@loongark/primitives/styles";
import { ThemeContext } from "./theme-context";
export interface LoongArkProviderCoreProps extends CreateThemeOptions {
  styleBootstrap?: StyleBootstrap;
}
export const createLoongArkProvider = (bootstrap: StyleBootstrap) => {
  const Provider: ParentComponent<LoongArkProviderCoreProps> = (props) => {
    let scope!: HTMLDivElement;
    const scopeId = createUniqueId();
    const state = createMemo(() => ({
      bootstrap: props.styleBootstrap ?? bootstrap,
      theme: createLoongArkTheme({
        mode: props.mode,
        brand: props.brand,
        accent: props.accent,
        overrides: props.overrides,
        targetId: props.targetId ?? scopeId,
        motionPreference: props.motionPreference,
        nonce: props.nonce,
      }),
    }));
    const theme = () => state().theme;
    createEffect(() => {
      const instance = theme();
      instance.mount(scope);
      state().bootstrap(instance);
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

  return Provider;
};
export const LoongArkProviderCore = createLoongArkProvider(
  bootstrapPrimitiveBase,
);
