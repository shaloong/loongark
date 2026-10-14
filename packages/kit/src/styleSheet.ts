import { mountStyleSheet, StyleHost } from "@shaloong/loongark-theme";
export const mountKitStyles = (key: string, css: string, host?: StyleHost) =>
  mountStyleSheet(`loongark-kit-${key}`, css, host);
