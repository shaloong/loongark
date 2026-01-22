import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { DatePickerSize } from "@loongark/primitives";

const datePickerContextKey = Symbol("loongark-date-picker-size");

export const createDatePickerSizeContext = (size: DatePickerSize) => {
  const store = writable<DatePickerSize>(size);
  setContext(datePickerContextKey, store);
  return store;
};

export const getDatePickerSize = (fallback: DatePickerSize = "md") =>
  getContext<Writable<DatePickerSize>>(datePickerContextKey) ??
  writable<DatePickerSize>(fallback);
