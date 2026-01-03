<script setup lang="ts">
import { ref } from "vue";
import {
  LoongArkButton,
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputLabel,
  LoongArkInputHelperText,
  LoongArkInputPrefix,
  LoongArkInputSuffix,
  LoongArkDialog,
} from "@loongark/vue";
import { defaultScenario, scenarioTestIds } from "../shared/demoScenario";

const email = ref("");
const {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Positioner: DialogPositioner,
  Overlay: DialogOverlay,
  Content: DialogContent,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  CloseTrigger: DialogCloseTrigger,
} = LoongArkDialog;
</script>

<template>
  <form :data-testid="scenarioTestIds.form">
    <LoongArkInputLabel>{{ defaultScenario.emailLabel }}</LoongArkInputLabel>
    <LoongArkInputRoot :data-testid="scenarioTestIds.inputWrapper">
      <LoongArkInputPrefix :data-testid="scenarioTestIds.inputPrefix">
        {{ defaultScenario.prefixLabel }}
      </LoongArkInputPrefix>
      <LoongArkInputControl
        :placeholder="defaultScenario.emailPlaceholder"
        v-model="email"
      />
      <LoongArkInputSuffix
        action="button"
        :data-testid="scenarioTestIds.inputSuffix"
      >
        <LoongArkButton
          type="button"
          variant="ghost"
          size="sm"
          :data-testid="`${scenarioTestIds.inputSuffix}-button`"
          @click="email = ''"
        >
          {{ defaultScenario.suffixAction }}
        </LoongArkButton>
      </LoongArkInputSuffix>
    </LoongArkInputRoot>
    <LoongArkInputHelperText :data-testid="scenarioTestIds.helperText">
      {{ defaultScenario.helperText }}
    </LoongArkInputHelperText>

    <DialogRoot>
      <DialogTrigger>
        <LoongArkButton
          :disabled="!email"
          :data-testid="scenarioTestIds.primaryButton"
        >
          {{ defaultScenario.primaryLabel }}
        </LoongArkButton>
      </DialogTrigger>
      <DialogOverlay blur />
      <DialogPositioner>
        <DialogContent data-size="md">
          <DialogCloseTrigger />
          <DialogTitle :data-testid="scenarioTestIds.dialogTitle">
            {{ defaultScenario.dialogTitle }}
          </DialogTitle>
          <DialogDescription :data-testid="scenarioTestIds.dialogDescription">
            {{ defaultScenario.dialogDescription }}
          </DialogDescription>
          <DialogFooter>
            <LoongArkButton
              variant="ghost"
              :data-testid="scenarioTestIds.secondaryButton"
            >
              {{ defaultScenario.secondaryLabel }}
            </LoongArkButton>
            <LoongArkButton :data-testid="`${scenarioTestIds.primaryButton}-dialog`">
              {{ defaultScenario.primaryLabel }}
            </LoongArkButton>
          </DialogFooter>
        </DialogContent>
      </DialogPositioner>
    </DialogRoot>
  </form>
</template>
