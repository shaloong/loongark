import React from "react";
import {
  LoongArkStepsRoot,
  LoongArkStepsList,
  LoongArkStepsItem,
  LoongArkStepsTrigger,
  LoongArkStepsIndicator,
  LoongArkStepsSeparator,
  LoongArkStepsContent,
  LoongArkStepsCompletedContent,
  LoongArkStepsPrevTrigger,
  LoongArkStepsNextTrigger,
} from "@loongark/react";
export function StepsBasicExample() {
  return (
    <LoongArkStepsRoot count={2}>
      <LoongArkStepsList>
        <LoongArkStepsItem index={0}>
          <LoongArkStepsTrigger>填写信息</LoongArkStepsTrigger>
          <LoongArkStepsIndicator>1</LoongArkStepsIndicator>
          <LoongArkStepsSeparator />
        </LoongArkStepsItem>
        <LoongArkStepsItem index={1}>
          <LoongArkStepsTrigger>确认</LoongArkStepsTrigger>
          <LoongArkStepsIndicator>2</LoongArkStepsIndicator>
        </LoongArkStepsItem>
      </LoongArkStepsList>
      <LoongArkStepsContent index={0}>填写项目名称。</LoongArkStepsContent>
      <LoongArkStepsContent index={1}>确认项目信息。</LoongArkStepsContent>
      <LoongArkStepsCompletedContent>已完成。</LoongArkStepsCompletedContent>
      <LoongArkStepsPrevTrigger>上一步</LoongArkStepsPrevTrigger>
      <LoongArkStepsNextTrigger>下一步</LoongArkStepsNextTrigger>
    </LoongArkStepsRoot>
  );
}
