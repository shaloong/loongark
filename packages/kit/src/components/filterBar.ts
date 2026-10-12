import { filterBarPrimitive } from "@loongark/primitives/shared-styles/filter-bar";
import type { KitComponentRegistration } from "../bootstrap";
export const filterBarKitComponent: KitComponentRegistration = {
  name: "filter-bar",
  mount: filterBarPrimitive.apply,
};
