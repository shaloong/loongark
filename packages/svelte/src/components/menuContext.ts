import { getContext, setContext } from "svelte";
import { writable, type Writable } from "svelte/store";
import type { MenuSize } from "@loongark/primitives";

const menuContextKey = Symbol("loongark-menu-size");

export const createMenuSizeContext = (size: MenuSize) => {
  const store = writable<MenuSize>(size);
  setContext(menuContextKey, store);
  return store;
};

export const getMenuSize = (fallback: MenuSize = "md") =>
  getContext<Writable<MenuSize>>(menuContextKey) ?? writable<MenuSize>(fallback);
