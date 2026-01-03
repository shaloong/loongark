declare module "react" {
  export type ReactNode = unknown;

  export type Ref<T> =
    | { current: T | null }
    | ((instance: T | null) => void)
    | null;

  export interface ForwardRefExoticComponent<P> {
    (props: P & { children?: ReactNode } & { ref?: Ref<any> }): ReactNode;
    displayName?: string;
  }

  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactNode;
  }

  export interface Context<T> {
    Provider: FC<{ value: T; children?: ReactNode }>;
  }

  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
  export function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
  export function createElement(
    type: any,
    props: Record<string, unknown> | null,
    ...children: ReactNode[]
  ): ReactNode;
  export function useState<T>(
    initial: T
  ): [T, (value: T | ((prev: T) => T)) => void];
  export function forwardRef<T, P = {}>(
    render: (props: P, ref: Ref<T>) => ReactNode
  ): ForwardRefExoticComponent<P>;
}

declare module "react/jsx-runtime" {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}
