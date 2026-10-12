import { bootstrapKit } from "@loongark/kit/bootstrap";
import { createLoongArkProvider } from "./provider-core";
export { themeKey, useOptionalTheme, useLoongArkTheme } from "./provider-core";
export const LoongArkProvider = createLoongArkProvider(bootstrapKit);
