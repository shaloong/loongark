declare module "@ark-ui/vue/listbox" {
  import type { DefineComponent } from "vue";

  export const ListboxRoot: DefineComponent<any>;
  export const ListboxLabel: DefineComponent<any>;
  export const ListboxList: DefineComponent<any>;
  export const ListboxItemGroup: DefineComponent<any>;
  export const ListboxItemGroupLabel: DefineComponent<any>;
  export const ListboxItem: DefineComponent<any>;
  export const ListboxItemText: DefineComponent<any>;
  export const ListboxItemIndicator: DefineComponent<any>;
  export const Listbox: {
    Root: typeof ListboxRoot;
    Label: typeof ListboxLabel;
    List: typeof ListboxList;
    ItemGroup: typeof ListboxItemGroup;
    ItemGroupLabel: typeof ListboxItemGroupLabel;
    Item: typeof ListboxItem;
    ItemText: typeof ListboxItemText;
    ItemIndicator: typeof ListboxItemIndicator;
  };
}
