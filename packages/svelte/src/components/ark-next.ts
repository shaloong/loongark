import { withAutomaticStyles } from "@shaloong/loongark-primitives/automatic";
import { styles as lkAutomaticDateInputStyles } from "@shaloong/loongark-primitives/automatic-styles/date-input";
import { styles as lkAutomaticSwapStyles } from "@shaloong/loongark-primitives/automatic-styles/swap";
import { styles as lkAutomaticTocStyles } from "@shaloong/loongark-primitives/automatic-styles/toc";

// 原生高级能力；共享外观由 Primitives 注册。
import { DateInput } from "@ark-ui/svelte/date-input";
export const LoongArkDateInput: typeof DateInput = /*#__PURE__*/ withAutomaticStyles(DateInput, lkAutomaticDateInputStyles);
export const LoongArkDateInputContext: typeof DateInput.Context =
  /*#__PURE__*/ withAutomaticStyles(DateInput.Context, lkAutomaticDateInputStyles);
export const LoongArkDateInputControl: typeof DateInput.Control =
  /*#__PURE__*/ withAutomaticStyles(DateInput.Control, lkAutomaticDateInputStyles);
export const LoongArkDateInputHiddenInput: typeof DateInput.HiddenInput =
  /*#__PURE__*/ withAutomaticStyles(DateInput.HiddenInput, lkAutomaticDateInputStyles);
export const LoongArkDateInputLabel: typeof DateInput.Label = /*#__PURE__*/ withAutomaticStyles(DateInput.Label, lkAutomaticDateInputStyles);
export const LoongArkDateInputRoot: typeof DateInput.Root = /*#__PURE__*/ withAutomaticStyles(DateInput.Root, lkAutomaticDateInputStyles);
export const LoongArkDateInputRootProvider: typeof DateInput.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(DateInput.RootProvider, lkAutomaticDateInputStyles);
export const LoongArkDateInputSegment: typeof DateInput.Segment =
  /*#__PURE__*/ withAutomaticStyles(DateInput.Segment, lkAutomaticDateInputStyles);
export const LoongArkDateInputSegmentContext: typeof DateInput.SegmentContext =
  /*#__PURE__*/ withAutomaticStyles(DateInput.SegmentContext, lkAutomaticDateInputStyles);
export const LoongArkDateInputSegmentGroup: typeof DateInput.SegmentGroup =
  /*#__PURE__*/ withAutomaticStyles(DateInput.SegmentGroup, lkAutomaticDateInputStyles);
export { useDateInput, useDateInputContext } from "@ark-ui/svelte/date-input";
export type {
  UseDateInputProps,
  UseDateInputReturn,
  DateInputRootProps,
} from "@ark-ui/svelte/date-input";
import { Swap } from "@ark-ui/svelte/swap";
export const LoongArkSwap: typeof Swap = /*#__PURE__*/ withAutomaticStyles(Swap, lkAutomaticSwapStyles);
export const LoongArkSwapIndicator: typeof Swap.Indicator = /*#__PURE__*/ withAutomaticStyles(Swap.Indicator, lkAutomaticSwapStyles);
export const LoongArkSwapRoot: typeof Swap.Root = /*#__PURE__*/ withAutomaticStyles(Swap.Root, lkAutomaticSwapStyles);
export const LoongArkSwapRootProvider: typeof Swap.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Swap.RootProvider, lkAutomaticSwapStyles);
export { useSwap, useSwapContext } from "@ark-ui/svelte/swap";
export type {
  UseSwapProps,
  UseSwapReturn,
  SwapRootProps,
} from "@ark-ui/svelte/swap";
import { Toc } from "@ark-ui/svelte/toc";
import LoongArkTocRoot from "./TocRoot.svelte";
import LoongArkTocNav from "./TocNav.svelte";
export { LoongArkTocRoot, LoongArkTocNav };
export const LoongArkToc: Omit<typeof Toc, "Root" | "Nav"> & {
  Root: typeof LoongArkTocRoot;
  Nav: typeof LoongArkTocNav;
} = /*#__PURE__*/ withAutomaticStyles({ ...Toc, Root: LoongArkTocRoot, Nav: LoongArkTocNav }, lkAutomaticTocStyles);
export const LoongArkTocContent: typeof Toc.Content = /*#__PURE__*/ withAutomaticStyles(Toc.Content, lkAutomaticTocStyles);
export const LoongArkTocContext: typeof Toc.Context = /*#__PURE__*/ withAutomaticStyles(Toc.Context, lkAutomaticTocStyles);
export const LoongArkTocIndicator: typeof Toc.Indicator = /*#__PURE__*/ withAutomaticStyles(Toc.Indicator, lkAutomaticTocStyles);
export const LoongArkTocItem: typeof Toc.Item = /*#__PURE__*/ withAutomaticStyles(Toc.Item, lkAutomaticTocStyles);
export const LoongArkTocLink: typeof Toc.Link = /*#__PURE__*/ withAutomaticStyles(Toc.Link, lkAutomaticTocStyles);
export const LoongArkTocList: typeof Toc.List = /*#__PURE__*/ withAutomaticStyles(Toc.List, lkAutomaticTocStyles);
export const LoongArkTocRootProvider: typeof Toc.RootProvider =
  /*#__PURE__*/ withAutomaticStyles(Toc.RootProvider, lkAutomaticTocStyles);
export const LoongArkTocTitle: typeof Toc.Title = /*#__PURE__*/ withAutomaticStyles(Toc.Title, lkAutomaticTocStyles);
export { useTocContext } from "@ark-ui/svelte/toc";
export { useToc } from "./use-toc.svelte";
export type {
  UseTocProps,
  UseTocReturn,
  TocRootProps,
} from "@ark-ui/svelte/toc";
export type {
  DateInputDateValue,
  DateInputSegmentProps,
  DateInputSelectionMode,
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/svelte/date-input";
export type { TocItemData, TocActiveChangeDetails } from "@ark-ui/svelte/toc";
