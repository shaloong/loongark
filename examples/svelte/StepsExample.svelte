<script lang="ts">
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
  } from "@loongark/svelte";
  import type { StepsOrientation, StepsSize } from "@loongark/primitives";

  export let size: StepsSize = "md";
  export let orientation: StepsOrientation = "horizontal";

  let value = 0;
  const steps = [
    { title: "Account", description: "Create your profile" },
    { title: "Workspace", description: "Add team settings" },
    { title: "Review", description: "Confirm and launch" },
  ];

  const handleValueChange = (details: { step: number }) => {
    value = details.step;
  };
</script>

<LoongArkStepsRoot
  step={value}
  count={steps.length}
  {size}
  {orientation}
  onStepChange={handleValueChange}
>
  <LoongArkStepsList>
    {#each steps as step, index (step.title)}
      <LoongArkStepsItem {index}>
        <LoongArkStepsIndicator>{index + 1}</LoongArkStepsIndicator>
        <div>
          <LoongArkStepsTrigger>{step.title}</LoongArkStepsTrigger>
          <span>{step.description}</span>
        </div>
        {#if index < steps.length - 1}<LoongArkStepsSeparator />{/if}
      </LoongArkStepsItem>
    {/each}
  </LoongArkStepsList>
  {#each steps as step, index (step.title)}<LoongArkStepsContent {index}
      >{step.description}</LoongArkStepsContent
    >{/each}
  <LoongArkStepsCompletedContent>
    All steps completed.
  </LoongArkStepsCompletedContent>
  <div style="display: flex; gap: 8px;">
    <LoongArkStepsPrevTrigger>Back</LoongArkStepsPrevTrigger>
    <LoongArkStepsNextTrigger>Next</LoongArkStepsNextTrigger>
  </div>
</LoongArkStepsRoot>
