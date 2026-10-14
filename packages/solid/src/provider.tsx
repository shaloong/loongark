import { bootstrapKitAutomatic } from "@shaloong/loongark-kit/automatic-bootstrap";
import { createLoongArkProvider } from "./provider-core";
export type { LoongArkProviderCoreProps as LoongArkProviderProps } from "./provider-core";
export const LoongArkProvider = createLoongArkProvider(bootstrapKitAutomatic);
