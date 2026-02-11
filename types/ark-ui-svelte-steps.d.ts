declare module "@ark-ui/svelte/steps" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface StepsRootProps {
    value?: number | string;
    defaultValue?: number | string;
    count?: number;
    linear?: boolean;
    orientation?: "horizontal" | "vertical";
    onValueChange?: (details: { value: number | string }) => void;
    asChild?: boolean;
  }

  export interface StepsListProps {
    asChild?: boolean;
  }

  export interface StepsItemProps {
    value?: number | string;
    index?: number;
    asChild?: boolean;
  }

  export interface StepsIndicatorProps {
    asChild?: boolean;
  }

  export interface StepsSeparatorProps {
    asChild?: boolean;
  }

  export interface StepsTriggerProps {
    asChild?: boolean;
  }

  export interface StepsContentProps {
    asChild?: boolean;
  }

  export interface StepsCompletedContentProps {
    asChild?: boolean;
  }

  export interface StepsProgressProps {
    asChild?: boolean;
  }

  export interface StepsNextTriggerProps {
    asChild?: boolean;
  }

  export interface StepsPrevTriggerProps {
    asChild?: boolean;
  }

  export const Steps: {
    Root: SvelteComponent<StepsRootProps>;
    List: SvelteComponent<StepsListProps>;
    Item: SvelteComponent<StepsItemProps>;
    Indicator: SvelteComponent<StepsIndicatorProps>;
    Separator: SvelteComponent<StepsSeparatorProps>;
    Trigger: SvelteComponent<StepsTriggerProps>;
    Content: SvelteComponent<StepsContentProps>;
    CompletedContent: SvelteComponent<StepsCompletedContentProps>;
    Progress: SvelteComponent<StepsProgressProps>;
    NextTrigger: SvelteComponent<StepsNextTriggerProps>;
    PrevTrigger: SvelteComponent<StepsPrevTriggerProps>;
  };
}
