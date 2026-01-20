import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { SelectSize } from "@loongark/primitives";

const selectContextKey = Symbol("loongark-select-size");

export const createSelectSizeContext = (size: SelectSize) => {
  const store = writable<SelectSize>(size);
  setContext(selectContextKey, store);
  return store;
};

export const getSelectSize = (fallback: SelectSize = "md") =>
  getContext<Writable<SelectSize>>(selectContextKey) ??
  writable<SelectSize>(fallback);
