declare module "solid-js" {
  export type JSXElement = unknown;
  export type Accessor<T> = () => T;
  export interface ParentProps {
    children?: JSXElement;
  }
  export interface ParentComponent<P = {}> {
    (props: P & ParentProps): JSXElement;
  }
  export interface Component<P = {}> {
    (props: P): JSXElement;
  }
  export interface Context<T> {
    Provider: ParentComponent<{ value: T }>;
  }
  export function createContext<T>(value?: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function createEffect(fn: () => void | (() => void)): void;
  export function createMemo<T>(factory: () => T): Accessor<T>;
  export function mergeProps<T extends object, U extends object>(
    source: T,
    other?: U
  ): T & U;
  export function createSignal<T>(
    initialValue: T
  ): [() => T, (value: T | ((prev: T) => T)) => void];
  export function splitProps<T extends object, K extends keyof T>(
    props: T,
    ...keys: K[][]
  ): [Pick<T, K>, Omit<T, K>];

  export namespace JSX {
    type Element = JSXElement;
    interface IntrinsicElements {
      [element: string]: Record<string, unknown>;
    }
  }
}

declare namespace JSX {
  interface IntrinsicElements {
    [element: string]: Record<string, unknown>;
  }
}

declare module "solid-js/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
