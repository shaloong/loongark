"use client";

import { createContext, useContext } from "react";
import type { LoongArkTheme } from "@shaloong/loongark-theme";
export const ThemeContext = createContext<LoongArkTheme | null>(null);
export const useOptionalLoongArkTheme = () => useContext(ThemeContext);
