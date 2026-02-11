declare module "@ark-ui/vue/steps" {
  import type { DefineComponent } from "vue";

  export const StepsRoot: DefineComponent<any>;
  export const StepsList: DefineComponent<any>;
  export const StepsItem: DefineComponent<any>;
  export const StepsIndicator: DefineComponent<any>;
  export const StepsSeparator: DefineComponent<any>;
  export const StepsTrigger: DefineComponent<any>;
  export const StepsContent: DefineComponent<any>;
  export const StepsCompletedContent: DefineComponent<any>;
  export const StepsProgress: DefineComponent<any>;
  export const StepsNextTrigger: DefineComponent<any>;
  export const StepsPrevTrigger: DefineComponent<any>;
  export const Steps: {
    Root: typeof StepsRoot;
    List: typeof StepsList;
    Item: typeof StepsItem;
    Indicator: typeof StepsIndicator;
    Separator: typeof StepsSeparator;
    Trigger: typeof StepsTrigger;
    Content: typeof StepsContent;
    CompletedContent: typeof StepsCompletedContent;
    Progress: typeof StepsProgress;
    NextTrigger: typeof StepsNextTrigger;
    PrevTrigger: typeof StepsPrevTrigger;
  };
}
