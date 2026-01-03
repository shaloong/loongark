import { LoongArkTheme } from "@loongark/theme";

export interface PrimitiveContract<TProps> {
  name: string;
  tokens: string[];
  defaults: Partial<TProps>;
}

export interface PrimitiveRegistration<TProps> {
  contract: PrimitiveContract<TProps>;
  apply(theme: LoongArkTheme): void;
}

export const createPrimitive = <TProps>(
  contract: PrimitiveContract<TProps>,
  apply: (theme: LoongArkTheme) => void
): PrimitiveRegistration<TProps> => ({ contract, apply });

export const registry: PrimitiveRegistration<unknown>[] = [];

export const registerPrimitive = <TProps>(
  primitive: PrimitiveRegistration<TProps>
) => {
  registry.push(primitive);
};
