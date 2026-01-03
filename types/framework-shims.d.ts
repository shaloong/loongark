declare module "vue" {
  export interface App {
    provide(key: string, value: unknown): void;
  }

  export interface Plugin {
    install(app: App): void;
  }
}

declare module "react" {
  export type ReactNode = unknown;

  export interface FC<P = {}> {
    (props: P & { children?: ReactNode }): ReactNode;
  }

  export function createContext<T>(defaultValue: T): any;
  export function useContext<T>(context: any): T;
  export function useMemo<T>(factory: () => T, deps: unknown[]): T;
  export function createElement(type: any, props: any, ...children: any[]): any;

  export namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module "svelte/store" {
  export interface Writable<T> {
    subscribe(run: (value: T) => void): () => void;
    set(value: T): void;
    update(updater: (value: T) => T): void;
  }

  export function writable<T>(value: T): Writable<T>;
}
