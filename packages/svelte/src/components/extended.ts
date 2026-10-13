import { withAutomaticStyles } from "@loongark/primitives/automatic";
import { styles as lkAutomaticAngleSliderStyles } from "@loongark/primitives/automatic-styles/angle-slider";
import { styles as lkAutomaticFieldStyles } from "@loongark/primitives/automatic-styles/field";
import { styles as lkAutomaticFieldsetStyles } from "@loongark/primitives/automatic-styles/fieldset";
import { styles as lkAutomaticFloatingPanelStyles } from "@loongark/primitives/automatic-styles/floating-panel";
import { styles as lkAutomaticMarqueeStyles } from "@loongark/primitives/automatic-styles/marquee";
import { styles as lkAutomaticQrCodeStyles } from "@loongark/primitives/automatic-styles/qr-code";
import { styles as lkAutomaticSignaturePadStyles } from "@loongark/primitives/automatic-styles/signature-pad";
import { styles as lkAutomaticTimerStyles } from "@loongark/primitives/automatic-styles/timer";
import { styles as lkAutomaticTourStyles } from "@loongark/primitives/automatic-styles/tour";

// Ark 是四端交互与无障碍的唯一行为来源，外观由共享 Primitive 管理。
import { Field } from "@ark-ui/svelte/field";
export const LoongArkField: typeof Field = /*#__PURE__*/ withAutomaticStyles(Field, lkAutomaticFieldStyles);
export const LoongArkFieldContext: typeof Field.Context = /*#__PURE__*/ withAutomaticStyles(Field.Context, lkAutomaticFieldStyles);
export const LoongArkFieldErrorText: typeof Field.ErrorText = /*#__PURE__*/ withAutomaticStyles(Field.ErrorText, lkAutomaticFieldStyles);
export const LoongArkFieldHelperText: typeof Field.HelperText =
  /*#__PURE__*/ withAutomaticStyles(Field.HelperText, lkAutomaticFieldStyles);
export const LoongArkFieldInput: typeof Field.Input = /*#__PURE__*/ withAutomaticStyles(Field.Input, lkAutomaticFieldStyles);
export const LoongArkFieldLabel: typeof Field.Label = /*#__PURE__*/ withAutomaticStyles(Field.Label, lkAutomaticFieldStyles);
export const LoongArkFieldRequiredIndicator: typeof Field.RequiredIndicator =
  /*#__PURE__*/ withAutomaticStyles(Field.RequiredIndicator, lkAutomaticFieldStyles);
export const LoongArkFieldRoot: typeof Field.Root = /*#__PURE__*/ withAutomaticStyles(Field.Root, lkAutomaticFieldStyles);
export const LoongArkFieldRootProvider: typeof Field.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Field.RootProvider, lkAutomaticFieldStyles);
export const LoongArkFieldSelect: typeof Field.Select = /*#__PURE__*/ withAutomaticStyles(Field.Select, lkAutomaticFieldStyles);
export const LoongArkFieldTextarea: typeof Field.Textarea = /*#__PURE__*/ withAutomaticStyles(Field.Textarea, lkAutomaticFieldStyles);
import { Fieldset } from "@ark-ui/svelte/fieldset";
export const LoongArkFieldset: typeof Fieldset = /*#__PURE__*/ withAutomaticStyles(Fieldset, lkAutomaticFieldsetStyles);
export const LoongArkFieldsetContext: typeof Fieldset.Context =
  /*#__PURE__*/ withAutomaticStyles(Fieldset.Context, lkAutomaticFieldsetStyles);
export const LoongArkFieldsetErrorText: typeof Fieldset.ErrorText =
  /*#__PURE__*/ withAutomaticStyles(Fieldset.ErrorText, lkAutomaticFieldsetStyles);
export const LoongArkFieldsetHelperText: typeof Fieldset.HelperText =
  /*#__PURE__*/ withAutomaticStyles(Fieldset.HelperText, lkAutomaticFieldsetStyles);
export const LoongArkFieldsetLegend: typeof Fieldset.Legend = /*#__PURE__*/ withAutomaticStyles(Fieldset.Legend, lkAutomaticFieldsetStyles);
export const LoongArkFieldsetRoot: typeof Fieldset.Root = /*#__PURE__*/ withAutomaticStyles(Fieldset.Root, lkAutomaticFieldsetStyles);
export const LoongArkFieldsetRootProvider: typeof Fieldset.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Fieldset.RootProvider, lkAutomaticFieldsetStyles);
import { AngleSlider } from "@ark-ui/svelte/angle-slider";
export const LoongArkAngleSlider: typeof AngleSlider = /*#__PURE__*/ withAutomaticStyles(AngleSlider, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderContext: typeof AngleSlider.Context =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.Context, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderRoot: typeof AngleSlider.Root =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.Root, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderRootProvider: typeof AngleSlider.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.RootProvider, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderLabel: typeof AngleSlider.Label =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.Label, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderControl: typeof AngleSlider.Control =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.Control, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderThumb: typeof AngleSlider.Thumb =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.Thumb, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderMarkerGroup: typeof AngleSlider.MarkerGroup =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.MarkerGroup, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderMarker: typeof AngleSlider.Marker =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.Marker, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderValueText: typeof AngleSlider.ValueText =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.ValueText, lkAutomaticAngleSliderStyles);
export const LoongArkAngleSliderHiddenInput: typeof AngleSlider.HiddenInput =
  /*#__PURE__*/ withAutomaticStyles(AngleSlider.HiddenInput, lkAutomaticAngleSliderStyles);
import { FloatingPanel } from "@ark-ui/svelte/floating-panel";
export const LoongArkFloatingPanel: typeof FloatingPanel = /*#__PURE__*/ withAutomaticStyles(FloatingPanel, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelBody: typeof FloatingPanel.Body =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Body, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelCloseTrigger: typeof FloatingPanel.CloseTrigger =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.CloseTrigger, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelContent: typeof FloatingPanel.Content =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Content, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelContext: typeof FloatingPanel.Context =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Context, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelControl: typeof FloatingPanel.Control =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Control, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelDragTrigger: typeof FloatingPanel.DragTrigger =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.DragTrigger, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelHeader: typeof FloatingPanel.Header =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Header, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelPositioner: typeof FloatingPanel.Positioner =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Positioner, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelResizeTrigger: typeof FloatingPanel.ResizeTrigger =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.ResizeTrigger, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelRoot: typeof FloatingPanel.Root =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Root, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelRootProvider: typeof FloatingPanel.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.RootProvider, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelStageTrigger: typeof FloatingPanel.StageTrigger =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.StageTrigger, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelTitle: typeof FloatingPanel.Title =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Title, lkAutomaticFloatingPanelStyles);
export const LoongArkFloatingPanelTrigger: typeof FloatingPanel.Trigger =
  /*#__PURE__*/ withAutomaticStyles(FloatingPanel.Trigger, lkAutomaticFloatingPanelStyles);
import { Marquee } from "@ark-ui/svelte/marquee";
export const LoongArkMarquee: typeof Marquee = /*#__PURE__*/ withAutomaticStyles(Marquee, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeContent: typeof Marquee.Content = /*#__PURE__*/ withAutomaticStyles(Marquee.Content, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeContext: typeof Marquee.Context = /*#__PURE__*/ withAutomaticStyles(Marquee.Context, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeEdge: typeof Marquee.Edge = /*#__PURE__*/ withAutomaticStyles(Marquee.Edge, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeItem: typeof Marquee.Item = /*#__PURE__*/ withAutomaticStyles(Marquee.Item, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeRoot: typeof Marquee.Root = /*#__PURE__*/ withAutomaticStyles(Marquee.Root, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeRootProvider: typeof Marquee.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Marquee.RootProvider, lkAutomaticMarqueeStyles);
export const LoongArkMarqueeViewport: typeof Marquee.Viewport =
  /*#__PURE__*/ withAutomaticStyles(Marquee.Viewport, lkAutomaticMarqueeStyles);
import { QrCode } from "@ark-ui/svelte/qr-code";
export const LoongArkQrCode: typeof QrCode = /*#__PURE__*/ withAutomaticStyles(QrCode, lkAutomaticQrCodeStyles);
export const LoongArkQrCodeContext: typeof QrCode.Context = /*#__PURE__*/ withAutomaticStyles(QrCode.Context, lkAutomaticQrCodeStyles);
export const LoongArkQrCodeDownloadTrigger: typeof QrCode.DownloadTrigger =
  /*#__PURE__*/ withAutomaticStyles(QrCode.DownloadTrigger, lkAutomaticQrCodeStyles);
export const LoongArkQrCodeFrame: typeof QrCode.Frame = /*#__PURE__*/ withAutomaticStyles(QrCode.Frame, lkAutomaticQrCodeStyles);
export const LoongArkQrCodeOverlay: typeof QrCode.Overlay = /*#__PURE__*/ withAutomaticStyles(QrCode.Overlay, lkAutomaticQrCodeStyles);
export const LoongArkQrCodePattern: typeof QrCode.Pattern = /*#__PURE__*/ withAutomaticStyles(QrCode.Pattern, lkAutomaticQrCodeStyles);
export const LoongArkQrCodeRoot: typeof QrCode.Root = /*#__PURE__*/ withAutomaticStyles(QrCode.Root, lkAutomaticQrCodeStyles);
export const LoongArkQrCodeRootProvider: typeof QrCode.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(QrCode.RootProvider, lkAutomaticQrCodeStyles);
export const LoongArkQRCode: typeof QrCode = /*#__PURE__*/ withAutomaticStyles(QrCode, lkAutomaticQrCodeStyles);
import { SignaturePad } from "@ark-ui/svelte/signature-pad";
export const LoongArkSignaturePad: typeof SignaturePad = /*#__PURE__*/ withAutomaticStyles(SignaturePad, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadClearTrigger: typeof SignaturePad.ClearTrigger =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.ClearTrigger, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadContext: typeof SignaturePad.Context =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.Context, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadControl: typeof SignaturePad.Control =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.Control, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadGuide: typeof SignaturePad.Guide =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.Guide, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadHiddenInput: typeof SignaturePad.HiddenInput =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.HiddenInput, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadLabel: typeof SignaturePad.Label =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.Label, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadRoot: typeof SignaturePad.Root =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.Root, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadRootProvider: typeof SignaturePad.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.RootProvider, lkAutomaticSignaturePadStyles);
export const LoongArkSignaturePadSegment: typeof SignaturePad.Segment =
  /*#__PURE__*/ withAutomaticStyles(SignaturePad.Segment, lkAutomaticSignaturePadStyles);
import { Timer } from "@ark-ui/svelte/timer";
export const LoongArkTimer: typeof Timer = /*#__PURE__*/ withAutomaticStyles(Timer, lkAutomaticTimerStyles);
export const LoongArkTimerActionTrigger: typeof Timer.ActionTrigger =
  /*#__PURE__*/ withAutomaticStyles(Timer.ActionTrigger, lkAutomaticTimerStyles);
export const LoongArkTimerArea: typeof Timer.Area = /*#__PURE__*/ withAutomaticStyles(Timer.Area, lkAutomaticTimerStyles);
export const LoongArkTimerContext: typeof Timer.Context = /*#__PURE__*/ withAutomaticStyles(Timer.Context, lkAutomaticTimerStyles);
export const LoongArkTimerControl: typeof Timer.Control = /*#__PURE__*/ withAutomaticStyles(Timer.Control, lkAutomaticTimerStyles);
export const LoongArkTimerItem: typeof Timer.Item = /*#__PURE__*/ withAutomaticStyles(Timer.Item, lkAutomaticTimerStyles);
export const LoongArkTimerRoot: typeof Timer.Root = /*#__PURE__*/ withAutomaticStyles(Timer.Root, lkAutomaticTimerStyles);
export const LoongArkTimerRootProvider: typeof Timer.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Timer.RootProvider, lkAutomaticTimerStyles);
export const LoongArkTimerSeparator: typeof Timer.Separator = /*#__PURE__*/ withAutomaticStyles(Timer.Separator, lkAutomaticTimerStyles);
import { Tour } from "@ark-ui/svelte/tour";
export const LoongArkTour: typeof Tour = /*#__PURE__*/ withAutomaticStyles(Tour, lkAutomaticTourStyles);
export const LoongArkTourActionTrigger: typeof Tour.ActionTrigger =
  /*#__PURE__*/ withAutomaticStyles(Tour.ActionTrigger, lkAutomaticTourStyles);
export const LoongArkTourActions: typeof Tour.Actions = /*#__PURE__*/ withAutomaticStyles(Tour.Actions, lkAutomaticTourStyles);
export const LoongArkTourArrow: typeof Tour.Arrow = /*#__PURE__*/ withAutomaticStyles(Tour.Arrow, lkAutomaticTourStyles);
export const LoongArkTourArrowTip: typeof Tour.ArrowTip = /*#__PURE__*/ withAutomaticStyles(Tour.ArrowTip, lkAutomaticTourStyles);
export const LoongArkTourBackdrop: typeof Tour.Backdrop = /*#__PURE__*/ withAutomaticStyles(Tour.Backdrop, lkAutomaticTourStyles);
export const LoongArkTourCloseTrigger: typeof Tour.CloseTrigger =
  /*#__PURE__*/ withAutomaticStyles(Tour.CloseTrigger, lkAutomaticTourStyles);
export const LoongArkTourContent: typeof Tour.Content = /*#__PURE__*/ withAutomaticStyles(Tour.Content, lkAutomaticTourStyles);
export const LoongArkTourContext: typeof Tour.Context = /*#__PURE__*/ withAutomaticStyles(Tour.Context, lkAutomaticTourStyles);
export const LoongArkTourControl: typeof Tour.Control = /*#__PURE__*/ withAutomaticStyles(Tour.Control, lkAutomaticTourStyles);
export const LoongArkTourDescription: typeof Tour.Description =
  /*#__PURE__*/ withAutomaticStyles(Tour.Description, lkAutomaticTourStyles);
export const LoongArkTourPositioner: typeof Tour.Positioner = /*#__PURE__*/ withAutomaticStyles(Tour.Positioner, lkAutomaticTourStyles);
export const LoongArkTourProgressText: typeof Tour.ProgressText =
  /*#__PURE__*/ withAutomaticStyles(Tour.ProgressText, lkAutomaticTourStyles);
export const LoongArkTourRoot: typeof Tour.Root = /*#__PURE__*/ withAutomaticStyles(Tour.Root, lkAutomaticTourStyles);
export const LoongArkTourSpotlight: typeof Tour.Spotlight = /*#__PURE__*/ withAutomaticStyles(Tour.Spotlight, lkAutomaticTourStyles);
export const LoongArkTourTitle: typeof Tour.Title = /*#__PURE__*/ withAutomaticStyles(Tour.Title, lkAutomaticTourStyles);
export { useTour } from "@ark-ui/svelte/tour";
