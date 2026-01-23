declare module "@ark-ui/svelte/listbox" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ListboxRootProps {
    collection?: any;
    defaultValue?: string[];
    value?: string[];
    multiple?: boolean;
    disabled?: boolean;
    loopFocus?: boolean;
    orientation?: "horizontal" | "vertical";
    id?: string;
    onValueChange?: (details: { value: string[] }) => void;
    asChild?: boolean;
  }

  export interface ListboxLabelProps {
    asChild?: boolean;
  }

  export interface ListboxListProps {
    asChild?: boolean;
  }

  export interface ListboxItemGroupProps {
    asChild?: boolean;
  }

  export interface ListboxItemGroupLabelProps {
    asChild?: boolean;
  }

  export interface ListboxItemProps {
    item?: any;
    disabled?: boolean;
    asChild?: boolean;
  }

  export interface ListboxItemTextProps {
    asChild?: boolean;
  }

  export interface ListboxItemIndicatorProps {
    asChild?: boolean;
  }

  export const Listbox: {
    Root: SvelteComponent<ListboxRootProps>;
    Label: SvelteComponent<ListboxLabelProps>;
    List: SvelteComponent<ListboxListProps>;
    ItemGroup: SvelteComponent<ListboxItemGroupProps>;
    ItemGroupLabel: SvelteComponent<ListboxItemGroupLabelProps>;
    Item: SvelteComponent<ListboxItemProps>;
    ItemText: SvelteComponent<ListboxItemTextProps>;
    ItemIndicator: SvelteComponent<ListboxItemIndicatorProps>;
  };
}
