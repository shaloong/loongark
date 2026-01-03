declare module "solid-js" {
  export type JSXElement = unknown;
  export type Accessor<T> = () => T;
  export type Setter<T> = (value: T | ((prev: T) => T)) => T;
  export interface ParentProps {
    children?: JSXElement;
  }
  export interface ParentComponent<P = {}> {
    (props: P & ParentProps): JSXElement;
  }
  export interface Component<P = {}> {
    (props: P): JSXElement;
  }
  export function createContext<T>(value?: T): any;
  export function useContext<T>(context: any): T;
  export function createMemo<T>(factory: () => T): Accessor<T>;
  export function mergeProps<T extends object, U extends object>(
    source: T,
    other?: U
  ): T & U;
  export function createSignal<T>(value: T): [Accessor<T>, Setter<T>];
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
