import { mountStyleSheet, StyleHost } from "@loongark/theme";
export const mountPrimitiveStyles = (
  key: string,
  css: string,
  host?: StyleHost,
) => mountStyleSheet(`loongark-primitive-${key}`, css, host);
