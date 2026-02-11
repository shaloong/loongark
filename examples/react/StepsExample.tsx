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
import type { StepsOrientation, StepsSize } from "@loongark/primitives";

interface StepsExampleProps {
  size?: StepsSize;
  orientation?: StepsOrientation;
}

const steps = [
  { title: "Account", description: "Create your profile" },
  { title: "Workspace", description: "Add team settings" },
  { title: "Review", description: "Confirm and launch" },
];

export const StepsExample: React.FC<StepsExampleProps> = ({
  size = "md",
  orientation = "horizontal",
}) => {
  const [value, setValue] = React.useState<number>(1);

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <LoongArkStepsRoot
        value={value}
        count={steps.length}
        size={size}
        orientation={orientation}
        onValueChange={(details: { value: number | string }) =>
          setValue(Number(details.value))
        }
      >
        <LoongArkStepsList>
          {steps.map((step, index) => (
            <React.Fragment key={step.title}>
              <LoongArkStepsItem value={index + 1}>
                <LoongArkStepsIndicator>{index + 1}</LoongArkStepsIndicator>
                <div>
                  <LoongArkStepsTrigger>{step.title}</LoongArkStepsTrigger>
                  <LoongArkStepsContent>{step.description}</LoongArkStepsContent>
                </div>
              </LoongArkStepsItem>
              {index < steps.length - 1 && <LoongArkStepsSeparator />}
            </React.Fragment>
          ))}
        </LoongArkStepsList>
        <LoongArkStepsCompletedContent>
          All steps completed.
        </LoongArkStepsCompletedContent>
        <div style={{ display: "flex", gap: 8 }}>
          <LoongArkStepsPrevTrigger>Back</LoongArkStepsPrevTrigger>
          <LoongArkStepsNextTrigger>Next</LoongArkStepsNextTrigger>
        </div>
      </LoongArkStepsRoot>
    </div>
  );
};
