import React, { useState } from "react";
import {
  LoongArkStack,
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputControl,
  LoongArkButton,
  LoongArkDataTable,
} from "@shaloong/loongark-react";
import type { DataTableState } from "@shaloong/loongark-kit";
import { searchRows, searchColumns } from "../shared/tableSearchDemo";

export function DataTableSearchExample() {
  const [state, setState] = useState<DataTableState>({
    query: "Alpha",
    page: 1,
  });
  const [showSearch, setShowSearch] = useState(false);
  return (
    <LoongArkStack gap="md">
      <LoongArkInputRoot>
        <LoongArkInputLabel>外部搜索</LoongArkInputLabel>
        <LoongArkInputControl
          type="search"
          value={state.query}
          onInput={(event) =>
            setState({ ...state, query: event.currentTarget.value, page: 1 })
          }
        />
      </LoongArkInputRoot>
      <LoongArkButton
        aria-pressed={showSearch}
        onClick={() => setShowSearch((value) => !value)}
      >
        切换内置搜索
      </LoongArkButton>
      <LoongArkDataTable
        label="搜索示例"
        data={searchRows}
        columns={searchColumns}
        state={state}
        onStateChange={setState}
        showSearch={showSearch}
      />
    </LoongArkStack>
  );
}
