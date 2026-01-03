declare module "@ark-ui/react" {
  export const ark: Record<string, any>;
  export function createListCollection<T = any>(options: { items: T[] }): any;
}

declare module "@ark-ui/react/portal" {
  import { ReactNode } from "react";
  export const Portal: React.FC<{ children: ReactNode }>;
}

declare module "@ark-ui/react/tooltip" {
  export * from "./ark-ui-react-tooltip";
}
