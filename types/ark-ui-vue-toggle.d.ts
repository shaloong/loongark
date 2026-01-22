declare module "@ark-ui/vue/toggle" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface ToggleRootProps {
    pressed?: boolean;
    defaultPressed?: boolean;
    disabled?: boolean;
    onPressedChange?: (pressed: boolean) => void;
  }

  export interface ToggleIndicatorProps {
    id?: string;
  }

  export const Toggle: {
    Root: VueComponent<ToggleRootProps>;
    Indicator: VueComponent<ToggleIndicatorProps>;
  };
}
