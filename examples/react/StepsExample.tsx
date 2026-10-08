import React from "react";

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
} from "@loongark/react";

const steps = [
  { title: "Account", description: "Create your profile" },
  { title: "Workspace", description: "Add team settings" },
  { title: "Review", description: "Confirm and launch" },
];

interface StepsDemoProps {
  size?: "sm" | "md" | "lg";
  orientation?: "horizontal" | "vertical";
  initialValue?: number;
}

const StepsDemo = ({
  size = "md",
  orientation = "horizontal",
  initialValue = 0,
}: StepsDemoProps) => {
  const [value, setValue] = React.useState(initialValue);

  return (
    <LoongArkStepsRoot
      step={value}
      count={steps.length}
      size={size}
      orientation={orientation}
      onStepChange={(details: { step: number }) => setValue(details.step)}
    >
      <LoongArkStepsList>
        {steps.map((step, index) => (
          <React.Fragment key={step.title}>
            <LoongArkStepsItem index={index}>
              <LoongArkStepsIndicator>{index + 1}</LoongArkStepsIndicator>
              <div>
                <LoongArkStepsTrigger>{step.title}</LoongArkStepsTrigger>
                <span>{step.description}</span>
              </div>
              {index < steps.length - 1 && <LoongArkStepsSeparator />}
            </LoongArkStepsItem>
          </React.Fragment>
        ))}
      </LoongArkStepsList>
      {steps.map((step, index) => (
        <LoongArkStepsContent key={step.title} index={index}>
          {step.description}
        </LoongArkStepsContent>
      ))}
      <LoongArkStepsCompletedContent>
        All steps completed.
      </LoongArkStepsCompletedContent>
      <div style={{ display: "flex", gap: 8 }}>
        <LoongArkStepsPrevTrigger>Back</LoongArkStepsPrevTrigger>
        <LoongArkStepsNextTrigger>Next</LoongArkStepsNextTrigger>
      </div>
    </LoongArkStepsRoot>
  );
};
export const StepsExample = StepsDemo;
export type StepsExampleProps = Parameters<typeof StepsDemo>[0];
