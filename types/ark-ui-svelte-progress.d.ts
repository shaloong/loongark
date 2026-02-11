declare module "@ark-ui/svelte/progress" {
  type SvelteComponent<P = any> = new (...args: any[]) => { $$prop_def: P };

  export interface ProgressRootProps {
    value?: number;
    defaultValue?: number;
    min?: number;
    max?: number;
    orientation?: "horizontal" | "vertical";
    translations?: any;
    onValueChange?: (details: { value: number }) => void;
    asChild?: boolean;
  }

  export interface ProgressLabelProps {
    asChild?: boolean;
  }

  export interface ProgressTrackProps {
    asChild?: boolean;
  }

  export interface ProgressRangeProps {
    asChild?: boolean;
  }

  export interface ProgressValueTextProps {
    asChild?: boolean;
  }

  export interface ProgressViewProps {
    asChild?: boolean;
  }

  export interface ProgressCircleProps {
    asChild?: boolean;
  }

  export interface ProgressCircleTrackProps {
    asChild?: boolean;
  }

  export interface ProgressCircleRangeProps {
    asChild?: boolean;
  }

  export const Progress: {
    Root: SvelteComponent<ProgressRootProps>;
    Label: SvelteComponent<ProgressLabelProps>;
    Track: SvelteComponent<ProgressTrackProps>;
    Range: SvelteComponent<ProgressRangeProps>;
    ValueText: SvelteComponent<ProgressValueTextProps>;
    View: SvelteComponent<ProgressViewProps>;
    Circle: SvelteComponent<ProgressCircleProps>;
    CircleTrack: SvelteComponent<ProgressCircleTrackProps>;
    CircleRange: SvelteComponent<ProgressCircleRangeProps>;
  };
}
