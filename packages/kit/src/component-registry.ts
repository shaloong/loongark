import type { LoongArkTheme } from "@loongark/theme";

export interface KitComponentRegistration {
  name: string;
  mount(theme: LoongArkTheme): void;
}

export const kitRegistry: KitComponentRegistration[] = [];

export const registerKitComponent = (component: KitComponentRegistration) => {
  const index = kitRegistry.findIndex((registered) => registered.name === component.name);
  if (index >= 0) kitRegistry[index] = component;
  else kitRegistry.push(component);
};
