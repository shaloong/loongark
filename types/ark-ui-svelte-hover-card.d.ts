declare module "@ark-ui/svelte/hover-card" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface HoverCardRootProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface HoverCardTriggerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface HoverCardPositionerProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface HoverCardContentProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface HoverCardArrowProps {
    asChild?: boolean;
    [key: string]: any;
  }
  export interface HoverCardArrowTipProps {
    asChild?: boolean;
    [key: string]: any;
  }

  export const HoverCard: {
    Root: SvelteComponent<HoverCardRootProps>;
    Trigger: SvelteComponent<HoverCardTriggerProps>;
    Positioner: SvelteComponent<HoverCardPositionerProps>;
    Content: SvelteComponent<HoverCardContentProps>;
    Arrow: SvelteComponent<HoverCardArrowProps>;
    ArrowTip: SvelteComponent<HoverCardArrowTipProps>;
  };
}
