import { bootstrapKitAutomatic } from "@loongark/kit/automatic-bootstrap";
import { createLoongArkProvider } from "./provider-core";
export { themeKey, useOptionalTheme, useLoongArkTheme } from "./provider-core";
export const LoongArkProvider = createLoongArkProvider(bootstrapKitAutomatic);
