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


import { kitRegistry, registerKitComponent } from "./component-registry";
export { kitRegistry, registerKitComponent, type KitComponentRegistration } from "./component-registry";

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
