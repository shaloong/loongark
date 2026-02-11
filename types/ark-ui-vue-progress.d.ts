declare module "@ark-ui/vue/progress" {
  import type { DefineComponent } from "vue";

  export const ProgressRoot: DefineComponent<any>;
  export const ProgressLabel: DefineComponent<any>;
  export const ProgressTrack: DefineComponent<any>;
  export const ProgressRange: DefineComponent<any>;
  export const ProgressValueText: DefineComponent<any>;
  export const ProgressView: DefineComponent<any>;
  export const ProgressCircle: DefineComponent<any>;
  export const ProgressCircleTrack: DefineComponent<any>;
  export const ProgressCircleRange: DefineComponent<any>;
  export const Progress: {
    Root: typeof ProgressRoot;
    Label: typeof ProgressLabel;
    Track: typeof ProgressTrack;
    Range: typeof ProgressRange;
    ValueText: typeof ProgressValueText;
    View: typeof ProgressView;
    Circle: typeof ProgressCircle;
    CircleTrack: typeof ProgressCircleTrack;
    CircleRange: typeof ProgressCircleRange;
  };
}
