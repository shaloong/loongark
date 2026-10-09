import React from "react";
import {
  LoongArkFilterBar,
  LoongArkFilterBarSearch,
  LoongArkInputRoot,
  LoongArkInputLabel,
  LoongArkInputControl,
  LoongArkFilterBarActions,
  LoongArkButton,
} from "@loongark/react";
export function FilterBarBasicExample() {
  return (
    <LoongArkFilterBar>
      <LoongArkFilterBarSearch>
        <LoongArkInputRoot>
          <LoongArkInputLabel>搜索</LoongArkInputLabel>
          <LoongArkInputControl placeholder="搜索组件" />
        </LoongArkInputRoot>
      </LoongArkFilterBarSearch>
      <LoongArkFilterBarActions>
        <LoongArkButton variant="outline">重置</LoongArkButton>
      </LoongArkFilterBarActions>
    </LoongArkFilterBar>
  );
}
