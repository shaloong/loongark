declare module "@ark-ui/vue/tabs" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface TabsRootProps {
    value?: string;
    defaultValue?: string;
    onValueChange?: (details: { value: string }) => void;
    onFocusChange?: (details: { value: string }) => void;
    activationMode?: "automatic" | "manual";
    orientation?: "horizontal" | "vertical";
    loopFocus?: boolean;
    composite?: boolean;
    id?: string;
    lazyMount?: boolean;
    unmountOnExit?: boolean;
    present?: boolean;
    skipAnimationOnMount?: boolean;
  }

  export interface TabsListProps {
    id?: string;
  }

  export interface TabsTriggerProps {
    value: string;
    disabled?: boolean;
    id?: string;
  }

  export interface TabsContentProps {
    value: string;
    id?: string;
  }

  export interface TabsIndicatorProps {
    id?: string;
  }

  export const Tabs: {
    Root: VueComponent<TabsRootProps>;
    List: VueComponent<TabsListProps>;
    Trigger: VueComponent<TabsTriggerProps>;
    Content: VueComponent<TabsContentProps>;
    Indicator: VueComponent<TabsIndicatorProps>;
  };
}
