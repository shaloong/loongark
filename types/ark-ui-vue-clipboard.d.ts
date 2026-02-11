declare module "@ark-ui/vue/clipboard" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface ClipboardRootProps {}
  export interface ClipboardLabelProps {}
  export interface ClipboardControlProps {}
  export interface ClipboardInputProps {}
  export interface ClipboardTriggerProps {}
  export interface ClipboardIndicatorProps {}
  export interface ClipboardValueTextProps {}

  export const Clipboard: {
    Root: VueComponent<ClipboardRootProps>;
    Label: VueComponent<ClipboardLabelProps>;
    Control: VueComponent<ClipboardControlProps>;
    Input: VueComponent<ClipboardInputProps>;
    Trigger: VueComponent<ClipboardTriggerProps>;
    Indicator: VueComponent<ClipboardIndicatorProps>;
    ValueText: VueComponent<ClipboardValueTextProps>;
  };
}
