declare module "*.svelte" {
  const component: any;
  export default component;
}

declare module "svelte" {
  export type ActionReturn<Params = void> = {
    update?: (params?: Params) => void;
    destroy?: () => void;
  } | void;

  export type Action<Element = HTMLElement, Params = void> = (
    node: Element,
    params?: Params
  ) => ActionReturn<Params>;

  export function getContext<T>(key: any): T;
  export function setContext<T>(key: any, value: T): T;
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
