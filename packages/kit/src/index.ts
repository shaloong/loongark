import { LoongArkTheme } from "@loongark/theme";
import { registry as primitiveRegistry } from "@loongark/primitives";
import { filterBarKitComponent } from "./components/filterBar";

export interface KitComponentRegistration {
  name: string;
  mount(theme: LoongArkTheme): void;
}

export const kitRegistry: KitComponentRegistration[] = [];

export const registerKitComponent = (component: KitComponentRegistration) => {
  kitRegistry.push(component);
};

export const bootstrapKit = (theme: LoongArkTheme) => {
  primitiveRegistry.forEach((primitive) => primitive.apply(theme));
  kitRegistry.forEach((component) => component.mount(theme));
};

registerKitComponent(filterBarKitComponent);
