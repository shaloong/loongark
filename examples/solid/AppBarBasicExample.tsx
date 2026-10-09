/** @jsxImportSource solid-js */

import { LoongArkAppBar, LoongArkToolbar, LoongArkLink } from "@loongark/solid";
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
