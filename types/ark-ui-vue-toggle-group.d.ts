declare module "@ark-ui/vue/toggle-group" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

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
  }

  export interface ToggleGroupItemProps {
    value: string;
    disabled?: boolean;
    id?: string;
  }

  export const ToggleGroup: {
    Root: VueComponent<ToggleGroupRootProps>;
    Item: VueComponent<ToggleGroupItemProps>;
  };
}
