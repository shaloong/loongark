declare module "@ark-ui/svelte/toggle-group" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ToggleGroupRootProps {
    value?: string[];
    defaultValue?: string[];
    multiple?: boolean;
    disabled?: boolean;
    orientation?: "horizontal" | "vertical";
    loopFocus?: boolean;
    rovingFocus?: boolean;
    deselectable?: boolean;
    id?: string;
    ids?: Record<string, unknown>;
    onValueChange?: (details: { value: string[] }) => void;
    asChild?: boolean;
  }

  export interface ToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    id?: string;
    asChild?: boolean;
  }

  export const ToggleGroup: {
    Root: SvelteComponent<ToggleGroupRootProps>;
    Item: SvelteComponent<ToggleGroupItemProps>;
  };
}
