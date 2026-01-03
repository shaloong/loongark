declare module "svelte/store" {
  export interface Writable<T> {
    subscribe(run: (value: T) => void): () => void;
    set(value: T): void;
    update(updater: (value: T) => T): void;
  }

  export function writable<T>(value: T): Writable<T>;
}
