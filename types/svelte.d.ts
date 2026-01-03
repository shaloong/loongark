declare module "svelte" {
  export type ActionReturn<Params = void> = {
    update?: (params?: Params) => void;
    destroy?: () => void;
  } | void;

  export type Action<Element = HTMLElement, Params = void> = (
    node: Element,
    params?: Params
  ) => ActionReturn<Params>;
}

declare module "svelte/action" {
  export type ActionReturn<Params = void> = {
    update?: (params?: Params) => void;
    destroy?: () => void;
  } | void;

  export type Action<Element = HTMLElement, Params = void> = (
    node: Element,
    params?: Params
  ) => ActionReturn<Params>;
}
