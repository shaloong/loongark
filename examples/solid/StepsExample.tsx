/** @jsxImportSource solid-js */
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
  const [value, setValue] = createSignal(0);

  return (
    <div style={{ display: "grid", gap: "16px" }}>
      <LoongArkStepsRoot
        step={value()}
        count={steps.length}
        size={size()}
        orientation={orientation()}
        onStepChange={(details) => setValue(Number(details.step))}
      >
        <LoongArkStepsList>
          {steps.map((step, index) => (
            <>
              <LoongArkStepsItem index={index}>
                <LoongArkStepsIndicator>{index + 1}</LoongArkStepsIndicator>
                <div>
                  <LoongArkStepsTrigger>{step.title}</LoongArkStepsTrigger>
                  <span>{step.description}</span>
                </div>
                {index < steps.length - 1 && <LoongArkStepsSeparator />}
              </LoongArkStepsItem>
            </>
          ))}
        </LoongArkStepsList>
        {steps.map((step, index) => (
          <LoongArkStepsContent index={index}>
            {step.description}
          </LoongArkStepsContent>
        ))}
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
