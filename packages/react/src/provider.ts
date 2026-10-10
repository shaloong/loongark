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
} from "@loongark/theme";
import { bootstrapKit } from "@loongark/kit/bootstrap";

import { ThemeContext } from "./theme-context";
const useThemeEffect =
  typeof document === "undefined" ? useEffect : useLayoutEffect;

export interface LoongArkProviderProps extends CreateThemeOptions {
  mode?: "light" | "dark" | "high-contrast";
  brand?: string;
  accent?: string;
  overrides?: CreateThemeOptions["overrides"];
  children?: ReactNode;
}

export const LoongArkProvider: FC<LoongArkProviderProps> = ({
  children,
  mode,
  brand,
  accent,
  overrides,
  targetId,
  motionPreference,
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
    });
    return instance;
  }, [mode, brand, accent, overrides, targetId, scopeId, motionPreference]);
  const scope = useRef<HTMLDivElement | null>(null);

  useThemeEffect(() => {
    if (!scope.current) return;
    theme.mount(scope.current);
    bootstrapKit(theme);
    return () => theme.unmount();
  }, [theme]);

  return createElement(
    ThemeContext.Provider,
    { value: theme },
    createElement(
      "div",
      { ref: scope, "data-lk-theme": theme.id, style: { display: "contents" } },
      children,
    ),
  );
};

export const useLoongArkTheme = () => {
  const theme = useContext(ThemeContext);
  if (!theme) {
    throw new Error("LoongArk theme context is missing");
  }
  return theme;
};
