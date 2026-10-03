import { createContext, useContext } from "react";
import type { LoongArkTheme } from "@loongark/theme";
export const ThemeContext = createContext<LoongArkTheme | null>(null);
export const useOptionalLoongArkTheme = () => useContext(ThemeContext);
