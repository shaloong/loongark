declare module "solid-js" {
  export type JSXElement = any;
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
    interface HTMLAttributes<T> {
      children?: JSXElement;
      class?: string;
      className?: string;
      style?: Record<string, unknown>;
      [key: string]: any;
    }
    interface IntrinsicElements {
      [element: string]: any;
    }
  }
}

declare namespace JSX {
  interface HTMLAttributes<T> {
    children?: import("solid-js").JSXElement;
    class?: string;
    className?: string;
    style?: Record<string, unknown>;
    [key: string]: any;
  }
  interface IntrinsicElements {
    [element: string]: any;
  }
}

declare module "solid-js/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
