declare module "solid-js" {
    type JSXElement = unknown;
    type Accessor<T> = () => T;
    type Setter<T> = (value: T | ((prev: T) => T)) => T;
    interface ParentProps {
        children?: JSXElement;
    }
    interface ParentComponent<P = {}> {
        (props: P & ParentProps): JSXElement;
    }
    interface Component<P = {}> {
        (props: P): JSXElement;
    }
    function createContext<T>(value?: T): any;
    function useContext<T>(context: any): T;
    function createMemo<T>(factory: () => T): Accessor<T>;
    function mergeProps<T extends object, U extends object>(source: T, other?: U): T & U;
    function createSignal<T>(value: T): [Accessor<T>, Setter<T>];
}
declare namespace JSX {
    interface IntrinsicElements {
        [element: string]: Record<string, unknown>;
    }
}
declare module "solid-js/jsx-runtime" {
    const jsx: any;
    const jsxs: any;
    const Fragment: any;
}
