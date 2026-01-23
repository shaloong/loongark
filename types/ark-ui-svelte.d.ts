declare module "@ark-ui/svelte" {
  export const ark: Record<string, unknown> & {
    button: any;
    span: any;
    footer: any;
  };
  export function createListCollection<T = any>(options: { items: T[] }): any;
}
