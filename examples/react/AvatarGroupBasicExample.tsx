import React from "react";
import {
  LoongArkAvatarGroup,
  LoongArkAvatarRoot,
  LoongArkAvatarFallback,
  LoongArkAvatarGroupOverflow,
} from "@loongark/react";
export function AvatarGroupBasicExample() {
  return (
    <LoongArkAvatarGroup aria-label="项目成员">
      <LoongArkAvatarRoot>
        <LoongArkAvatarFallback>LA</LoongArkAvatarFallback>
      </LoongArkAvatarRoot>
      <LoongArkAvatarRoot>
        <LoongArkAvatarFallback>JL</LoongArkAvatarFallback>
      </LoongArkAvatarRoot>
      <LoongArkAvatarGroupOverflow>+3</LoongArkAvatarGroupOverflow>
    </LoongArkAvatarGroup>
  );
}
