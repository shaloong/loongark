import { mountStyleSheet, StyleHost } from "@loongark/theme";
export const mountKitStyles = (key: string, css: string, host?: StyleHost) =>
  mountStyleSheet(`loongark-kit-${key}`, css, host);
