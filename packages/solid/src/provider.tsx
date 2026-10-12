import { bootstrapKit } from "@loongark/kit/bootstrap";
import { createLoongArkProvider } from "./provider-core";
export type { LoongArkProviderCoreProps as LoongArkProviderProps } from "./provider-core";
export const LoongArkProvider = createLoongArkProvider(bootstrapKit);
