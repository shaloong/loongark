import { mountStyleSheet, StyleHost } from "@shaloong/loongark-theme";
export const mountPrimitiveStyles = (
  key: string,
  css: string,
  host?: StyleHost,
) => mountStyleSheet(`loongark-primitive-${key}`, css, host);
