import { TokenTree } from "@loongark/tokens";

export const asTokenTree = (value: unknown): TokenTree =>
  (value ?? {}) as TokenTree;

export const toStringToken = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return `${value}`;
  }
  return fallback;
};

export const toNumberToken = (value: unknown, fallback = 0): number => {
  if (typeof value === "number") {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? fallback : parsed;
  }
  return fallback;
};
