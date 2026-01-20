import { TokenTree } from "@loongark/tokens";

/**
 * 将值转换为 TokenTree，带类型检查和调试日志
 * @param value - 要转换的值
 * @param path - 用于调试的 token 路径
 */
export const asTokenTree = (
  value: unknown,
  path: string = "root"
): TokenTree => {
  if (value === null || value === undefined) {
    if (typeof window !== "undefined" && typeof console !== "undefined") {
      console.warn(
        `[LoongArk] Token at path "${path}" is null/undefined, using empty object as fallback`
      );
    }
    return {};
  }
  if (typeof value !== "object" || Array.isArray(value)) {
    if (typeof window !== "undefined" && typeof console !== "undefined") {
      console.warn(
        `[LoongArk] Token at path "${path}" is not an object, got ${typeof value}, using empty object as fallback`
      );
    }
    return {};
  }
  return value as TokenTree;
};

/**
 * 将值转换为字符串 token，支持类型转换
 * @param value - 要转换的值
 * @param fallback - 转换失败时的降级值
 */
export const toStringToken = (value: unknown, fallback = ""): string => {
  if (typeof value === "string") {
    return value;
  }
  if (typeof value === "number") {
    return `${value}`;
  }
  return fallback;
};

/**
 * 将值转换为数字 token，支持字符串解析
 * @param value - 要转换的值
 * @param fallback - 转换失败时的降级值
 */
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
