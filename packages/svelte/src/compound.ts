import LoongArkDialogRootComponent from "./components/DialogRoot.svelte";
import LoongArkDialogPositionerComponent from "./components/DialogPositioner.svelte";
import LoongArkDialogPortalComponent from "./components/Portal.svelte";
import LoongArkDialogTriggerComponent from "./components/DialogTrigger.svelte";
import LoongArkDialogOverlayComponent from "./components/DialogOverlay.svelte";
import LoongArkDialogContentComponent from "./components/DialogContent.svelte";
import LoongArkDialogTitleComponent from "./components/DialogTitle.svelte";
import LoongArkDialogDescriptionComponent from "./components/DialogDescription.svelte";
import LoongArkDialogCloseTriggerComponent from "./components/DialogCloseTrigger.svelte";
import LoongArkDialogFooterComponent from "./components/DialogFooter.svelte";
import LoongArkPinInputRootComponent from "./components/PinInputRoot.svelte";
import LoongArkPinInputControlComponent from "./components/PinInputControl.svelte";
import LoongArkPinInputInputComponent from "./components/PinInputInput.svelte";
import LoongArkPinInputLabelComponent from "./components/PinInputLabel.svelte";
import LoongArkPinInputHiddenInputComponent from "./components/PinInputHiddenInput.svelte";
import LoongArkSwitchRootComponent from "./components/SwitchRoot.svelte";
import LoongArkSwitchHiddenInputComponent from "./components/SwitchHiddenInput.svelte";
import LoongArkSwitchControlComponent from "./components/SwitchControl.svelte";
import LoongArkSwitchThumbComponent from "./components/SwitchThumb.svelte";
import LoongArkSwitchLabelComponent from "./components/SwitchLabel.svelte";
export const LoongArkDialog = {
  Portal: LoongArkDialogPortalComponent,
  Positioner: LoongArkDialogPositionerComponent,
  Root: LoongArkDialogRootComponent,
  Trigger: LoongArkDialogTriggerComponent,
  Overlay: LoongArkDialogOverlayComponent,
  Content: LoongArkDialogContentComponent,
  Title: LoongArkDialogTitleComponent,
  Description: LoongArkDialogDescriptionComponent,
  Footer: LoongArkDialogFooterComponent,
  CloseTrigger: LoongArkDialogCloseTriggerComponent,
};

export const LoongArkPinInput = {
  Root: LoongArkPinInputRootComponent,
  Control: LoongArkPinInputControlComponent,
  Input: LoongArkPinInputInputComponent,
  Label: LoongArkPinInputLabelComponent,
  HiddenInput: LoongArkPinInputHiddenInputComponent,
};

export const LoongArkSwitch = {
  HiddenInput: LoongArkSwitchHiddenInputComponent,
  Root: LoongArkSwitchRootComponent,
  Control: LoongArkSwitchControlComponent,
  Thumb: LoongArkSwitchThumbComponent,
  Label: LoongArkSwitchLabelComponent,
};
