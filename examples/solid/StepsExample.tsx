import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import {
  LoongArkStepsRoot,
  LoongArkStepsList,
  LoongArkStepsItem,
  LoongArkStepsIndicator,
  LoongArkStepsSeparator,
  LoongArkStepsTrigger,
  LoongArkStepsContent,
  LoongArkStepsCompletedContent,
  LoongArkStepsNextTrigger,
  LoongArkStepsPrevTrigger,
} from "@loongark/solid";
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

export interface StepsExampleProps {
  size?: StepsSize;
  orientation?: StepsOrientation;
}

const steps = [
  { title: "Account", description: "Create your profile" },
  { title: "Workspace", description: "Add team settings" },
  { title: "Review", description: "Confirm and launch" },
];

export const StepsExample: Component<StepsExampleProps> = (props) => {
  const size = () => props.size ?? "md";
  const orientation = () => props.orientation ?? "horizontal";
  const [value, setValue] = createSignal(1);

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <LoongArkStepsRoot
        value={value()}
        count={steps.length}
        size={size()}
        orientation={orientation()}
        onValueChange={(details: { value: number | string }) =>
          setValue(Number(details.value))
        }
      >
        <LoongArkStepsList>
          {steps.map((step, index) => (
            <>
              <LoongArkStepsItem value={index + 1}>
                <LoongArkStepsIndicator>{index + 1}</LoongArkStepsIndicator>
                <div>
                  <LoongArkStepsTrigger>{step.title}</LoongArkStepsTrigger>
                  <LoongArkStepsContent>{step.description}</LoongArkStepsContent>
                </div>
              </LoongArkStepsItem>
              {index < steps.length - 1 && <LoongArkStepsSeparator />}
            </>
          ))}
        </LoongArkStepsList>
        <LoongArkStepsCompletedContent>
          All steps completed.
        </LoongArkStepsCompletedContent>
        <div style={{ display: "flex", gap: "8px" }}>
          <LoongArkStepsPrevTrigger>Back</LoongArkStepsPrevTrigger>
          <LoongArkStepsNextTrigger>Next</LoongArkStepsNextTrigger>
        </div>
      </LoongArkStepsRoot>
    </div>
  );
};
