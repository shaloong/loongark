import { useState } from "react";
import {
  LoongArkProvider,
  LoongArkFilterBar,
  LoongArkFilterBarSearch,
  LoongArkFilterBarFilters,
  LoongArkFilterBarActions,
  LoongArkFilterDivider,
  LoongArkFilterChip,
  LoongArkInputLabel,
  LoongArkInputRoot,
  LoongArkInputControl,
  LoongArkInputHelperText,
  LoongArkButton,
} from "@loongark/react";
import {
  filterBarScenario,
  filterBarTestIds,
} from "../shared/filterBarScenario";
import { ark } from "@ark-ui/react";

export const FilterBarExample = () => {
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState("all");

  const handleReset = () => {
    setQuery("");
    setActiveChip("all");
  };

  return (
    <LoongArkProvider mode="light">
      <LoongArkFilterBar data-testid={filterBarTestIds.root} align="center">
        <LoongArkFilterBarSearch data-testid={filterBarTestIds.search}>
          <LoongArkInputLabel>
            {filterBarScenario.searchLabel}
          </LoongArkInputLabel>
          <LoongArkInputRoot>
            <LoongArkInputControl
              value={query}
              placeholder={filterBarScenario.searchPlaceholder}
              onChange={(event: { currentTarget: HTMLInputElement }) =>
                setQuery(event.currentTarget.value)
              }
            />
          </LoongArkInputRoot>
          <LoongArkInputHelperText>
            {filterBarScenario.searchHelper}
          </LoongArkInputHelperText>
        </LoongArkFilterBarSearch>

        <LoongArkFilterDivider />

        <LoongArkFilterBarFilters>
          {filterBarScenario.chips.map((chip) => (
            <LoongArkFilterChip
              key={chip.id}
              active={chip.id === activeChip}
              data-testid={filterBarTestIds.chip(chip.id)}
              onClick={() => setActiveChip(chip.id)}
            >
              {chip.label}
              {typeof chip.badge === "number" ? (
                <ark.span data-lk-filter-chip-badge>{chip.badge}</ark.span>
              ) : null}
            </LoongArkFilterChip>
          ))}
        </LoongArkFilterBarFilters>

        <LoongArkFilterBarActions>
          <LoongArkButton
            variant="ghost"
            data-testid={filterBarTestIds.secondaryAction}
            onClick={handleReset}
          >
            {filterBarScenario.secondaryAction}
          </LoongArkButton>
          <LoongArkButton data-testid={filterBarTestIds.primaryAction}>
            {filterBarScenario.primaryAction}
          </LoongArkButton>
        </LoongArkFilterBarActions>
      </LoongArkFilterBar>
    </LoongArkProvider>
  );
};
