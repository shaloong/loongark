declare module "@ark-ui/solid" {
  export const ark: Record<string, (props: any) => unknown> & {
    button: (props: any) => unknown;
    span: (props: any) => unknown;
    footer: (props: any) => unknown;
  };
  export function createListCollection<T = any>(options: { items: T[] }): any;
}
