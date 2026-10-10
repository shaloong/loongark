import { LoongArkTheme } from "@loongark/theme";
import { registry as primitiveRegistry } from "@loongark/primitives";
import { filterBarKitComponent } from "./components/filterBar";
import { layoutCSS } from "./layout";
import { selectionInputsCSS } from "./selection-styles";
import { mediaLayoutCSS } from "./media-layout-styles";
import { actionMediaCSS } from "./speed-dial-styles";
import { questionnaireCSS } from "./questionnaire-styles";
import { messageScrollerCSS } from "./message-scroller-styles";
import { conversationCSS } from "./conversation-styles";


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
