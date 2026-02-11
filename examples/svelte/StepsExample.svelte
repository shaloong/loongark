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

  let value = 1;
  const steps = [
    { title: "Account", description: "Create your profile" },
    { title: "Workspace", description: "Add team settings" },
    { title: "Review", description: "Confirm and launch" },
  ];

  const handleValueChange = (details: { value: number }) => {
    value = details.value;
  };
</script>

<LoongArkStepsRoot
  {value}
  count={steps.length}
  {size}
  {orientation}
  onValueChange={handleValueChange}
>
  <LoongArkStepsList>
    {#each steps as step, index (step.title)}
      <LoongArkStepsItem value={index + 1}>
        <LoongArkStepsIndicator>{index + 1}</LoongArkStepsIndicator>
        <div>
          <LoongArkStepsTrigger>{step.title}</LoongArkStepsTrigger>
          <LoongArkStepsContent>{step.description}</LoongArkStepsContent>
        </div>
      </LoongArkStepsItem>
      {#if index < steps.length - 1}
        <LoongArkStepsSeparator />
      {/if}
    {/each}
  </LoongArkStepsList>
  <LoongArkStepsCompletedContent>
    All steps completed.
  </LoongArkStepsCompletedContent>
  <div style="display: flex; gap: 8px;">
    <LoongArkStepsPrevTrigger>Back</LoongArkStepsPrevTrigger>
    <LoongArkStepsNextTrigger>Next</LoongArkStepsNextTrigger>
  </div>
</LoongArkStepsRoot>
