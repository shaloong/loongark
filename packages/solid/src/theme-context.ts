import { createContext, useContext, type Accessor } from "solid-js";
import type { LoongArkTheme } from "@loongark/theme";
export const ThemeContext = createContext<
  Accessor<LoongArkTheme> | undefined
>();
export const useOptionalTheme = () => useContext(ThemeContext);
export const useLoongArkTheme = () => {
  const theme = useOptionalTheme();
  if (!theme) throw new Error("LoongArk theme context is missing");
  return theme();
};
