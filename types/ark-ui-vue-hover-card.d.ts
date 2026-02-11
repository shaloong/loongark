declare module "@ark-ui/vue/hover-card" {
  type VueComponent<P = any> = (props: P & { children?: any }) => any;

  export interface HoverCardRootProps {}
  export interface HoverCardTriggerProps {}
  export interface HoverCardPositionerProps {}
  export interface HoverCardContentProps {}
  export interface HoverCardArrowProps {}
  export interface HoverCardArrowTipProps {}

  export const HoverCard: {
    Root: VueComponent<HoverCardRootProps>;
    Trigger: VueComponent<HoverCardTriggerProps>;
    Positioner: VueComponent<HoverCardPositionerProps>;
    Content: VueComponent<HoverCardContentProps>;
    Arrow: VueComponent<HoverCardArrowProps>;
    ArrowTip: VueComponent<HoverCardArrowTipProps>;
  };
}
