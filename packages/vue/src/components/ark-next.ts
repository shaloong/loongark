// 原生高级能力；共享外观由 Primitives 注册。
import { DateInput } from "@ark-ui/vue/date-input";
export const LoongArkDateInput: typeof DateInput = DateInput;
export const LoongArkDateInputContext: typeof DateInput.Context =
  DateInput.Context;
export const LoongArkDateInputControl: typeof DateInput.Control =
  DateInput.Control;
export const LoongArkDateInputHiddenInput: typeof DateInput.HiddenInput =
  DateInput.HiddenInput;
export const LoongArkDateInputLabel: typeof DateInput.Label = DateInput.Label;
export const LoongArkDateInputRoot: typeof DateInput.Root = DateInput.Root;
export const LoongArkDateInputRootProvider: typeof DateInput.RootProvider =
  DateInput.RootProvider;
export const LoongArkDateInputSegment: typeof DateInput.Segment =
  DateInput.Segment;
export const LoongArkDateInputSegmentContext: typeof DateInput.SegmentContext =
  DateInput.SegmentContext;
export const LoongArkDateInputSegmentGroup: typeof DateInput.SegmentGroup =
  DateInput.SegmentGroup;
export { useDateInput, useDateInputContext } from "@ark-ui/vue/date-input";
export type {
  UseDateInputProps,
  UseDateInputReturn,
  DateInputRootProps,
} from "@ark-ui/vue/date-input";
import { Swap } from "@ark-ui/vue/swap";
export const LoongArkSwap: typeof Swap = Swap;
export const LoongArkSwapIndicator: typeof Swap.Indicator = Swap.Indicator;
export const LoongArkSwapRoot: typeof Swap.Root = Swap.Root;
export const LoongArkSwapRootProvider: typeof Swap.RootProvider =
  Swap.RootProvider;
export { useSwap, useSwapContext } from "@ark-ui/vue/swap";
export type {
  UseSwapProps,
  UseSwapReturn,
  SwapRootProps,
} from "@ark-ui/vue/swap";
import { Toc } from "@ark-ui/vue/toc";
import { LoongArkTocRoot, LoongArkTocNav } from "./toc";
export { LoongArkTocRoot, LoongArkTocNav };
export const LoongArkToc: Omit<typeof Toc, "Root" | "Nav"> & {
  Root: typeof LoongArkTocRoot;
  Nav: typeof LoongArkTocNav;
} = { ...Toc, Root: LoongArkTocRoot, Nav: LoongArkTocNav };
export const LoongArkTocContent: typeof Toc.Content = Toc.Content;
export const LoongArkTocContext: typeof Toc.Context = Toc.Context;
export const LoongArkTocIndicator: typeof Toc.Indicator = Toc.Indicator;
export const LoongArkTocItem: typeof Toc.Item = Toc.Item;
export const LoongArkTocLink: typeof Toc.Link = Toc.Link;
export const LoongArkTocList: typeof Toc.List = Toc.List;
export const LoongArkTocRootProvider: typeof Toc.RootProvider =
  Toc.RootProvider;
export const LoongArkTocTitle: typeof Toc.Title = Toc.Title;
export { useTocContext } from "@ark-ui/vue/toc";
export { useToc } from "./use-toc";
export type { UseTocProps, UseTocReturn, TocRootProps } from "@ark-ui/vue/toc";
export type {
  DateInputDateValue,
  DateInputSegmentProps,
  DateInputSelectionMode,
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/vue/date-input";
export type { TocItemData, TocActiveChangeDetails } from "@ark-ui/vue/toc";
