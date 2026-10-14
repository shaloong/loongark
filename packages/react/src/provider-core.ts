"use client";

import {
  useContext,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
  useId,
  createElement,
  ReactNode,
  FC,
} from "react";
import {
  createLoongArkTheme,
  LoongArkTheme,
  type CreateThemeOptions,
} from "@shaloong/loongark-theme";
import {
  bootstrapPrimitiveBase,
  type StyleBootstrap,
} from "@shaloong/loongark-primitives/styles";

import { ThemeContext } from "./theme-context";
const useThemeEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;

export interface LoongArkProviderCoreProps extends CreateThemeOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
  overrides?: CreateThemeOptions["overrides"];
  children?: ReactNode;
  styleBootstrap?: StyleBootstrap;
}

export const createLoongArkProvider = (bootstrap: StyleBootstrap) => {
  const Provider: FC<LoongArkProviderCoreProps> = ({
    children,
    mode,
    brand,
    accent,
    overrides,
    targetId,
    motionPreference,
    nonce,
    styleBootstrap = bootstrap,
  }) => {
    const scopeId = useId();
    const theme = useMemo(() => {
      const instance = createLoongArkTheme({
        mode,
        brand,
        accent,
        overrides,
        targetId: targetId ?? scopeId,
        motionPreference,
        nonce,
      });
      return instance;
    }, [
      mode,
      brand,
      accent,
      overrides,
      targetId,
      scopeId,
      motionPreference,
      nonce,
      styleBootstrap,
    ]);
    const scope = useRef<HTMLDivElement | null>(null);

    useThemeEffect(() => {
      if (!scope.current) return;
      theme.mount(scope.current);
      styleBootstrap(theme);
      return () => theme.unmount();
    }, [theme, styleBootstrap]);

    return createElement(
      ThemeContext.Provider,
      { value: theme },
      createElement(
        "div",
        {
          ref: scope,
          "data-lk-theme": theme.id,
          style: { display: "contents" },
        },
        children,
      ),
    );
  };

  return Provider;
};
export const LoongArkProviderCore = createLoongArkProvider(
  bootstrapPrimitiveBase,
);

export const useLoongArkTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("LoongArk theme context is missing");
  }
  return theme;
};
