import React from "react";
import { LoongArkAppBar, LoongArkToolbar, LoongArkLink } from "@loongark/react";
export function AppBarBasicExample() {
  return (
    <LoongArkAppBar>
      <LoongArkToolbar>
        <strong>工作区</strong>
        <LoongArkLink href="#projects">项目</LoongArkLink>
      </LoongArkToolbar>
    </LoongArkAppBar>
  );
}
