import { LoongArkTheme } from "@loongark/theme";
import type { TokenPath } from "@loongark/tokens";

export interface PrimitiveContract<TProps> {
  name: string;
  tokens: TokenPath[];
  defaults: Partial<TProps>;
}

export interface PrimitiveRegistration<TProps> {
  contract: PrimitiveContract<TProps>;
  apply(theme: LoongArkTheme): void;
}

export const createPrimitive = <TProps>(
  contract: PrimitiveContract<TProps>,
  apply: (theme: LoongArkTheme) => void,
): PrimitiveRegistration<TProps> => ({ contract, apply });

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
