declare module "react" {
  export type ReactNode = any;
  export type Key = string | number;

  export interface Attributes {
    key?: Key;
  }

  export interface ChangeEvent<T> {
    target: T & { value: string };
    currentTarget: T;
  }

  export type Ref<T> =
    | { current: T | null }
    | ((instance: T | null) => void)
    | null;

  export interface RefAttributes<T> extends Attributes {
    ref?: Ref<T>;
  }

  export interface HTMLAttributes<T> extends Attributes {
    children?: ReactNode;
    className?: string;
    style?: Record<string, unknown>;
    [key: string]: any;
  }

  export interface InputHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    readOnly?: boolean;
    placeholder?: string;
    value?: string | number | readonly string[];
    defaultValue?: string | number | readonly string[];
    type?: string;
    onChange?: (event: ChangeEvent<T>) => void;
  }

  export interface ButtonHTMLAttributes<T> extends HTMLAttributes<T> {
    disabled?: boolean;
    type?: "button" | "submit" | "reset" | string;
    onClick?: (event: any) => void;
  }

  export interface ForwardRefExoticComponent<P> {
    (props: P & { children?: ReactNode } & RefAttributes<any>): ReactNode;
    displayName?: string;
  }

  export interface FC<P = {}> {
    (props: P & { children?: ReactNode } & RefAttributes<any>): ReactNode;
  }

  export interface Context<T> {
    Provider: FC<{ value: T; children?: ReactNode }>;
  }

  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function useEffect(
    effect: () => void | (() => void),
    deps?: readonly unknown[]
  ): void;
  export function createElement(
    type: any,
    props: Record<string, unknown> | null,
    ...children: ReactNode[]
  ): ReactNode;
  export function forwardRef<T, P = {}>(
    render: (props: P, ref: Ref<T>) => ReactNode
  ): ForwardRefExoticComponent<P>;
  export function useState<T>(
    initialValue: T | (() => T)
  ): [T, (value: T | ((prev: T) => T)) => void];

  export type ComponentPropsWithoutRef<T> = T extends (
    props: infer P
  ) => ReactNode
    ? Omit<P, "ref">
    : T extends keyof JSX.IntrinsicElements
      ? JSX.IntrinsicElements[T]
      : any;

  export namespace JSX {
    interface IntrinsicAttributes {
      key?: Key;
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends ReactNode {}
  }

  export const Fragment: any;
}

declare global {
  namespace JSX {
    interface IntrinsicAttributes {
      key?: React.Key;
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactNode {}
  }
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
  export namespace JSX {
    interface IntrinsicAttributes {
      key?: React.Key;
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactNode {}
  }
}
