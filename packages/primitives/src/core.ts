import { LoongArkTheme } from "@shaloong/loongark-theme";
import type { TokenPath } from "@shaloong/loongark-tokens";

export interface PrimitiveContract<TProps> {
  name: string;
  tokens: TokenPath[];
  defaults: Partial<TProps>;
}

export interface PrimitiveRegistration<TProps> {
  contract: PrimitiveContract<TProps>;
  apply(theme: LoongArkTheme): void;
  /** 拆分规则对应的原注册名，用于保留调用方覆盖。 */
  sourceContract?: string;
}

export const createPrimitive = <TProps>(
  contract: PrimitiveContract<TProps>,
  apply: (theme: LoongArkTheme) => void,
  sourceContract?: string,
): PrimitiveRegistration<TProps> => ({
  contract,
  apply,
  ...(sourceContract ? { sourceContract } : {}),
});

export const registry: PrimitiveRegistration<unknown>[] = [];

export const registerPrimitive = <TProps>(
  primitive: PrimitiveRegistration<TProps>,
) => {
  const existingIndex = registry.findIndex(
    (registered) => registered.contract.name === primitive.contract.name,
  );

  if (existingIndex >= 0) {
    registry[existingIndex] = primitive as PrimitiveRegistration<unknown>;
    return;
  }

  registry.push(primitive as PrimitiveRegistration<unknown>);
};
