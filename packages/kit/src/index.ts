import { LoongArkTheme } from "@loongark/theme";
import { registry as primitiveRegistry } from "@loongark/primitives";
import { filterBarKitComponent } from "./components/filterBar";
import { layoutCSS } from "./layout";
import { selectionInputsCSS } from "./selection-styles";
import { mediaLayoutCSS } from "./media-layout";
import { actionMediaCSS } from "./speed-dial";
import { questionnaireCSS } from "./questionnaire";
export * from "./questionnaire";
import { messageScrollerCSS } from "./message-scroller";
export * from "./message-scroller";
import { conversationCSS } from "./conversation";
export * from "./conversation";
export * from "./layout";
export * from "./menubar";
export * from "./data-models";
export * from "./data-table";
export * from "./transfer-list";
export * from "./time-picker";
export * from "./textarea-autosize";
export * from "./media-layout";
export * from "./speed-dial";

export { mountKitStyles } from "./styleSheet";
export { filterBarKitComponent } from "./components/filterBar";

export interface KitComponentRegistration {
  name: string;
  mount(theme: LoongArkTheme): void;
}

export const kitRegistry: KitComponentRegistration[] = [];

export const registerKitComponent = (component: KitComponentRegistration) => {
  const existingIndex = kitRegistry.findIndex(
    (registered) => registered.name === component.name,
  );

  if (existingIndex >= 0) {
    kitRegistry[existingIndex] = component;
    return;
  }

  kitRegistry.push(component);
};

export const bootstrapKit = (theme: LoongArkTheme) => {
  primitiveRegistry.forEach((primitive) => primitive.apply(theme));
  kitRegistry.forEach((component) => component.mount(theme));
  theme.mountStyles(
    "layout",
    layoutCSS +
      selectionInputsCSS +
      mediaLayoutCSS +
      actionMediaCSS +
      conversationCSS +
      messageScrollerCSS +
      questionnaireCSS,
    "kit",
  );
};

registerKitComponent(filterBarKitComponent);

export * from "./native-select";
export * from "./frame";
export * from "./format";
export * from "./json-tree";
