import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { ComboboxSize } from "@loongark/primitives";

const comboboxContextKey = Symbol("loongark-combobox-size");

export const createComboboxSizeContext = (size: ComboboxSize) => {
  const store = writable<ComboboxSize>(size);
  setContext(comboboxContextKey, store);
  return store;
};

export const getComboboxSize = (fallback: ComboboxSize = "md") =>
  getContext<Writable<ComboboxSize>>(comboboxContextKey) ??
  writable<ComboboxSize>(fallback);
