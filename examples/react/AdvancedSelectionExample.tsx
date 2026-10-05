import { controlIcons } from "@loongark/kit";
import { LoongArkIcon } from "@loongark/react";
import { useState } from "react";
import * as L from "@loongark/react";
const choices = [
  { label: "React", value: "react" },
  { label: "Vue", value: "vue" },
  { label: "Solid", value: "solid", disabled: true },
  { label: "Svelte", value: "svelte" },
];
export function AdvancedSelectionExample() {
  const collection = L.createListCollection({ items: choices }),
    select = L.useSelect({
      collection,
      multiple: true,
      name: "frameworks",
      defaultValue: ["react"],
      closeOnSelect: false,
    }),
    pagination = L.usePagination({ count: 100, pageSize: 10, defaultPage: 5 });
  const [submitted, setSubmitted] = useState("");
  return (
    <L.LoongArkStack gap="lg" style={{ width: "100%", maxWidth: 640 }}>
      <L.LoongArkTypography as="h2">Control a selection</L.LoongArkTypography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setSubmitted(
            new FormData(event.currentTarget).getAll("frameworks").join(", "),
          );
        }}
      >
        <L.LoongArkSelectRootProvider value={select}>
          <L.LoongArkSelectLabel>Frameworks</L.LoongArkSelectLabel>
          <L.LoongArkSelectControl>
            <L.LoongArkSelectTrigger>
              <L.LoongArkSelectValueText placeholder="Choose frameworks" />
              <L.LoongArkSelectIndicator aria-hidden="true">
                <LoongArkIcon icon={controlIcons.chevronDown} size="sm" />
              </L.LoongArkSelectIndicator>
            </L.LoongArkSelectTrigger>
          </L.LoongArkSelectControl>
          <L.LoongArkSelectPositioner>
            <L.LoongArkSelectContent>
              <L.LoongArkSelectList>
                {choices.map((item) => (
                  <L.LoongArkSelectItem key={item.value} item={item}>
                    <L.LoongArkSelectItemText>
                      {item.label}
                    </L.LoongArkSelectItemText>
                    <L.LoongArkSelectItemIndicator />
                  </L.LoongArkSelectItem>
                ))}
              </L.LoongArkSelectList>
            </L.LoongArkSelectContent>
          </L.LoongArkSelectPositioner>
          <L.LoongArkSelectHiddenSelect />
        </L.LoongArkSelectRootProvider>
        <L.LoongArkStack
          orientation="horizontal"
          gap="sm"
          style={{ marginTop: "var(--lk-space-component-md)" }}
        >
          <L.LoongArkButton
            type="button"
            variant="outline"
            onClick={() => select.setValue(["react"])}
          >
            Reset selection
          </L.LoongArkButton>
          <L.LoongArkButton type="submit">Submit frameworks</L.LoongArkButton>
        </L.LoongArkStack>
      </form>
      <output aria-label="Submitted frameworks">
        {submitted || "Not submitted"}
      </output>
      <L.LoongArkPaginationRootProvider
        value={pagination}
        aria-label="Results pages"
      >
        <L.LoongArkPaginationFirstTrigger>
          First
        </L.LoongArkPaginationFirstTrigger>
        <L.LoongArkPaginationPrevTrigger>
          Previous
        </L.LoongArkPaginationPrevTrigger>
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <L.LoongArkPaginationNextTrigger>Next</L.LoongArkPaginationNextTrigger>
        <L.LoongArkPaginationLastTrigger>Last</L.LoongArkPaginationLastTrigger>
      </L.LoongArkPaginationRootProvider>
    </L.LoongArkStack>
  );
}
