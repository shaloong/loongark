declare module "react" {
    type ReactNode = unknown;
    type Ref<T> = {
        current: T | null;
    } | ((instance: T | null) => void) | null;
    interface ForwardRefExoticComponent<P> {
        (props: P & {
            children?: ReactNode;
        } & {
            ref?: Ref<any>;
        }): ReactNode;
        displayName?: string;
    }
    interface FC<P = {}> {
        (props: P & {
            children?: ReactNode;
        }): ReactNode;
    }
    interface Context<T> {
        Provider: FC<{
            value: T;
            children?: ReactNode;
        }>;
    }
    function createContext<T>(defaultValue: T): Context<T>;
    function useContext<T>(context: Context<T>): T;
    function useMemo<T>(factory: () => T, deps: readonly unknown[]): T;
    function createElement(type: any, props: Record<string, unknown> | null, ...children: ReactNode[]): ReactNode;
    function useState<T>(initial: T): [T, (value: T | ((prev: T) => T)) => void];
    function forwardRef<T, P = {}>(render: (props: P, ref: Ref<T>) => ReactNode): ForwardRefExoticComponent<P>;
}
declare module "react/jsx-runtime" {
    const jsx: any;
    const jsxs: any;
    const Fragment: any;
}
